"use client";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import Modal from "react-modal";
import Button from "./Button";
import StarRatings from "react-star-ratings";
import { User } from "@/types/user";
import Link from "next/link";
import { createNewReview, uploadImage } from "@/lib/api";
import clsx from "clsx";
import { useRouter } from "next/navigation";

Modal.setAppElement("#reviewModal");

const STORES = [
  "Select a store",
  "Amazon",
  "Shein",
  "AliExpress",
  "eBay",
  "Walmart",
  "Alibaba",
  "Target",
  "Best Buy",
  "Etsy",
  "ASOS",
  "Zappos",
  "Flipkart",
  "Macy's",
  "Overstock",
  "Newegg",
  "Nordstrom",
  "Home Depot",
  "Costco",
  "Wayfair",
  "Sephora",
  "Ulta Beauty",
  "Google Shopping",
  "Other",
];

const NewReview = ({ user, pageLink }: { user: User; pageLink: string }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [signInModal, setIsSignInModal] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [customStore, setCustomStore] = useState("");
  const [rating, setRating] = useState(0);
  const [productLink, setProductLink] = useState("");
  const [productName, setProductName] = useState("");

  const router = useRouter();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const uploadedImages = Array.from(files);
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedStore(selectedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", images[0]);

    try {
      const response = await uploadImage(formData);
      const image = await response.json();
      const newObj = {
        title,
        feedback,
        productName,
        productLink,
        storeName: selectedStore,
        customStore,
        imageId: image.id,
        rate: rating,
      };

      await createNewReview(newObj);

      setImages([]);
      setTitle("");
      setFeedback("");
      setCustomStore("");
      setSelectedStore("");
      setRating(0);
      setProductLink("");
      setProductName("");
    } catch (error) {
      console.error("Error saving review:", error);
      // Handle error and display an error message to the user
    } finally {
      closeModal();
      router.push(pageLink);
    }
  };

  const isFormValid = () => {
    return (
      title.trim() !== "" &&
      feedback.trim() !== "" &&
      selectedStore.trim() !== "" &&
      selectedStore !== STORES[0] &&
      (selectedStore !== "other" || customStore.trim() !== "") &&
      rating > 0 &&
      productLink.trim() !== "" &&
      productName.trim() !== "" &&
      images.length !== 0
    );
  };

  const toggleSubmit = () => {
    if (user?.id) {
      openModal();
    } else {
      setIsSignInModal(true);
    }
  };

  return (
    <>
      <div>
        <Button
          className="custom-button flex flex-row items-center"
          onClick={toggleSubmit}
        >
          <BiPlus size={18} className="mr-1" /> Submit Review
        </Button>
        {signInModal && (
          <Modal
            isOpen={signInModal}
            onRequestClose={() => setIsSignInModal(false)}
            overlayClassName="modal-overlay"
            className="modal"
            ariaHideApp={false}
          >
            <div className="flex flex-col p-6 bg-white rounded-2xl m-12 w-[400px]">
              <div className="bg-white">
                <div className="flex flex-row items-center justify-between pb-2 border-solid border-gray border-b-2">
                  <div>
                    <h1 className="text-xl font-bold">
                      Redirect to SignIn Page
                    </h1>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsSignInModal(false)}
                  >
                    <AiOutlineClose size={24} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-2 ScrollableContent">
                <div>Please sign in to submit a new review.</div>
                <div className="mt-12 flex flex-row items-center justify-end">
                  <div className="mr-2">
                    <span>
                      <Link
                        href={"/register"}
                        className="text-gray-600 font-bold text-sm"
                      >
                        {`Don't have an account?`}
                      </Link>
                    </span>
                  </div>
                  <div className="w-[100px]">
                    <button className="custom-button text-white px-2 py-2 rounded w-full">
                      <Link href="/signin">Sign In</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            overlayClassName="modal-overlay"
            className="modal"
            ariaHideApp={false}
          >
            <div className="modalBody flex flex-col p-6 bg-white rounded-2xl ModalContent md:w-full m-6">
              <div className="bg-white">
                <div className="flex flex-row items-center justify-between mb-2 pb-2 border-solid border-gray border-b-2">
                  <div>
                    <h1 className="text-xl ">Add New Review</h1>
                  </div>

                  <div className="cursor-pointer" onClick={closeModal}>
                    <AiOutlineClose size={24} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-2 ScrollableContent">
                <form onSubmit={handleSubmit}>
                  <div className="h-full w-full position-relative">
                    <div className="mb-8">
                      <label
                        htmlFor="title"
                        className="block font-md font-300 mb-1"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full py-2 px-3 border rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="feedback" className="block font-md  mb-1">
                        Feedback
                      </label>
                      <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full py-2 px-3 border rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="store" className="block mb-1">
                        Store Name
                      </label>
                      <select
                        id="store"
                        value={selectedStore}
                        onChange={handleStoreChange}
                        className="w-full py-2 px-3 border rounded"
                        required
                        placeholder="Select a store"
                      >
                        {STORES.map((store, index) => (
                          <option value={store} key={index}>
                            {store}
                          </option>
                        ))}
                      </select>
                      {selectedStore === "Other" && (
                        <input
                          type="text"
                          id="customStore"
                          value={customStore}
                          onChange={(e) => setCustomStore(e.target.value)}
                          placeholder="Enter Store Name"
                          className="mt-2 py-2 px-3 border rounded w-full"
                          required
                        />
                      )}
                    </div>
                    <div className="mb-4 flex flex-row items-center justify-between w-full">
                      <div className="mr-2 w-1/2">
                        <label htmlFor="productName" className="block mb-1">
                          Product Name
                        </label>
                        <input
                          type="text"
                          id="productName"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          className="w-full py-2 px-3 border rounded"
                          required
                        />
                      </div>
                      <div className="w-1/2">
                        <label htmlFor="productLink" className="block  mb-1">
                          Product Link
                        </label>
                        <input
                          type="text"
                          id="productLink"
                          value={productLink}
                          onChange={(e) => setProductLink(e.target.value)}
                          className="w-full py-2 px-3 border rounded"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="rating" className="block mb-1">
                        Rating
                      </label>
                      <StarRatings
                        rating={rating}
                        starRatedColor="#FBBF24"
                        starEmptyColor="#D1D5DB"
                        starHoverColor="#F59E0B"
                        starDimension="24px"
                        starSpacing="2px"
                        changeRating={(value) => setRating(value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="imageUpload" className="block mb-1">
                        Upload Images
                      </label>

                      <input
                        type="file"
                        id="imageUpload"
                        onChange={handleImageUpload}
                        multiple
                        className="w-full py-2 px-3 border rounded"
                        required
                        max={5}
                      />
                      <div className="flex flex-wrap mt-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative mr-2 mb-2">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Uploaded Image ${index}`}
                              className="h-16 w-16 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* absolute bottom-0 right-2 */}
                    <div className="flex flex-row justify-end mt-10">
                      <button
                        type="submit"
                        className={`custom-button text-white p-10 rounded-md   ${
                          !isFormValid() && "opacity-50 pointer-events-none"
                        }`}
                        disabled={!isFormValid()}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default NewReview;
