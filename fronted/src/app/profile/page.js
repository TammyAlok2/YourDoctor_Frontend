"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserData } from "../GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logout from "../logout/page";

const ProfileSettings = () => {
  const router = useRouter();
  const userData = useSelector((state) => state?.auth?.data);
  // console.log(userData?.avatar?.secure_url)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
    // console.log(response)
  }, []);

  const handleUpdateProfileImage = () => {
    // Logic to update the profile goes here
    router.push("/profile/updateuserimage");
  };
  const handleUpdateProfileUserName = () => {
    // Logic to update the profile goes here
    router.push("/profile/updateusername");
  };
  const handleUpdateProfileUserMobile = () => {
    // Logic to update the profile goes here
    router.push("/profile/updateusermobile");
  };

  const handleNavigateOnSetting = () => {
    // Logic to update the profile goes here
    router.push("/profile/settings");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {userData.avatar && (
              <Image
                src={userData.avatar?.secure_url || ""} // Replace with actual profile picture URL or a placeholder
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
            <Image width="24" height="24" src="https://img.icons8.com/material-rounded/50/39968B/pencil--v2.png" alt="pencil--v2"/>
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
          <Image width="24" height="24" src="https://img.icons8.com/material-rounded/50/39968B/pencil--v2.png" alt="pencil--v2"/>
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
          <Image width="24" height="24" src="https://img.icons8.com/material-rounded/50/39968B/pencil--v2.png" alt="pencil--v2"/>
          </button>
        </div>
        <button className="relative flex w-full p-3 pl-[3rem] pr-10 mt-5 text-gray-700 border rounded-xl focus:outline-none border-teal-500" onClick={handleNavigateOnSetting}>
          Settings
          <Image width="30" height="30" className='absolute right-2 bottom-[0.7rem]' src="https://img.icons8.com/ios-glyphs/30/chevron-right.png" alt="chevron-right"/>
        </button>
        <Logout />
        {/* Settings Button */}
      </div>
    </div>
  );
};

export default ProfileSettings;

