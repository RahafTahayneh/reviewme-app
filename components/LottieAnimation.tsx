"use client";
import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import clsx from "clsx";

const LottieAnimation = ({ animationData, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });

      return () => {
        anim.destroy();
      };
    }
  }, [animationData]);

  return (
    <div
      className={clsx("w-full h-full flex custom-animation", className)}
      ref={containerRef}
    />
  );
};

export default LottieAnimation;
