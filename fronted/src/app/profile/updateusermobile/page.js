"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserProfile,
  getUserData,
} from "../../GlobalRedux/slice/AuthSlice";
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
import Image from "next/image";

const UpdateUserImage = () => {
  // const router = useRouter();
  const userId = useSelector((state) => state?.auth?.data?._id);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    mobile: "",
    userId: userId,
  });

  useEffect(() => {
    if (userId) {
      setData((prevData) => ({
        ...prevData,
        userId: userId,
      }));
    }
  }, [userId]);

  console.log(dispatch(updateUserProfile([data.userId])))

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  useEffect(() => {
    dispatch(getUserData([]));
  }, []);
  // console.log(data.previewImage)

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!data.mobile) {
      toast.error("All fields are mandatory");
      return;
    }
    // if (data.fullName > 5) {
    //   toast.error("name cannot be of less than 5 characters");
    //   return;
    // }
    const formData = new FormData();
    formData.append("mobile", data.mobile);
    // formData.append("avatar", data.avatar);
    // console.log(formData.entries().next())
    // console.log(formData.entries().next())
    await dispatch(updateUserProfile([data.userId, formData]));

    await dispatch(getUserData());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Profile Picture */}
        <form onSubmit={onFormSubmit}>
          <div className="flex flex-col items-center">
            <div className="relative">
              <label className="block text-gray-700">Mobile</label>
              <input
                required
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Enter your name"
                className="block w-full p-3 pl-5 pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500"
                value={data.mobile}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center space-x-1 mt-2">
              <button
                type="submit"
                className="mt-3 p-3 bg-gradient-to-r from-[#0CEDE6] text-white rounded-full to-[#0A8E8A]"
              >
                Update Mobile Number
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

export default UpdateUserImage;
