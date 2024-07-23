"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// components/Navbar.js
import { useState } from "react";
import {
  FaPhone,
  FaFileAlt,
  FaShoppingCart,
  FaUser,
  FaBars,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4 border-b-[0.3rem] border-[#d5d5d5]">
      <div className="container mx-auto flex justify-between items-center max-[1025px]:min-[765px]:gap-[2rem]">
        <div className="flex gap-[2.5rem] items-center justify-center">
          <div className="flex gap-[0.2rem] items-end">
            <Image
              width={16}
              height={16}
              src={"/yourlabico.png"}
              alt="yourlab icon"
            />
            <h1 className="font-bold text-[1.5rem] relative top-[0.4rem] text-[#61b1ae]">
              YOURLab
            </h1>
          </div>
          <div>
            {/* <li
              onClick={(e) => {
                router.push("/location");
              }}
            > */}
              <Link
                href={"/location"}
                className="cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem]"
              >
                <Image
                  className="invert-[0.4]"
                  width={28}
                  height={24}
                  src={"https://img.icons8.com/ios/50/marker--v1.png"}
                  alt="yourlab icon"
                />
                <span className="text-lg">Location</span>
              </Link>
            {/* </li> */}
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-10">
          <div>
            <Link
              href={"/help"}
              className="cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem]"
            >
              <Image
                className="rotate-[-80deg] invert-[0.3]"
                width={16}
                height={16}
                src={
                  "https://img.icons8.com/material-outlined/24/phone-disconnected.png"
                }
                alt="yourlab icon"
              />
              <span className="text-lg">Need Help</span>
            </Link>
          </div>

          <div>
            <Link
              href={"/reports"}
              className="cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem]"
            >
              <Image
                width={16}
                height={16}
                src={"/reports.png"}
                alt="Need Help icon"
              />
              <span className="text-lg">Reports</span>
            </Link>
          </div>

          <div>
            <Link
              href={"/cart"}
              className="cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem]"
            >
              <Image
                className="invert-[0.4]"
                width={16}
                height={16}
                src={"https://img.icons8.com/material-two-tone/24/buy.png"}
                alt="Reports icon"
              />
              <span className="text-lg">Cart</span>
            </Link>
          </div>

          <div>
            <Link
              href={"/registration"}
              className="cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem]"
            >
              <Image
                width={16}
                height={16}
                src={"https://img.icons8.com/ios/50/guest-male.png"}
                alt="yourlab icon"
              />
              <span className="text-lg ">Registration</span>
            </Link>
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-xl focus:outline-none">
            <FaBars />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <div className="flex items-center space-x-4">
            <FaPhone className="text-xl" />
            <span className="">Contact</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaFileAlt className="text-xl" />
            <span className="">Report</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaShoppingCart className="text-xl" />
            <span className="">Cart</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaUser className="text-xl" />
            <span className="">Register</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
