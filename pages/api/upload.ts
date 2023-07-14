import { db } from "@/lib/db";
import { uploadImage } from "@/utils/cloudinary";
import { getImage } from "@/utils/formidable";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imageUploaded = await getImage(req);
  const imageData = await uploadImage(imageUploaded);

  const image = await db.reviewImage.create({
    data: {
      publicId: imageData.public_id,
      format: imageData.format,
      version: imageData.version.toString(),
    },
  });

  res.status(200).json(image);
}
