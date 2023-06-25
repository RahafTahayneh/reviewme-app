"use client";
import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LottieAnimation = ({ animationData }) => {
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
    <div className="w-full h-full flex custom-animation" ref={containerRef} />
  );
};

export default LottieAnimation;
