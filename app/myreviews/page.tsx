import "@/styles/home.css";
import Card from "@/components/Card";
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
    where: {
      belongsToId: user?.id,
    },
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
    <div className="flex flex-col h-full w-full">
      <div className="text-3xl font-bold  border-solid border-gray  border-b-2 p-2 flex flex-row justify-between items-center mx-2">
        <div>My Reviews</div>
      </div>
      {reviews?.length !== 0 ? (
        <div className="flex flex-row items-center pt-8 flex flex-wrap">
          {reviews?.map((review) => (
            <div
              key={review.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8"
            >
              <Card review={review} user={user} className="" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full w-full">
          <div className="text-2xl text-gray-400 max-w-[500px] text-center">
            No reviews for you, Share your experience and help others by
            submitting a new review on our website.
          </div>
          <div className="my-8">
            <NewReview user={user} pageLink="/myreviews" />
          </div>
        </div>
      )}
    </div>
  );
}
