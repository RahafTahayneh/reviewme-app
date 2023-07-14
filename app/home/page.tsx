import Button from "@/components/Button";
import Link from "next/link";
import LottieAnimation from "@/components/LottieAnimation";
import welcomeAnimation from "@/public/welcome_animation.json";
import "@/styles/home.css";
import Card from "@/components/Card";
import { BiPlus, BiRightArrowAlt } from "react-icons/bi";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import NewReview from "@/components/NewReview";

const getData = async () => {
  await delay(2000);
  const user = await getUserFromCookie(cookies());
  const reviews = await db.review.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true, // Include the related user object
      image: true,
    },
  });

  return { reviews, user };
};

export default async function Page() {
  const { reviews, user } = await getData();

  return (
    <div className="flex flex-col m-4">
      <div className="welcome">
        <div className="flex flex-col items-center p-16 gap-8 justify-center content">
          <div className="text-4xl font-bold welcome-text w-80 header-text">
            {"World's Biggest "} <span className="header">Reviews Hub </span>
          </div>
          <div className=" welcome-text w-80 header-content">
            Join our community of passionate reviewers and let your voice be
            heard. Your feedback matters, and together, we can create a hub of
            valuable insights for online shoppers worldwide.
          </div>
          <div>
            <NewReview user={user} pageLink="/home" />
          </div>
        </div>
        <div className="animation">
          <LottieAnimation animationData={welcomeAnimation} className="" />
        </div>
      </div>
      <div className="flex mt-10 flex-col flex-start">
        <div className="flex flex-row items-center justify-between">
          <div className="text-3xl font-bold">Recently Added </div>
          <Link href={"/allreviews"}>
            <Button className="ternary-btn flex flex-row items-center">
              Show All
              <BiRightArrowAlt size={24} />
            </Button>
          </Link>
        </div>
        <div className="flex flex-row items-center pt-8 flex flex-wrap -mx-4">
          {reviews.slice(0, 6).map((review) => (
            <div
              key={review.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8"
            >
              <Card review={review} user={user} className="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
