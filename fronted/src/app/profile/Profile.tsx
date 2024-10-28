"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logout from "../logout/page";
import { AppDispatch, RootState } from "../GlobalRedux/store";
import AOS from "aos";

interface UserData {
  avatar?: { secure_url?: string };
  fullName?: string;
  email?: string;
  mobile?: string;
}

const ProfileSettings: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState<UserData | null>(null);
  // console.log(userData)

  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);

  useEffect(() => {

    // Try to get user data from localStorage
    const storedData = localStorage.getItem('data');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      // Fetch user data if not available in localStorage
      dispatch(getUserData()).then((result: any) => {
        if (result.payload?.user) {
          setUserData(result.payload.user);
          // Save user data to localStorage
          localStorage.setItem('data', JSON.stringify(result.payload.user));
        }
      });

    }
  }, [dispatch, router]);

  useEffect(() => {
    // Update localStorage whenever userData changes
    if (userData) {
      localStorage.setItem('data', JSON.stringify(userData));
    }
  }, [userData]);

  const handleUpdateProfileImage = () => {
    router.push("/profile/updateuserimage");
  };

  const handleUpdateProfileUserName = () => {
    router.push("/profile/updateusername");
  };

  const handleUpdateProfileUserMobile = () => {
    router.push("/profile/updateusermobile");
  };

  const handleNavigateOnSetting = () => {
    router.push("/profile/settings");
  };

  return (
    <div className="flex h-[85vh] flex-col items-center justify-center p-4 mt-[5rem]" data-aos="fade-in">
      <div className="bg-white px-6 py-[2rem] rounded-lg shadow-md w-full max-w-md relative">
        {/* Profile Picture */}

        <button
          className="absolute right-2"
          onClick={handleNavigateOnSetting}
        >
          <Image width="30" height="30" src="https://img.icons8.com/ios-filled/50/settings.png" alt="settings"/>
        </button>


        <div className="">
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative border-[.1rem] border-gray-600 rounded-full mb-[1rem]">
            {userData?.avatar?.secure_url ? (
              <Image
                src={userData.avatar.secure_url}
                alt="Profile Picture"
                className="w-[8rem] h-[8rem] rounded-full object-cover"
                width={100}
                height={100}
                priority
                data-aos="fade-out"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300"></div> // Placeholder if no image
            )}
          <div className="flex items-center space-x-1 mt-2 absolute bottom-1 right-0 bg-white rounded-full shadow-md border-[.1rem] active:shadow-inner active:bg-gray-300">
            {/* <p className="text-sm">Update Profile picture</p> */}
            <button
              className="text-white p-1 rounded-full"
              onClick={handleUpdateProfileImage}
            >
              <Image
                width="24"
                height="24"
                src="https://img.icons8.com/material-rounded/50/39968B/pencil--v2.png"
                alt="pencil--v2"
                className="drop-shadow-md"
              />
            </button>
          </div>
          </div>
        </div>

        {/* Full Name Input */}
        <div className="flex flex-col gap-2">
          <div className="relative" data-aos="fade-left">
            <input
              type="text"
              value={userData?.fullName || ""}
              className="block w-full text-gray-700 text-center text-[2rem] font-bold rounded-xl focus:outline-none"
              readOnly
            />
            <button
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
              onClick={handleUpdateProfileUserName}
            >
              <Image
                width="24"
                height="24"
                src="https://img.icons8.com/material-rounded/50/39968B/pencil--v2.png"
                alt="pencil--v2"
              />
            </button>
          </div>

          {/* Email Input */}
          <div className="relative mt-1" data-aos="fade-right">
            <input
              type="email"
              value={userData?.email || ""}
              className="block w-full text-gray-700 text-center text-[1.2rem] font-semibold rounded-xl focus:outline-none"
              readOnly
            />
          </div>

          {/* Mobile No. Input */}
          <div className="relative mt-1" data-aos="fade-left">
            <input
              type="text"
              value={userData?.mobile || ""}
              className="block w-full text-gray-700 text-center text-[1.2rem] font-medium rounded-xl focus:outline-none"
              readOnly
            />
            <button
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
              onClick={handleUpdateProfileUserMobile}
            >
              <Image
                width="24"
                height="24"
                src="https://img.icons8.com/material-rounded/50/39968B/pencil--v2.png"
                alt="pencil--v2"
              />
            </button>
          </div>
        </div>
        </div>

        
        <Logout />
      </div>
    </div>
  );
};

export default ProfileSettings;
