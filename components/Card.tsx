"use client";
import clsx from "clsx";
import { ImCircleRight } from "react-icons/im";
import StarRating from "./StarRating";
import UserProfile from "./UserProfile";
import { useEffect, useState } from "react";
import "@/styles/modal.css";
import ReviewModal from "./ReviewModal";
import { formatCreatedAtDate } from "@/utils/formatDate";

const Card = ({ className, review, user }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // Adjust the screen size threshold as needed
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup function
    return () => {
      // Remove event listener on component unmount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const isSameLoggedInUser = review?.belongsToId === user?.id;

  return (
    <>
      <div
        className={clsx(
          "rounded-3xl p-4 drop-shadow-xl bg-white pb-10",
          className
        )}
      >
        <div className={" h-[200px] w-full mb-4 "}>
          <img
            src={`https://res.cloudinary.com/dgtvnojwb/v${review?.image?.version}/${review?.image?.publicId}.${review?.image?.format}`}
            className="image-card"
          />
        </div>
        <div>
          <div className="font-bold text-lg h-[60px] overflow-hidden overflow-ellipsis text-center">
            {review?.title}
          </div>
          {isSmallScreen ? (
            <>
              <div className="flex flex-row items-center py-2">
                <UserProfile user={review?.user} size={28} />
                <div className="text-sm user mx-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
                  {`${
                    review?.user?.firstName ? review?.user?.firstName : "User"
                  } ${review?.user?.lastName ? review?.user?.lastName : ""}`}
                </div>
              </div>
              <div className="flex flex-row items-center pb-2">
                <div className="dot rounded-full h-1 w-1 mx-1" />
                <div className="text-sm user whitespace-nowrap">
                  {review.storeName}
                </div>
                <div className="rounded-full h-1 w-1 ml-2 dot" />
                <div className="text-sm user text-left mx-1 whitespace-nowrap">
                  {formatCreatedAtDate(review.createdAt)}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-row items-center no-wrap my-4 info">
              <UserProfile user={review?.user} />
              <div className="text-sm user mx-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
                {`${
                  review?.user?.firstName ? review?.user?.firstName : "User"
                } ${review?.user?.lastName ? review?.user?.lastName : ""}`}
              </div>
              <div className="dot rounded-full h-1 w-1 mx-1" />
              <div className="text-sm user whitespace-nowrap">
                {review?.storeName}
              </div>
              <div className="rounded-full h-1 w-1 ml-2 dot" />
              <div className="text-sm user text-left mx-1 whitespace-nowrap">
                {formatCreatedAtDate(review.createdAt)}
              </div>
            </div>
          )}
          <div>
            <StarRating rating={Number(review.rate)} />
          </div>
          <div className="text-gray-700 text-sm mt-2 mb-8 overflow-ellipsis h-[100px] overflow-hidden">
            {review?.feedback}
          </div>
        </div>
        <div
          className="flex flex-row justify-end items-center text-gray-500 cursor-pointer"
          onClick={openModal}
        >
          <div>View more </div> <ImCircleRight size={20} className={"ml-2"} />
        </div>
      </div>
      {modalIsOpen && (
        <ReviewModal
          review={review}
          closeModal={closeModal}
          isSameUser={isSameLoggedInUser}
          imgLink={`https://res.cloudinary.com/dgtvnojwb/v${review?.image?.version}/${review?.image?.publicId}.${review?.image?.format}`}
        />
      )}
    </>
  );
};

export default Card;
