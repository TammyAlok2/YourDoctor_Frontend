"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserData } from "../GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logout from "../logout/page";
import { AppDispatch } from "../GlobalRedux/store";

interface UserData {
  avatar?: { secure_url?: string };
  fullName?: string;
  email?: string;
  mobile?: string;
}

const ProfileSettings:React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null); // State to hold user data

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedData = localStorage.getItem('data');
    if (storedData) {
      setUserData(JSON.parse(storedData)); // Parse and set user data from localStorage
    } else {
      dispatch(getUserData());
    }
  }, [dispatch]);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {userData?.avatar && (
              <Image
                src={userData.avatar?.secure_url || ""}
                alt="Profile Picture"
                className="w-24 h-24 rounded-full object-cover"
                width={100}
                height={100}
                priority
              />
            )}
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <p className="text-sm">Update Profile picture</p>
            <button className="text-white p-1 rounded-full" onClick={handleUpdateProfileImage}>
              <Image width="24" height="24" src="https://img.icons8.com/material-rounded/50/39968B/pencil--v2.png" alt="pencil--v2" />
            </button>
          </div>
        </div>

        {/* Full Name Input */}
        <div className="relative mt-6">
          <input
            type="text"
            value={userData?.fullName || ""}
            className="block w-full p-3 pl-5 pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500"
            readOnly
          />
          <button className="absolute top-1/2 right-3 transform -translate-y-1/2" onClick={handleUpdateProfileUserName}>
            <Image width="24" height="24" src="https://img.icons8.com/material-rounded/50/39968B/pencil--v2.png" alt="pencil--v2" />
          </button>
        </div>

        {/* Email Input */}
        <div className="relative mt-4">
          <input
            type="email"
            value={userData?.email || ""}
            className="block w-full p-3 pl-5 pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500"
            readOnly
          />
        </div>

        {/* Mobile No. Input */}
        <div className="relative mt-4">
          <input
            type="text"
            value={userData?.mobile || ""}
            className="block w-full p-3 pl-5 pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500"
            readOnly
          />
          <button className="absolute top-1/2 right-3 transform -translate-y-1/2" onClick={handleUpdateProfileUserMobile}>
            <Image width="24" height="24" src="https://img.icons8.com/material-rounded/50/39968B/pencil--v2.png" alt="pencil--v2" />
          </button>
        </div>
        
        <button className="w-full mt-6 p-3 bg-gradient-to-r from-[#0CEDE6] text-white rounded-xl to-[#0A8E8A]" onClick={handleNavigateOnSetting}>
          Settings
        </button>
        <Logout />
      </div>
    </div>
  );
};

export default ProfileSettings;
