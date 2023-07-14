import Link from "next/link";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold font-custom">Review me.</h2>
          <p className="text-sm">© 2023 All rights reserved</p>
        </div>
        <div>
          <nav className="space-x-4">
            <Link href="/" legacyBehavior>
              <a className="text-sm hover:text-gray-400">Home</a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className="text-sm hover:text-gray-400">About</a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className="text-sm hover:text-gray-400">Contact</a>
            </Link>
          </nav>
          <div className="flex mt-2">
            <a href="#" className="mr-2">
              <FaTwitter className="text-white text-lg hover:text-gray-400" />
            </a>
            <a href="#" className="mr-2">
              <FaFacebook className="text-white text-lg hover:text-gray-400" />
            </a>
            <a href="#">
              <FaInstagram className="text-white text-lg hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
