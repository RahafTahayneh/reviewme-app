import LottieAnimation from "@/components/LottieAnimation";
import aboutAnimation from "@/public/about_animation.json";
import "@/styles/home.css";

export default async function Page() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="animation">
        <LottieAnimation
          animationData={aboutAnimation}
          className="w-[400px] h-[400px] z-negative-10"
        />
      </div>

      <div className=" mx-auto py-10 welcome-text w-80 header-content">
        <h1 className="text-3xl font-bold mb-5">
          About <span className="font-custom">Review me. </span>
        </h1>
        <p className="text-gray-700 mb-8">
          <span className="font-custom"> Review me</span> is an innovative
          platform that allows users to submit reviews about products they've
          bought online from various e-commerce websites worldwide. We aim to
          provide a comprehensive and reliable source of user-generated reviews
          to help shoppers make informed decisions before purchasing products
          online.
        </p>
        <h2 className="text-2xl font-bold mb-3">How it Works</h2>
        <p className="text-gray-700 mb-6">
          1. Sign up or log in to App using your preferred method.
        </p>
        <p className="text-gray-700 mb-6">
          2. Submit your review by providing a rating, writing a detailed
          review, and optionally uploading photos or videos.
        </p>
        <p className="text-gray-700 mb-6">
          3. Explore reviews submitted by other users to get insights and make
          informed decisions before purchasing products online.
        </p>
        <p className="text-gray-700">
          Our App strives to create a community-driven platform where users can
          share their experiences and help others make smarter choices while
          shopping online.
        </p>
      </div>
    </div>
  );
}
