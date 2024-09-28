"use client";

import React, { useState, useEffect, FC, useRef } from "react";
import { getUserData } from "@/app/GlobalRedux/slice/AuthSlice";
import Login from "@/components/login/page";
import NeedHelp from "@/app/needhelp/page";
import Location from "@/app/location/page";
import Signup from "@/components/signup/page";
import Forget from "@/app/forget/page";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaPhone,
  FaFileAlt,
  FaShoppingCart,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import type { NextPage } from "next";
import AOS from "aos";
import { parseCookies } from 'nookies';

type PageProps = {
  title?: string;
};

const Navbar: NextPage<PageProps> = ({ title }) => {

  const cookies = parseCookies();
  let token = cookies.loginToken; // Assuming the token is stored in a cookie called 'token'
console.log('token is this ',token)

  const dispatch = useDispatch<AppDispatch>();
  const router: any = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [visibleComponent, setVisibleComponent] = useState<string | null>(null);
  const [isLogoVisible, setLogoVisible] = useState<boolean>(false);
  const [isSignupVisible, setSignupVisible] = useState<boolean>(false);
  const [isNeedVisible, setNeedVisible] = useState<boolean>(false);
  const [isReportsVisible, setReportsVisible] = useState<boolean>(false);
  const [isCartVisible, setCartVisible] = useState<boolean>(false);
  const [isLocationVisible, setLocationVisible] = useState<boolean>(false);
  const [isProfileVisible, setProfileVisible] = useState<boolean>(false);
  const [selectedPincode, setSelectedPincode] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showFullAddress, setShowFullAddress] = useState<boolean>(false);

  const handleShowFullAddress = () => {
    setShowFullAddress((prev) => !prev);
    setShowFullAddress(prev=>!prev)
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      if(token ){
        setIsLoggedIn(true)
      }
      else{
        setIsLoggedIn(false)
      }
      
    };

    checkLoginStatus();
  },[token]);

  useEffect(() => {
    // Using localStorage safely in useEffect

    const pincode1 =
      typeof window !== "undefined" ? localStorage.getItem("pincode") : null;
    console.log(pincode1);
    const locationString1 =
      typeof window !== "undefined" ? localStorage.getItem("location") : null;

    if (pincode1) setSelectedPincode(pincode1);
    if (locationString1) setLocation(locationString1);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const showComponent = (component: string) => setVisibleComponent(component);
  const hideComponent = () => setVisibleComponent(null);

  const handlePincodeSelect = (pincode: string, locationString: string) => {
    setSelectedPincode(pincode);
    setLocation(locationString);
    setLocationVisible(false);
    setVisibleComponent(null);

    // Update localStorage as well
    if (typeof window !== "undefined") {
      localStorage.setItem("pincode", pincode);
      localStorage.setItem("location", locationString);
    }
  };

  const toggleSignup = () => {
    isLocationVisible && setLocationVisible(false);
    isNeedVisible && setNeedVisible(false);
    isCartVisible && setCartVisible(false);
    isProfileVisible && setProfileVisible(false);
    isReportsVisible && setReportsVisible(false);

    setSignupVisible(!isSignupVisible);
    setVisibleComponent(isSignupVisible ? null : "login");
  };

  const toggleNeed = () => {
    isLocationVisible && setLocationVisible(false);
    isSignupVisible && setSignupVisible(false);
    isCartVisible && setCartVisible(false);
    isProfileVisible && setProfileVisible(false);
    isReportsVisible && setReportsVisible(false);

    setNeedVisible(!isNeedVisible);
    setVisibleComponent(isNeedVisible ? null : "need-help");
  };

  const toggleLocation = () => {
    isNeedVisible && setNeedVisible(false);
    isSignupVisible && setSignupVisible(false);
    isCartVisible && setCartVisible(false);
    isProfileVisible && setProfileVisible(false);
    isReportsVisible && setReportsVisible(false);

    setLocationVisible(!isLocationVisible);
    setVisibleComponent(isLocationVisible ? null : "location");
  };

  const toggleReports = () => {
    isNeedVisible && setNeedVisible(false);
    isSignupVisible && setSignupVisible(false);
    isCartVisible && setCartVisible(false);
    isProfileVisible && setProfileVisible(false);
    isLocationVisible && setLocationVisible(false);

    setReportsVisible(!isReportsVisible);
    setVisibleComponent(isReportsVisible ? null : "reports");
  };

  const toggleCart = () => {
    router.push('/cart')
    isNeedVisible && setNeedVisible(false);
    isSignupVisible && setSignupVisible(false);
    isReportsVisible && setReportsVisible(false);
    isProfileVisible && setProfileVisible(false);
    isLocationVisible && setLocationVisible(false);

    setCartVisible(!isCartVisible);
    setVisibleComponent(isCartVisible ? null : "cart");
  };

  const toggleProfile = () => {
    router.push('/profile')
    isNeedVisible && setNeedVisible(false);
    isSignupVisible && setSignupVisible(false);
    isReportsVisible && setReportsVisible(false);
    isCartVisible && setCartVisible(false);
    isLocationVisible && setLocationVisible(false);

    setProfileVisible(!isProfileVisible);
    setVisibleComponent(isCartVisible ? null : "profile");
  };

  const logoClick = () => {
    isNeedVisible && setNeedVisible(false);
    isSignupVisible && setSignupVisible(false);
    isReportsVisible && setReportsVisible(false);
    isLocationVisible && setLocationVisible(false);
    isProfileVisible && setProfileVisible(false);
    isCartVisible && setCartVisible(false);

    setLogoVisible(!isLogoVisible);
    setVisibleComponent(isLogoVisible ? null : "logo");
  };
  const handleInsideClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent modal from closing
  };

  const onBack = () => showComponent("login");
  const onBack1 = () => showComponent("signup");
  const onBack2 = () => showComponent("forgot");
  const onNeedCancel = () => setNeedVisible(false);
  const onSignupCancel = () => {
    setVisibleComponent(null);
    setSignupVisible(!isSignupVisible);
  };
  const onLoginCancel = () => {
    setVisibleComponent(null);
    setSignupVisible(!isSignupVisible);
  };
  const onForgetCancel = () => {
    setVisibleComponent(null);
    setSignupVisible(!isSignupVisible);
  };

  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <>
      <nav className="p-4 border-b-[0.3rem] border-[#d5d5d5]" data-aos="fade-down">
        <div className="container mx-auto flex xs:justify-around justify-between items-center max-[1025px]:min-[765px]:gap-[2rem]">
          <div className="flex gap-[2.5rem] items-center justify-center">
            <div className="flex gap-[0.2rem] items-end" onClick={logoClick}>
              <Link href="/">
                <Image
                  width={166}
                  height={166}
                  src={"/YOURLab_Logo.png"}
                  alt="yourlab icon"
                  priority
                />
              </Link>
            </div>
            <div
              onClick={toggleLocation}
              className={`flex items-center justify-center gap-1 mt-2 xs:mt-[0.4rem] xs:-ml-8 sm:mt-[0.4rem] cursor-pointer ${
                isLocationVisible &&
                "bg-[#0A8E8A] text-white p-[0.3rem] xs:pl-4 rounded-lg"
              }`}
            >
              <Image
                className={`${
                  isLocationVisible ? "invert-[1]" : "invert-[0.4]"
                }`}
                width={28}
                height={24}
                src={"https://img.icons8.com/ios/50/marker--v1.png"}
                alt="location icon"
                onClick={() =>setIsOpen(false)}
              />
              <span className="hidden sm:block text-lg leading-[1.3rem] xs:mr-4" onClick={() =>setIsOpen(false)}>
                {selectedPincode || location ? (
                  <>
                    <p>{`${selectedPincode}`}</p>
                    <p>{`${location}`}</p>
                  </>
                ) : (
                  "Location"
                )}
              </span>
              <div onClick={handleShowFullAddress}>
                {showFullAddress || isLocationVisible ? (
                  <div className="sm:hidden absolute text-teal-600 top-[3.5rem] font-bold left-16 w-[20rem]">
                    <p>{`${selectedPincode}`}</p>
                    <p>{`${location}`}</p>
                  </div>
                ) : (
                  <span className="sm:hidden">
                    {selectedPincode || location || isLocationVisible ? (
                      <div>
                        <p>
                          {`${selectedPincode}`}
                          {"..."}
                        </p>
                      </div>
                    ) : (
                      "Location"
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-10">
            <div
              onClick={toggleNeed}
              className={`flex items-center justify-center gap-1 mt-2 cursor-pointer ${
                isNeedVisible && "bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg"
              }`}
            >
              <Image
                width={20}
                height={20}
                src={"https://img.icons8.com/material-outlined/24/phone.png"}
                alt="help icon"
                className={`${isNeedVisible ? "invert-[1]" : "invert-[0.3]"}`}
              />
              <span className="text-lg">Need Help</span>
            </div>
            <div>
              <Link
                href={"/reports"}
                className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] ${
                  pathname === "/reports" &&
                  "bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg"
                }`}
                onClick={toggleReports}
              >
                <Image
                  width={16}
                  height={16}
                  src={"/reports.png"}
                  alt="reports icon"
                  className={`${
                    pathname === "/reports"
                      ? "grayscale-[0.5]"
                      : "contrast-[0.5]"
                  }`}
                />
                <span className="text-lg">Reports</span>
              </Link>
            </div>
            <div>
              <Link
                href={"/cart"}
                className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] ${
                  pathname === "/cart" &&
                  "bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg"
                }`}
                onClick={toggleCart}
              >
                <Image
                  className={`${
                    pathname === "/cart" ? "invert-[1]" : "invert-[0.4]"
                  }`}
                  width={16}
                  height={16}
                  src={"https://img.icons8.com/material-two-tone/24/buy.png"}
                  alt="cart icon"
                />
                <span className="text-lg">Cart</span>
              </Link>
            </div>
            {!isLoggedIn ? (
              <div
                className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] ${
                  isSignupVisible &&
                  "bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-[0.3rem] rounded-lg"
                }`}
                onClick={toggleSignup}
              >
                <Image
                  width={16}
                  height={16}
                  src={"https://img.icons8.com/ios/50/guest-male.png"}
                  alt="yourlab icon"
                  className={`${
                    (isSignupVisible || pathname === "/signup") && "invert-[1]"
                  }`}
                />
                <span className="text-lg">Login/Signup</span>
              </div>
            ) : (
              <div>
                <button
                  className={`flex items-center w-full space-x-1 bg-gradient-to-r rounded-xl`}
                >
                  <Link
                    href="/profile"
                    className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] ${
                      (pathname === "/profile") &&
                      "bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg"
                    }`}
                    onClick={toggleProfile}
                  >
                    <Image
                      width={30}
                      height={30}
                      src="https://img.icons8.com/ios-glyphs/30/user-male-circle.png"
                      alt="user-male-circle"
                      className={`${
                        (pathname === "/profile") &&
                        "invert-[1]"
                      }`}
                    />
                    <div>Profile</div>
                  </Link>
                </button>
              </div>
            )}
          </div>
          <div className="lg:hidden relative xs:top-[0.4rem] xs:left-2 md:right-[2rem]">
            <button
              onClick={toggleMenu}
              className="text-[1.4rem] focus:outline-none"
            >
              <RxHamburgerMenu />
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="lg:hidden mt-2 space-y-4 xs:py-[1rem] xs:px-[3rem] sm:px-[4rem] sm:py-[2rem] ">
            <div className="flex items-center space-x-4" onClick={() =>setIsOpen(false)}>
              <div
                onClick={toggleNeed}
                className={`flex items-center justify-center gap-1 mt-2 cursor-pointer ${
                  isNeedVisible &&
                  "bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg"
                }`}
              >
                <FaPhone className="text-xl xs:mr-3" />
                <span>Need Help</span>
              </div>
            </div>
            <div className="flex items-center space-x-4" onClick={() =>setIsOpen(false)}>
              <Link
                href={"/reports"}
                className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] ${
                  (pathname === "/reports") &&
                  "bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg"
                }`}
                onClick={toggleReports}
              >
                <FaFileAlt className="text-xl xs:mr-2" />
                <span>Report</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4" onClick={() =>setIsOpen(false)}>
              <Link
                href={"/cart"}
                className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] ${
                  pathname === "/cart" &&
                  "bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg"
                }`}
                onClick={toggleCart}
              >
                <FaShoppingCart className="text-xl xs:mr-3" />
                <span>Cart</span>
              </Link>
            </div>
            {!isLoggedIn ? (
              <div className="flex items-center space-x-4" onClick={() =>setIsOpen(false)}>
                <div
                  className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] ${
                    isSignupVisible &&
                    "bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg"
                  }`}
                  onClick={toggleSignup}
                >
                  <FaUser className="text-xl xs:mr-3" onClick={toggleSignup} />
                  <span>Login/Signup</span>
                </div>
              </div>
            ) : (
              <div onClick={() =>setIsOpen(false)}>
                <button
                  className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] ${
                    (pathname === "/profile") &&
                    "bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg"
                  }`}
                  onClick={toggleProfile}
                >
                  <Image
                    width={30}
                    height={30}
                    src="https://img.icons8.com/ios-glyphs/30/user-male-circle.png"
                    alt="user-male-circle"
                    className={`${
                      (isProfileVisible || pathname === "/profile") &&
                      "invert-[1]"
                    }`}
                  />
                  <Link href="/profile">Profile</Link>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {visibleComponent === "location" && isLocationVisible && (
        <div onClick={()=>setShowFullAddress(false)}>
        <div
          className="absolute z-10 w-full h-[100vh] bg-[#0000004b]"
          onClick={() => setLocationVisible(false)}
        >
          <div
            className="absolute left-[15%] top-[1.5rem] z-10 bg-white rounded-xl py-[0.5rem] px-[1rem] 2xl:w-[30rem]"
            onClick={handleInsideClick} // Prevent closing when clicking inside
          >
            <Location {...handlePincodeSelect} />
          </div>
        </div>
        </div>
      )}

      {visibleComponent === "need-help" && isNeedVisible && (
        <div
          className="absolute z-10 w-full h-[100vh] bg-[#0000004b] xs:left-0 xs:top-0 xs:w-[100%]"
          onClick={() => setNeedVisible(false)}
        >
          <div
            className="absolute right-[15%] top-[1.5rem] z-10 xs:left-0 xs:top-0 xs:w-full"
            onClick={handleInsideClick}
          >
            <div
              className="font-bold right-4 top-4 text-[1.2rem] absolute cursor-pointer z-10"
              onClick={() => {
                setVisibleComponent(null);
                setNeedVisible(!isNeedVisible);
              }}
              data-aos="fade-right"
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/multiply.png"
                alt="multiply"
              />
            </div>
            <NeedHelp {... onNeedCancel} />
          </div>
        </div>
      )}

      {visibleComponent === "signup" && (
        <div className="absolute top-[5rem] left-[20%] z-10 w-[63.64%] mx-auto xs:left-0 xs:top-0 xs:w-[100%]">
          <div
            className="font-bold right-4 top-4 text-[1.2rem] absolute cursor-pointer z-10"
            onClick={() => {
              setVisibleComponent(null);
              setSignupVisible(!isSignupVisible);
            }}
            data-aos="fade-right"
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/multiply.png"
              alt="multiply"
            />
          </div>
          <Signup
            onSignupCancel={onSignupCancel}
            onBack={onBack}
            {...setVisibleComponent}
            {...setSignupVisible}
          />
        </div>
      )}

      {visibleComponent === "login" && (
        <div className="absolute top-[8rem] left-[20%] z-10 w-[63.64%] mx-auto xs:left-0 xs:top-0 xs:w-[100%]">
          <div
            className="font-bold right-4 top-4 text-[1.2rem] absolute cursor-pointer z-10"
            onClick={() => {
              setVisibleComponent(null);
              setSignupVisible(!isSignupVisible);
            }}
            data-aos="fade-right"
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/multiply.png"
              alt="multiply"
            />
          </div>
          <Login
            onLoginCancel={onLoginCancel}
            onBack={onBack1}
            onBack1={onBack2}
            {...setVisibleComponent}
            {...setSignupVisible}
          />
        </div>
      )}

      {visibleComponent === "forgot" && (
        <div className="absolute top-[8rem] left-[20%] z-10 w-[60%] mx-auto xs:left-0 xs:top-0 xs:w-[100%]">
          <div
            className="font-bold right-4 top-4 text-[1.2rem] absolute cursor-pointer z-10"
            onClick={() => {
              setVisibleComponent(null);
              setSignupVisible(!isSignupVisible);
            }}
            data-aos="fade-right"
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/multiply.png"
              alt="multiply"
            />
          </div>
          <Forget {... onForgetCancel} />
        </div>
      )}
    </>
  );
};

export default Navbar;
