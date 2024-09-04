"use client";

import Forget from "@/app/forget/page";
import { getUserData } from "@/app/GlobalRedux/slice/AuthSlice";
import Login from "@/app/login/page";
import Signup from "@/app/signup/page";
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
import { isNull } from "util";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [visibleComponent, setVisibleComponent] = useState(null);
  const [isSignupVisible, setSignupVisible] = useState(false);
  const showSignup = () => setVisibleComponent("signup");
  const showLogin = () => setVisibleComponent("login");
  const showForgot = () => setVisibleComponent("forgot");

  // Selecting the auth state from the Redux store
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserData());
    // console.log(response)
  }, [dispatch]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSignup = () => {
    if (isSignupVisible) {
      setVisibleComponent(null);
    } else {
      setVisibleComponent("signup");
    }
    setSignupVisible(!isSignupVisible);
  };

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
            <div>
              <Link
                href={"/location"}
                className="cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] xs:right-4"
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
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <div>
              <Link
                href={"/help"}
                className="cursor-pointer flex items-center relative top-[0.2rem] gap-[0.3rem] lg:w-[8rem] lg:ml-[1rem] mx-[2rem] w-[7rem] md:mr-[-1rem]"
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

            {isLoggedIn ? (
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
              <span>Contact</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaFileAlt className="text-xl" />
              <span>Report</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaShoppingCart className="text-xl" />
              <span>Cart</span>
            </div>
            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <FaUser className="text-xl" onClick={toggleSignup} />
                <span>Register</span>
              </div>
            ) : (
              <div>
                <button
                  className={`w-full p-3 bg-gradient-to-r from-[#0CEDE6] text-white rounded-xl to-[#0A8E8A]`}
                >
                  <Link href="/profile">Profile</Link>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {visibleComponent === "signup" && isSignupVisible && (
        <div className="absolute top-[8rem] left-[20%] z-10 w-[60%] mx-auto">
          <div
            className="font-bold right-4 top-4 text-[1.2rem] absolute cursor-pointer"
            onClick={() => setVisibleComponent(null)}
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/multiply.png"
              alt="multiply"
            />
          </div>
          <Signup onBack={showLogin} />
        </div>
      )}

      {visibleComponent === "login" && (
        <div className="absolute top-[8rem] left-[20%] z-10 w-[60%] mx-auto">
          <div
            className="font-bold right-4 top-4 text-[1.2rem] absolute cursor-pointer"
            onClick={() => setVisibleComponent(null)}
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/multiply.png"
              alt="multiply"
            />
          </div>
          <Login
            onBack={showSignup}
            onBack1={showForgot}
            setVisibleComponent={setVisibleComponent}
          />
        </div>
      )}

      {visibleComponent === "forgot" && (
        <div className="absolute top-[8rem] left-[20%] z-10 w-[60%] mx-auto">
          <div
            className="font-bold right-4 top-4 text-[1.2rem] absolute cursor-pointer"
            onClick={() => setVisibleComponent(null)}
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/multiply.png"
              alt="multiply"
            />
          </div>
          <Forget />
        </div>
      )}
    </>
  );
};

export default Navbar;

// "use client";

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../GlobalRedux/slice/AuthSlice";
// import { login } from "../GlobalRedux/slice/AuthSlice";
// import { useRouter } from "next/navigation";

// const Logout = () => {
//   const [shadow, setShadow] = useState("0_0_0.4rem_0_gray");

//   const router = useRouter();

//   const dispatch = useDispatch();

//   return (
//     <div>
//       {(isLoggedIn === true || isSignedIn === true) ? (
//         <button
//           className={`w-full mt-6 p-3 bg-gradient-to-r from-[#0CEDE6] text-white rounded-xl to-[#0A8E8A]`}
//           onMouseDown={() => setShadow("inset_0_0_0.4rem_0_gray")}
//           onMouseUp={() => setShadow("0_0_0.4rem_0_gray")}
//           onClick={onLogout}
//         >
//           Logout
//         </button>
//         ) : ''}
//     </div>
//   );
// };

// export default Logout;
