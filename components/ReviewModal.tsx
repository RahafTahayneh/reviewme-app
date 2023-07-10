"use client";
import Link from "next/link";
import { useState } from "react";
import { Review } from "@/types/review";
import { AiOutlineClose } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import Modal from "react-modal";
import "@/styles/modal.css";
import StarRating from "./StarRating";
import UserProfile from "./UserProfile";
import { FaExternalLinkAlt } from "react-icons/fa";
import Carousel from "./Carousel";
import { updateReviewById } from "@/lib/api";

Modal.setAppElement("#modal");

const ReviewModal = ({
  review,
  closeModal,
  isSameUser,
}: {
  isSameUser: boolean;
  review: Review;
  closeModal: () => void;
}) => {
  const [title, setTitle] = useState(review?.title);
  const [feedback, setFeedback] = useState(review?.feedback);

  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.slice(0, 50));
  };

  const handleFeedbackChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFeedback(event.target.value.slice(0, 255));
  };

  const saveChanges = async () => {
    if (title === review.title && feedback === review.feedback) {
      // No changes, skip saving
      setIsEditing(false);
      return;
    }
    const updatedReview = await updateReviewById({
      id: review.id,
      title,
      feedback,
    });
    console.log(updatedReview);
    setIsEditing(false);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      overlayClassName="modal-overlay"
      className="modal"
      ariaHideApp={false}
    >
      <div className="modalBody flex flex-col p-10 bg-white rounded-2xl ModalContent md:w-full">
        <div className="bg-white">
          <div className="flex flex-row items-center justify-between mb-2">
            <div>
              {isEditing ? (
                <input
                  className="border border-gray-300 rounded px-2 py-1"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  maxLength={50}
                />
              ) : (
                <h1 className="text-3xl ">{title}</h1>
              )}
            </div>

            <div className="flex flex-row items-center">
              {/* TODO Show only if its for the same user */}
              {isSameUser && (
                <div className="mx-2 cursor-pointer">
                  {isEditing ? (
                    <div onClick={() => saveChanges()}>
                      <FcCheckmark size={24} />
                    </div>
                  ) : (
                    <div onClick={() => setIsEditing(true)}>
                      <FiEdit size={24} className="text-gray-400" />
                    </div>
                  )}
                </div>
              )}
              <div className="cursor-pointer" onClick={closeModal}>
                <AiOutlineClose size={24} className="text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex flex-row mb-8 items-center">
            <div className="mr-4">
              <StarRating rating={parseFloat(review.rate.toString())} />
            </div>
            <div className="flex flex-row items-center">
              <UserProfile user={review.user} size={30} />
              <div className="text-sm user mx-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
                {isSameUser
                  ? "You"
                  : `${
                      review.user?.firstName ? review.user?.firstName : "User"
                    } ${review.user?.lastName ? review.user?.lastName : ""}`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ScrollableContent">
          <div className="flex flex-row items-center justify-center h-[200px]">
            <Carousel
              images={review.product.images}
              className="w-[500px] h-[200px]"
              showControls
            />
          </div>
          <div className="flex flex-col border-b-2 border-gray-300 border-opacity-50 pb-4 mt-2">
            <div className="flex flex-row items-center my-2">
              <div className="text-md text-gray-300 mr-10 w-[100px]">Store</div>
              <div className="text-md">{review.product.storeName}</div>
            </div>
            <div className="flex flex-row items-center my-2">
              <div className="text-md text-gray-300 mr-10 w-[100px]">
                Product Link
              </div>
              <div className="text-md overflow-ellipsis whitespace-nowrap overflow-hidden max-w-[200px] mr-8">
                {review.product.link}
              </div>
              <div>
                <Link href={review.product.link} legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt />
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex flex-row items-center my-2">
              <div className="text-md text-gray-300 mr-10 w-[100px]">
                Created At
              </div>
              <div className="text-md">{"7 hours ago"}</div>
            </div>
          </div>
          <div className="flex flex-col border-opacity-50 py-6">
            <div className="text-md mr-10 w-[100px]">Feedback</div>
            {isEditing ? (
              <textarea
                className="border border-gray-300 rounded px-2 py-1 mt-2"
                value={feedback}
                onChange={handleFeedbackChange}
                maxLength={255}
              />
            ) : (
              <div className="text-md text-gray-600 overflow-ellipsis overflow-hidden max-h-[200px] my-2">
                {feedback}
              </div>
            )}
          </div>
          {/* Helpful section */}

          <div className="flex flex-col ">
            <div className="flex flex-row items-center">
              <div>
                <BsPersonCircle size={25} className="mr-2 text-gray-400" />
              </div>
              <div className="text-md text-gray-400">
                2 persons find this helpful{" "}
              </div>
            </div>
            {!isSameUser && (
              <div className="my-4">
                <button className="border border-black rounded px-4 py-2 text-sm  text-black bg-white hover:bg-gray-100">
                  Helpful
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;
