"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, getUserData } from "../../GlobalRedux/slice/AuthSlice";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../../GlobalRedux/store";

interface UpdateUserImageState {
  fullName: string;
  userId: string; // Ensure this is always a string
}

const UpdateUserName = () => {
  const userId = useSelector((state: RootState) => state?.auth?.data?._id) || ''; // Fallback to empty string
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState<UpdateUserImageState>({
    fullName: "",
    userId: userId, // Initialize with userId or empty string
  });

  useEffect(() => {
    if (userId) {
      setData((prevData) => ({
        ...prevData,
        userId: userId, // Update userId if available
      }));
    }
  }, [userId]);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Full name validation: letters only and at least 5 characters long
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!data.fullName) {
      toast.error("Full name is required");
      return;
    }

    if (data.fullName.length < 5) {
      toast.error("Full name cannot be less than 5 characters");
      return;
    }

    if (!nameRegex.test(data.fullName)) {
      toast.error("Full name should only contain letters");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);

    const updateData = await dispatch(updateUserProfile([data.userId, formData]));
    await dispatch(getUserData());

    if (updateData.payload) {
      toast.success("Profile updated successfully");
    } else {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Profile Picture */}
        <form onSubmit={onFormSubmit}>
          <div className="flex flex-col items-center">
            <div className="relative">
              <label className="block text-gray-700">Full Name</label>
              <input
                required
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter your name"
                className="block w-full p-3 pl-5 pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500"
                value={data.fullName}
                onChange={handleInputChange}
                data-aos="fade-left"
              />
            </div>
            <div className="flex items-center space-x-1 mt-2" data-aos="fade-in">
              <button
                type="submit"
                className="mt-3 p-3 bg-gradient-to-r from-[#0CEDE6] text-white rounded-full to-[#0A8E8A]"
              >
                Update Profile Name
              </button>
            </div>
          </div>

          {/* Settings Button */}
          <Link href="/profile">
            <p className="link mt-3 text-accent cursor-pointer flex items-center justify-center w-full gap-2 font-semibold">
              <AiOutlineArrowLeft /> Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserName;
