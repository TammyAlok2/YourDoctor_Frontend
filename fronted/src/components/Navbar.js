"use client";

import { getUserData } from "@/app/GlobalRedux/slice/AuthSlice";
import Login from "@/app/login/page";
import NeedHelp from "@/app/needhelp/page";
import Location from "@/app/location/page";
import Signup from "@/app/signup/page";
import Forget from "@/app/forget/page";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaPhone,
  FaFileAlt,
  FaShoppingCart,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [visibleComponent, setVisibleComponent] = useState(null);
  const [isSignupVisible, setSignupVisible] = useState(false);
  const [isNeedVisible, setNeedVisible] = useState(false);
  const [isLocationVisible, setLocationVisible] = useState(false);
  const showSignup = () => setVisibleComponent("signup");
  const showLogin = () => setVisibleComponent("login");
  const showForgot = () => setVisibleComponent("forgot");

  // Selecting the auth state from the Redux store
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const showComponent = (component) => setVisibleComponent(component);
  const hideComponent = () => setVisibleComponent(null);

  const renderAuthButton = () => {
    if (isLoggedIn) {
      return (
        <div>
          <button className="w-full p-3 bg-gradient-to-r from-[#0CEDE6] to-[#0A8E8A] text-white rounded-xl">
            <Link href="/profile">Profile</Link>
          </button>
        </div>
      );
    } else {
      return (
        <div
          className="cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem]"
          onClick={() => showComponent("signup")}
        >
          <Image
            width={16}
            height={16}
            src={"https://img.icons8.com/ios/50/guest-male.png"}
            alt="registration icon"
          />
          <span className="text-lg">Registration</span>
        </div>
      );
    }
  };

  const toggleSignup = () =>{
    if(isNeedVisible){
      setVisibleComponent(null);
    } else{
      setVisibleComponent("signup");
    }
    setSignupVisible(!isSignupVisible)
  }

  const toggleNeed = () =>{
    if(isNeedVisible){
      setVisibleComponent(null);
    } else{
      setVisibleComponent("need-help");
    }
    setNeedVisible(!isNeedVisible)
  }

  const toggleLocation = () =>{
    if(isLocationVisible){
      setVisibleComponent(null);
    } else{
      setVisibleComponent("location");
    }
    setLocationVisible(!isLocationVisible)
  }

  return (
    <>
      <nav className="p-4 border-b-[0.3rem] border-[#d5d5d5]">
        <div className="container mx-auto flex justify-between items-center max-[1025px]:min-[765px]:gap-[2rem]">
          <div className="flex gap-[2.5rem] items-center justify-center">
            <div className="flex gap-[0.2rem] items-end">
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
            <div onClick={toggleLocation} className={`flex items-center justify-center gap-1 mt-2 cursor-pointer ${isLocationVisible && 'bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg'}`}>
                <Image
                  className="invert-[0.4]"
                  width={28}
                  height={24}
                  src={"https://img.icons8.com/ios/50/marker--v1.png"}
                  alt="location icon"
                />
                <span className="text-lg">Location</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <div onClick={toggleNeed} className={`flex items-center justify-center gap-1 mt-2 cursor-pointer ${isNeedVisible && 'bg-[#0A8E8A] text-white p-[0.3rem] rounded-lg'}`}>
                <Image
                  className="rotate-[-80deg] invert-[0.3]"
                  width={16}
                  height={16}
                  src={
                    "https://img.icons8.com/material-outlined/24/phone-disconnected.png"
                  }
                  alt="help icon"
                />
                <span className="text-lg">Need Help</span>
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
                  alt="reports icon"
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
                  alt="cart icon"
                />
                <span className="text-lg">Cart</span>
              </Link>
            </div>

            {!isLoggedIn ? (
              <div
                className="cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem]"
                onClick={toggleSignup}
              >
                <Image
                  width={16}
                  height={16}
                  src={"https://img.icons8.com/ios/50/guest-male.png"}
                  alt="yourlab icon"
                />
                <span className="text-lg">Registration</span>
              </div>
            ) : (
              ""
            )}

            {isLoggedIn === true  ? (
              <div>
                <button
                  className={`w-full p-3 bg-gradient-to-r from-[#0CEDE6] text-white rounded-xl to-[#0A8E8A]`}
                >
                  <Link href="/profile">Profile</Link>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="md:hidden relative xs:top-[0.4rem] xs:left-2">
            <button onClick={toggleMenu} className="text-xl focus:outline-none">
              <FaBars />
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-2 space-y-4 xs:py-[1rem] xs:px-[3rem] sm:px-[4rem] sm:py-[2rem] ">
            <div className="flex items-center space-x-4">
              <FaPhone className="text-xl" />
              <span>Need Help</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaFileAlt className="text-xl" />
              <span>Report</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaShoppingCart className="text-xl" />
              <span>Cart</span>
            </div>
            {!isLoggedIn || !isSignedIn ? (
            <div className="flex items-center space-x-4">
              <FaUser className="text-xl" onClick={toggleSignup} />
              <span>Register</span>
            </div>
          ) : (
              ""
            )}

            {isLoggedIn === true || isSignedIn === true ? (
              <div>
                <button
                  className={`w-full p-3 bg-gradient-to-r from-[#0CEDE6] text-white rounded-xl to-[#0A8E8A]`}
                >
                  <Link href="/profile">Profile</Link>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </nav>

      {visibleComponent === "location" && isLocationVisible && (
        <div className="absolute z-10 top-[16%] w-full h-[100vh] bg-[#0000004b]">
        <div className="absolute left-[15%] top-[4%] z-10 bg-white rounded-xl">
          <Location />
        </div>
        </div>
      )}      

      {visibleComponent === "need-help" && isNeedVisible && (
        <div className="absolute z-10 top-[16%] w-full h-[100vh] bg-[#0000004b]">
        <div className="absolute right-[15%] top-[4%] z-10">
          <NeedHelp />
        </div>
        </div>
      )}      

      {visibleComponent === "signup" && (
        <div className="absolute top-[8rem] left-[20%] z-10 w-[60%] mx-auto">
          <div className="font-bold right-4 top-4 text-[1.2rem] absolute cursor-pointer" onClick={()=>setVisibleComponent(null)}>
          <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/multiply.png" alt="multiply"/>
          </div>
          <Signup onBack={() => showComponent("login")} />
        </div>
      )}

      {visibleComponent === "login" && (
        <div className="absolute top-[8rem] left-[20%] z-10 w-[60%] mx-auto">
          <div className="font-bold right-4 top-4 text-[1.2rem] absolute cursor-pointer" onClick={()=>setVisibleComponent(null)}>
          <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/multiply.png" alt="multiply"/>
          </div>
          <Login onBack={showSignup} onBack1={showForgot} setVisibleComponent={setVisibleComponent}/>
        </div>
      )}

      {visibleComponent === "forgot" && (
        <div className="absolute top-[8rem] left-[20%] z-10 w-[60%] mx-auto">
          <div className="font-bold right-4 top-4 text-[1.2rem] absolute cursor-pointer" onClick={()=>setVisibleComponent(null)}>
          <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/multiply.png" alt="multiply"/>
          </div>
          <Forget />
        </div>
      )}
    </>
  );
};

export default Navbar;