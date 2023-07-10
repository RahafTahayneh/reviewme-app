"use client";
import React, { useState } from "react";
import "@/styles/carousel.css";
import { BiLeftArrowCircle, BiRightArrowCircle } from "react-icons/bi";
import clsx from "clsx";

interface CarouselProps {
  images: string[];
  className?: string;
  showControls?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  className,
  showControls = false,
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const goToNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImage(
      (prevImage) => (prevImage - 1 + images.length) % images.length
    );
  };

  return (
    <div className={clsx("carousel", className)}>
      {showControls && (
        <div>
          <button
            className="previous-button text-gray-200"
            onClick={goToPreviousImage}
          >
            <BiLeftArrowCircle size={40} />
          </button>
        </div>
      )}
      <div className="image-container ">
        <img src={images[currentImage]} alt="Image" className="image" />
      </div>
      {showControls && (
        <div>
          <button className="next-button text-gray-200" onClick={goToNextImage}>
            <BiRightArrowCircle size={40} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
