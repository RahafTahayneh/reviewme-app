import { NextApiRequest, NextApiResponse } from "next";
import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { Review } from "@prisma/client";
import { getImage } from "@/utils/formidable";
import { uploadImage } from "@/utils/cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      await handleGetRequest(query, req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    // case 'DELETE':
    //   handleDeleteRequest(query, res);
    //   break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}

async function handleGetRequest(
  query: any,
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, type } = query;

  if (type === "all") {
    const reviews = await db.review.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true, // Include the related user object
      },
    });
    res.status(200).json(reviews);
  } else if (type === "byId") {
    if (id) {
      const review = await db.review.findUnique({
        where: {
          id,
        },
        include: {
          user: true, // Include the related user object
        },
      });
      if (review) {
        res.status(200).json(review);
      } else {
        res.status(404).json({ message: "Review not found" });
      }
    } else {
      res.status(400).json({ message: "Missing review ID" });
    }
  } else if (type === "user") {
    const signedUser = await validateJWT(req.cookies["token"]);
    const user = await db.user.findUnique({
      where: {
        id: signedUser.id,
      },
      include: {
        reviews: true,
      },
    });

    res.status(200).json(user?.reviews);
  } else {
    res.status(400).json({ message: "Invalid request type" });
  }
}

async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  const { id, title, feedback } = req.body;
  const reviews = await db.review.findMany();

  const reviewIndex = reviews.findIndex((r) => r.id === id);

  if (reviewIndex !== -1) {
    const updatedReview: Review = {
      ...reviews[reviewIndex],
      title: title || reviews[reviewIndex].title,
      feedback: feedback || reviews[reviewIndex].feedback,
    };

    reviews[reviewIndex] = updatedReview;

    res.status(200).json(updatedReview);
  } else {
    res.status(404).json({ message: "Review not found" });
  }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const {
    title,
    feedback,
    productName,
    productLink,
    storeName,
    imageId,
    storeProductId,
    rate,
    customStore,
  } = req.body;

  console.log(req.body);
  const user = await validateJWT(req.cookies["token"]);

  const reviews = await db.review.findMany();
  console.log(reviews);
  const review = await db.review.create({
    data: {
      rate: rate.toString(),
      title,
      feedback,
      productName,
      storeName: storeName === "Other" ? customStore : storeName,
      productLink,
      storeProductId,
      image: {
        connect: {
          id: imageId,
        },
      },
      user: {
        connect: { id: user?.id },
      },
    },
  });
  reviews.push(review);
  console.log(review);
  res.status(200).json(review);
}
