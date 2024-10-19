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
import { MdMedicalServices } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiTireIronCross } from "react-icons/gi";
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
  // console.log('token is this ',token)

  const dispatch = useDispatch<AppDispatch>();
  const router: any = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [visibleComponent, setVisibleComponent] = useState<string | null>(null);
  const [isLogoVisible, setLogoVisible] = useState<boolean>(false);
  const [isSignupVisible, setSignupVisible] = useState<boolean>(false);
  const [isHomeVisible, setHomeVisible] = useState<boolean>(false);
  const [isServicesVisible, setServicesVisible] = useState<boolean>(false);
  const [isTestsVisible, setTestsVisible] = useState<boolean>(false);
  const [isDoctorsVisible, setDoctorsVisible] = useState<boolean>(false);
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleShowFullAddress = () => {
    setShowFullAddress((prev) => !prev);
    setShowFullAddress(prev => !prev)
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      if (token) {
        setIsLoggedIn(true)
      }
      else {
        setIsLoggedIn(false)
      }

    };

    checkLoginStatus();
  }, [token]);

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

  const toggleTests = () => {
    isHomeVisible && setHomeVisible(false);
    isDropdownOpen && setIsDropdownOpen(false);
    isDoctorsVisible && setDoctorsVisible(false);
    isSignupVisible && setSignupVisible(false);
    isServicesVisible && setServicesVisible(false);
    isLocationVisible && setLocationVisible(false);
    isNeedVisible && setNeedVisible(false);
    isCartVisible && setCartVisible(false);
    isProfileVisible && setProfileVisible(false);
    isReportsVisible && setReportsVisible(false);
    setIsOpen(false)

    setTestsVisible(!isTestsVisible);
    setVisibleComponent(isTestsVisible ? null : "home");
  };

  const toggleDoctors = () => {
    isHomeVisible && setHomeVisible(false);
    isDropdownOpen && setIsDropdownOpen(false);
    isTestsVisible && setTestsVisible(false);
    isSignupVisible && setSignupVisible(false);
    isServicesVisible && setServicesVisible(false);
    isLocationVisible && setLocationVisible(false);
    isNeedVisible && setNeedVisible(false);
    isCartVisible && setCartVisible(false);
    isProfileVisible && setProfileVisible(false);
    isReportsVisible && setReportsVisible(false);
    setIsOpen(false)

    setDoctorsVisible(!isDoctorsVisible);
    setVisibleComponent(isDoctorsVisible ? null : "home");
  };

  const toggleHome = () => {
    isSignupVisible && setSignupVisible(false);
    isDropdownOpen && setIsDropdownOpen(false);
    isTestsVisible && setTestsVisible(false);
    isDoctorsVisible && setDoctorsVisible(false);
    isServicesVisible && setServicesVisible(false);
    isLocationVisible && setLocationVisible(false);
    isNeedVisible && setNeedVisible(false);
    isCartVisible && setCartVisible(false);
    isProfileVisible && setProfileVisible(false);
    isReportsVisible && setReportsVisible(false);

    setHomeVisible(!isHomeVisible);
    setVisibleComponent(isHomeVisible ? null : "home");
  };

  const toggleServices = () => {
    isHomeVisible && setHomeVisible(false);
    isTestsVisible && setTestsVisible(false);
    isDoctorsVisible && setDoctorsVisible(false);
    isSignupVisible && setSignupVisible(false);
    isLocationVisible && setLocationVisible(false);
    isNeedVisible && setNeedVisible(false);
    isCartVisible && setCartVisible(false);
    isProfileVisible && setProfileVisible(false);
    isReportsVisible && setReportsVisible(false);

    setServicesVisible(!isServicesVisible);
    setVisibleComponent(isServicesVisible ? null : "services");
  };

  const toggleSignup = () => {
    isHomeVisible && setHomeVisible(false);
    isDropdownOpen && setIsDropdownOpen(false);
    isTestsVisible && setTestsVisible(false);
    isDoctorsVisible && setDoctorsVisible(false);
    isServicesVisible && setServicesVisible(false);
    isLocationVisible && setLocationVisible(false);
    isNeedVisible && setNeedVisible(false);
    isCartVisible && setCartVisible(false);
    isProfileVisible && setProfileVisible(false);
    isReportsVisible && setReportsVisible(false);

    setSignupVisible(!isSignupVisible);
    setVisibleComponent(isSignupVisible ? null : "login");
  };

  const toggleNeed = () => {
    isHomeVisible && setHomeVisible(false);
    isDropdownOpen && setIsDropdownOpen(false);
    isTestsVisible && setTestsVisible(false);
    isDoctorsVisible && setDoctorsVisible(false);
    isServicesVisible && setServicesVisible(false);
    isLocationVisible && setLocationVisible(false);
    isSignupVisible && setSignupVisible(false);
    isCartVisible && setCartVisible(false);
    isProfileVisible && setProfileVisible(false);
    isReportsVisible && setReportsVisible(false);

    setNeedVisible(!isNeedVisible);
    setVisibleComponent(isNeedVisible ? null : "need-help");
  };

  const toggleLocation = () => {
    isHomeVisible && setHomeVisible(false);
    isDropdownOpen && setIsDropdownOpen(false);
    isTestsVisible && setTestsVisible(false);
    isDoctorsVisible && setDoctorsVisible(false);
    isServicesVisible && setServicesVisible(false);
    isNeedVisible && setNeedVisible(false);
    isSignupVisible && setSignupVisible(false);
    isCartVisible && setCartVisible(false);
    isProfileVisible && setProfileVisible(false);
    isReportsVisible && setReportsVisible(false);

    setLocationVisible(!isLocationVisible);
    setVisibleComponent(isLocationVisible ? null : "location");
  };

  const toggleReports = () => {
    isHomeVisible && setHomeVisible(false);
    isDropdownOpen && setIsDropdownOpen(false);
    isTestsVisible && setTestsVisible(false);
    isDoctorsVisible && setDoctorsVisible(false);
    isServicesVisible && setServicesVisible(false);
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
    isHomeVisible && setHomeVisible(false);
    isDropdownOpen && setIsDropdownOpen(false);
    isTestsVisible && setTestsVisible(false);
    isDoctorsVisible && setDoctorsVisible(false);
    isServicesVisible && setServicesVisible(false);
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
    isHomeVisible && setHomeVisible(false);
    isDropdownOpen && setIsDropdownOpen(false);
    isTestsVisible && setTestsVisible(false);
    isDoctorsVisible && setDoctorsVisible(false);
    isServicesVisible && setServicesVisible(false);
    isNeedVisible && setNeedVisible(false);
    isSignupVisible && setSignupVisible(false);
    isReportsVisible && setReportsVisible(false);
    isCartVisible && setCartVisible(false);
    isLocationVisible && setLocationVisible(false);

    setProfileVisible(!isProfileVisible);
    setVisibleComponent(isCartVisible ? null : "profile");
  };

  const logoClick = () => {
    isHomeVisible && setHomeVisible(false);
    isDropdownOpen && setIsDropdownOpen(false);
    isTestsVisible && setTestsVisible(false);
    isDoctorsVisible && setDoctorsVisible(false);
    isServicesVisible && setServicesVisible(false);
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

  const avatar: any = typeof window !== "undefined" ? localStorage.getItem("data") : null
  const data = JSON.parse(avatar)
  // console.log(data.avatar)

  return (
    <div className="relative">
      <nav className="p-4 fixed top-0 right-0 left-0 z-10 bg-white [box-shadow:0rem_0rem_0.5rem_0.1rem_lightgray]" data-aos="fade-down">
        <div className={`max-width-auto flex justify-between gap-[10%] ${!isLoggedIn && 'gap-[15%]'} items-center`}>
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
              className={`flex items-center justify-center gap-1 mt-2 xs:mt-[0.4rem] xs:-ml-8 sm:mt-[0.4rem] cursor-pointer ${isLocationVisible &&
                "border-b-[.2rem] border-teal-500 mt-[-.4rem] text-black font-bold py-[0.5rem]"
                }`}
            >
              {/* <Image
                className={`${
                  isLocationVisible ? "invert-[1]" : "invert-[0.4]"
                }`}
                width={30}
                height={28}
                src={"https://img.icons8.com/ios/50/marker--v1.png"}
                alt="location icon"
                onClick={() =>setIsOpen(false)}
              /> */}
              <ImLocation2 className={`text-[2rem] text-black ${isLocationVisible ? "invert-[-1]" : "invert-[0.4]"
                }`} />
              <span className="hidden sm:block text-lg leading-[1.3rem] xs:mr-4" onClick={() => setIsOpen(false)}>
                {selectedPincode || location ? (
                  <>
                    <p>{`${selectedPincode}`}</p>
                    <p>{`${location}`}</p>
                  </>
                ) : (
                  "Search by city"
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
                      "Search by city"
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>


          <div className="hidden lg:flex ml-[-11rem] lg:relative lg:left-[4rem] items-center justify-center space-x-10">
            <div>
              <Link
                href={"/"}
                onClick={toggleHome}
                className={`flex items-center justify-center gap-1 mt-2 cursor-pointer ${isHomeVisible && "border-b-[.2rem] border-teal-500 mt-[-.2rem] text-black font-bold py-[0.5rem]"
                  }`}
              >
                <FaHome className={`text-[2rem] mr-[0.2rem] ${isHomeVisible ? "text-black" : "invert-[0.3]"}`} />

                <span className="text-lg">Home</span>
              </Link>
              <div className="border-b-[.2rem] border-teal-500 w-0 hover:w-full"></div>
            </div>

            <div className="relative z-10">
              <button
                onClick={toggleDropdown}
                className="focus:outline-none text-lg"
              >
                <div
                  onClick={toggleServices}
                  className={`flex items-center gap-1 mt-3 cursor-pointer ${isServicesVisible && "border-b-[.2rem] border-teal-500 mt-[-.2rem] text-black font-bold py-[0.5rem]"
                    }`}
                ><MdMedicalServices className="text-[2rem] contrast-[0.5]" /> Services</div>

              </button>
              {isDropdownOpen && (
                <div className="absolute flex flex-col gap-[.8rem] bg-white left-0 mt-7 w-48 px-2 pt-2 pb-4 rounded-md shadow-lg z-50" onClick={() => setIsDropdownOpen(false)}>

                  <div onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-1 mt-2 cursor-pointer ${isTestsVisible && "bg-[#0A8E8A] text-white py-[0.5rem] px-[1rem] rounded-lg"
                      }`}>
                    <Image width={29} height={29} src="https://img.icons8.com/ios-filled/50/test-results.png" alt="test-results" className="contrast-[0.5]" />
                    <Link href={"/labtests"}>Lab Tests</Link>
                  </div>
                  <div onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-1 mt-2 cursor-pointer ${isDoctorsVisible && "bg-[#0A8E8A] text-white py-[0.5rem] px-[1rem] rounded-lg"
                      }`}>
                    <Image width={29} height={29} src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/50/external-doctors-biochemistry-and-medicine-healthcare-flatart-icons-solid-flatarticons.png" alt="test-results" className="contrast-[0.5]" />
                    <Link href={"/doctors"}>Doctors</Link>
                  </div>

                  {isLoggedIn && (<div>
                    <Link
                      href={"/reports"}
                      className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] ${isReportsVisible &&
                        "bg-[#0A8E8A] text-white py-[0.5rem] px-[1rem] rounded-lg"
                        }`}
                      onClick={toggleReports}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={"/reports.png"}
                        alt="reports icon"
                        className={`${pathname === "/reports"
                          ? "grayscale-[0.5]"
                          : "contrast-[0.5]"
                          }`}
                      />
                      <span className="text-lg">Documents</span>
                    </Link>
                  </div>)}

                </div>
              )}
            </div>

            <div
              onClick={toggleNeed}
              className={`flex items-center gap-1 mt-2 cursor-pointer lg:w-[8.9rem] xl:w-[7.7rem] ${isNeedVisible && "border-b-[.2rem] border-teal-500 mt-[-.2rem] text-black font-bold py-[0.5rem]"
                }`}

            >
              <Image
                width={28}
                height={28}
                src={"https://img.icons8.com/material-outlined/24/phone.png"}
                alt="help icon"
                className={`${isNeedVisible ? "invert-[-1]" : "invert-[0.3]"}`}
              />
              <span className="text-lg">Need Help</span>
            </div>


            {isLoggedIn && (
              <div>
                <Link
                  href={"/cart"}
                  className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] ${isCartVisible &&
                    "border-b-[.2rem] border-teal-500 mt-[-.3rem] text-black font-bold py-[0.5rem]"}`}
                  onClick={toggleCart}
                >
                  <Image
                    className={`${isCartVisible ? "invert-[-1]" : "invert-[0.4]"
                      }`}
                    width={30}
                    height={30}
                    src={"https://img.icons8.com/material-two-tone/24/buy.png"}
                    alt="cart icon"
                  />
                  <span className="text-lg">Cart</span>
                </Link>
              </div>
            )}
          </div>
          {!isLoggedIn ? (
            <div
              className={`cursor-pointer xs:hidden sm:hidden lg:flex bg-[#2874f0] px-[1rem] rounded-md text-white py-[0.5rem] flex items-center relative top-[0.2rem] gap-[0.3rem] ${isSignupVisible &&
                "bg-[#266cdd] text-white p-[0.3rem] rounded-lg"
                }`}
              onClick={toggleSignup}
            >
              <Image
                width={16}
                height={16}
                src={"https://img.icons8.com/ios/50/guest-male.png"}
                alt="signup icon"
                className={`invert-[1] ${(isSignupVisible || pathname === "/signup") && "invert-[1]"
                  }`}
              />
              <span className="text-lg">Login/Signup</span>
            </div>
          ) : (
            <div>
              <button
                className={`flex items-center xs:hidden sm:hidden lg:block w-full space-x-4 bg-gradient-to-r rounded-xl`}
              >
                <Link
                  href="/profile"
                  className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.5rem] ${isProfileVisible &&
                    "border-b-[.2rem] border-teal-500 mt-[-.3rem] text-black font-bold py-[0.5rem]"
                    }`}
                  onClick={toggleProfile}
                >
                  <Image
                    width={48}
                    height={48}
                    src={data?.avatar?.secure_url} //https://img.icons8.com/ios-glyphs/30/user-male-circle.png
                    alt="user-male-circle"
                    className={`rounded-full border-[0.1rem] border-black`} // ${(pathname === "/profile") && "invert-[1]"}
                  />
                  <div>Profile</div>
                </Link>
              </button>
            </div>
          )}
          <div className="lg:hidden relative xs:top-[0.4rem] xs:left-2 md:right-[2rem]">
            <button
              onClick={toggleMenu}
              className="text-[1.4rem] focus:outline-none"
            >
              {!isOpen ? <RxHamburgerMenu data-aos="fade-in" /> : <GiTireIronCross data-aos="fade-in" className="text-[1.2rem]" />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="lg:hidden mt-2 space-y-4 xs:py-[1rem] xs:px-[3rem] sm:px-[4rem] sm:py-[2rem]" data-aos="fade-in">

            <div onClick={() => setIsOpen(false)}>
              <Link
                href={"/"}
                onClick={toggleHome}
                className={`flex items-center gap-1 mt-2 cursor-pointer ${isHomeVisible && "border-b-[.2rem] border-teal-500 mt-[-.2rem] text-black font-bold py-[0.5rem] w-[5.5rem]"
                  }`}
              >
                <FaHome className={`text-[1.7rem] mr-[0.2rem] ${isHomeVisible ? "text-black" : "invert-[0.3]"}`} />

                <span className="text-md">Home</span>
              </Link>
            </div>

            <div className="relative z-10">
              <button
                onClick={toggleDropdown}
                className="focus:outline-none text-md"
              >
                <div
                  onClick={toggleServices}
                  className={`flex items-center gap-1 cursor-pointer ${isServicesVisible && "border-b-[.2rem] border-teal-500  text-black font-bold py-[0.5rem]"
                    }`}
                ><MdMedicalServices className="text-[1.7rem] contrast-[0.5]" /> Services</div>

              </button>
              {isDropdownOpen && (
                <div className="absolute flex flex-col gap-[.8rem] bg-white left-0 mt-7 w-48 px-2 pt-2 pb-4 rounded-md shadow-lg z-50" onClick={() => setIsDropdownOpen(false)}>

                  <div onClick={toggleTests}
                    className={`flex items-center gap-1 mt-2 cursor-pointer ${isTestsVisible && "bg-[#0A8E8A] text-white py-[0.5rem] px-[1rem] rounded-lg"
                      }`}>
                    <Image width={29} height={29} src="https://img.icons8.com/ios-filled/50/test-results.png" alt="test-results" className="contrast-[0.5]" />
                    <Link href={"/labtests"}>Lab Tests</Link>
                  </div>
                  <div onClick={toggleDoctors}
                    className={`flex items-center gap-1 mt-2 cursor-pointer ${isDoctorsVisible && "bg-[#0A8E8A] text-white py-[0.5rem] px-[1rem] rounded-lg"
                      }`}>
                    <Image width={29} height={29} src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/50/external-doctors-biochemistry-and-medicine-healthcare-flatart-icons-solid-flatarticons.png" alt="test-results" className="contrast-[0.5]" />
                    <Link href={"/doctors"}>Doctors</Link>
                  </div>

                  {isLoggedIn && (<div onClick={() => setIsOpen(false)}>
                    <Link
                      href={"/reports"}
                      className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] ${isReportsVisible &&
                        "bg-[#0A8E8A] text-white py-[0.5rem] px-[1rem] rounded-lg"
                        }`}
                      onClick={toggleReports}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={"/reports.png"}
                        alt="reports icon"
                        className={`${pathname === "/reports"
                          ? "grayscale-[0.5]"
                          : "contrast-[0.5]"
                          }`}
                      />
                      <span className="text-lg">Documents</span>
                    </Link>
                  </div>)}

                </div>
              )}
            </div>

            <div className="flex items-center space-x-4" onClick={() => setIsOpen(false)}>
              <div
                onClick={toggleNeed}
                className={`flex items-center justify-center gap-1 cursor-pointer ${isNeedVisible &&
                  "bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg"
                  }`}
              >
                <FaPhone className="text-xl xs:mr-3" />
                <span>Need Help</span>
              </div>
            </div>
            <div className="flex items-center space-x-4" onClick={() => setIsOpen(false)}>
              <Link
                href={"/cart"}
                className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] ${pathname === "/cart" &&
                  "bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg"
                  }`}
                onClick={toggleCart}
              >
                <FaShoppingCart className="text-xl xs:mr-3" />
                <span>Cart</span>
              </Link>
            </div>
            {!isLoggedIn ? (
              <div className="flex items-center space-x-4" onClick={() => setIsOpen(false)}>
                <div
                  className={`cursor-pointer bg-[#2874f0] px-[0.5rem] py-[0.3rem] rounded-md flex items-center relative top-[0.2rem] gap-[0.3rem] ${isSignupVisible &&
                    "bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg"
                    }`}
                  onClick={toggleSignup}
                >
                  <FaUser className="text-xl xs:mr-3" onClick={toggleSignup} />
                  <span>Login/Signup</span>
                </div>
              </div>
            ) : (
              <div onClick={() => setIsOpen(false)}>
                <button
                  className={`cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] ${(pathname === "/profile") &&
                    "bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg"
                    }`}
                  onClick={toggleProfile}
                >
                  <Image
                    width={30}
                    height={30}
                    src={data?.avatar?.secure_url} //https://img.icons8.com/ios-glyphs/30/user-male-circle.png
                    alt="user-male-circle"
                    className={`rounded-full border-[0.1rem] border-black`} // ${(pathname === "/profile") && "invert-[1]"}
                  />
                  <Link href="/profile">Profile</Link>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {visibleComponent === "location" && isLocationVisible && (
        <div onClick={() => setShowFullAddress(false)}>
          <div
            className="relative top-[5rem] z-10 w-full h-[100vh] bg-[#0000004b]"
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
          className="relative z-10 w-full h-[100vh] bg-[#0000004b] xs:left-0 top-[5rem] xs:w-[100%]"
          onClick={() => setNeedVisible(false)}
        >
          <div
            className="absolute left-[33%] w-[40rem] top-[10%] -z-10 xs:left-0 xs:top-0 xs:w-full"
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
            <NeedHelp {...onNeedCancel} />
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
          <Forget {...onForgetCancel} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
