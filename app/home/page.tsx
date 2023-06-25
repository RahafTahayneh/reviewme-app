import Button from "@/components/Button";
import LottieAnimation from "@/components/LottieAnimation";
import welcomeAnimation from "@/public/welcome_animation.json";
import "@/styles/home.css";

const Home = () => {
  return (
    <div className="flex flex-col m-4">
      <div className="welcome">
        <div className="flex flex-col items-center p-16 gap-8 justify-center content">
          <div className="text-4xl font-bold welcome-text w-80">
            {"World's Biggest "} <span className="header">Reviews Hub </span>
          </div>
          <div className="text-m welcome-text w-80">
            Join our community of passionate reviewers and let your voice be
            heard. Your feedback matters, and together, we can create a hub of
            valuable insights for online shoppers worldwide.
          </div>
          <div>
            <Button className="custom-button">Submit new Review</Button>
          </div>
        </div>
        <div className="animation">
          <LottieAnimation animationData={welcomeAnimation} />
        </div>
      </div>
      <div className="flex mt-10 flex-col flex-start">
        <div className="flex flex-row items-center justify-between">
          <div className="text-lg font-bold">Recently Added </div>
          <div>
            <Button className="ternary-btn">show all</Button>
          </div>
        </div>
        <div className="flex flex-row items-center"></div>
      </div>
    </div>
  );
};

export default Home;
