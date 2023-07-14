import "@/styles/home.css";
import Card from "@/components/Card";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

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
      <div className="text-3xl font-bold  border-solid border-gray  border-b-2 pb-2">
        Recently Added{" "}
      </div>
      <div className="flex flex-row items-center pt-8 flex flex-wrap -mx-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8"
          >
            <Card review={review} user={user} className="" />
          </div>
        ))}
      </div>
    </div>
  );
}
