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
  const { data} = useSelector((state: RootState) => state.auth);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4" data-aos="fade-in">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {userData?.avatar?.secure_url ? (
              <Image
                src={userData.avatar.secure_url}
                alt="Profile Picture"
                className="w-24 h-24 rounded-full object-cover"
                width={100}
                height={100}
                priority
                data-aos="fade-out"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300"></div> // Placeholder if no image
            )}
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <p className="text-sm">Update Profile picture</p>
            <button
              className="text-white p-1 rounded-full"
              onClick={handleUpdateProfileImage}
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

        {/* Full Name Input */}
        <div className="relative mt-6" data-aos="fade-left">
          <input
            type="text"
            value={userData?.fullName || ""}
            className="block w-full p-3 pl-5 pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500"
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
        <div className="relative mt-4" data-aos="fade-right">
          <input
            type="email"
            value={userData?.email || ""}
            className="block w-full p-3 pl-5 pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500"
            readOnly
          />
        </div>

        {/* Mobile No. Input */}
        <div className="relative mt-4" data-aos="fade-left">
          <input
            type="text"
            value={userData?.mobile || ""}
            className="block w-full p-3 pl-5 pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500"
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

        <button
          className="w-full mt-6 p-3 bg-gradient-to-r from-[#0CEDE6] text-white rounded-xl to-[#0A8E8A]"
          onClick={handleNavigateOnSetting}
        >
          Settings
        </button>
        <Logout />
      </div>
    </div>
  );
};

export default ProfileSettings;
