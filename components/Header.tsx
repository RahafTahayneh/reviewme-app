"use client";
import Link from "next/link";
import { BsPersonCircle } from "react-icons/bs";
import "@/styles/font.css";
import "@/styles/home.css";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

const Header = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="flex flex-row items-center justify-between px-4 primaryText w-full">
      <div className=" mx-auto flex items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/home" legacyBehavior>
            <h1 className="text-xl font-bold ml-2 header font-custom cursor-pointer">
              Review me.
            </h1>
          </Link>
        </div>
        <div className=" flex items-center hidden sm:flex sm:space-x-4">
          <Link href="/home" legacyBehavior>
            <a href="#" className="text-gray-400 hover:text-gray-700">
              Home
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a href="#" className="text-gray-400 hover:text-gray-700">
              About
            </a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a href="#" className="text-gray-400 hover:text-gray-700">
              Contact
            </a>
          </Link>
        </div>
        <div className="flex flex-row items-center">
          {!!user?.id ? (
            <Link href={"/myreviews"} prefetch>
              <div className="flex flex-row items-center cursor-pointer">
                <div className="text-[14px] text-gray-400 hover:text-gray-700 mx-2">
                  My Reviews
                </div>
                <BsPersonCircle size={24} className="text-gray-400" />
              </div>
            </Link>
          ) : (
            <button className="custom-button text-white px-4 py-2 rounded">
              <Link href="/signin">Sign In</Link>
            </button>
          )}

          <div
            className="text-gray-500 px-4 sm:hidden"
            onClick={handleSidebarToggle}
          >
            <FiMenu size={24} />
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <div className=" bar sm:hidden z-10">
          <Link href="/home" legacyBehavior prefetch>
            <a
              href="#"
              className="block text-gray-400 py-2 hover:text-gray-700"
            >
              Home
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a
              href="#"
              className="block text-gray-400 py-2 hover:text-gray-700"
            >
              About
            </a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a
              href="#"
              className="block text-gray-400 py-2 hover:text-gray-700"
            >
              Contact
            </a>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
