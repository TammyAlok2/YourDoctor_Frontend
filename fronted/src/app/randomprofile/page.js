'use client';

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserData } from "../GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();
  const userData = useSelector((state)=> state?.auth?.data);
  // console.log(userData?.avatar?.secure_url)

  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(getUserData());
    // console.log(response)
  },[])

  const handleUpdateProfile = () => {
    // Logic to update the profile goes here
    router.push("/profileupdate")
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="flex flex-col items-center">
            {
              userData.avatar && <Image
                src={userData.avatar?.secure_url || ""}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4"
                width={100}
                height={100}
                priority
              />
            }
              <button
                className="bg-teal-600 text-white py-2 px-4 rounded-lg"
                onClick={handleUpdateProfile}
              >
                Update Profile
              </button>
            </div>
          </div>
          <div className="w-full md:w-3/4 ml-0 md:ml-8">
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <div
                className="w-full p-2 border rounded-lg h-10"
              >{userData?.fullName || ""}</div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <div
                className="w-full p-2 border rounded-lg h-10"
              >{userData?.mobile || ""}</div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <div
                className="w-full p-2 border rounded-lg h-10"
              >{userData?.email || ""}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

