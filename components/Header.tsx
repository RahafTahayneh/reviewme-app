import Link from "next/link";
import "@/styles/font.css";
import "@/styles/home.css";
import Button from "./Button";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between p-4 primaryText">
      <div className="flex items-center">
        <h1 className="header text-2xl font-bold font-custom ">Review me.</h1>
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="/" legacyBehavior>
          <a className="header">Home</a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a className="header">About</a>
        </Link>
        <Link href="/contact" legacyBehavior>
          <a className="header">Contact</a>
        </Link>
      </nav>
      <div>
        <Button className="custom-button">Sign In</Button>
      </div>
    </header>
  );
};

export default Header;
