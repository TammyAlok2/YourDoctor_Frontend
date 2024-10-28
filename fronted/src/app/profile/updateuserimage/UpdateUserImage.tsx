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
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";

// Define the shape of the form data
interface FormData {
  previewImage: string;
  avatar?: File;
  userId: string;
}

const UpdateUserImage:React.FC = () => {
  // const router = useRouter();
  const userId = useSelector((state: RootState) => state?.auth?.data?._id || "");
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState({
    previewImage: "",
    avatar: undefined,
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

  // console.log(dispatch(updateUserProfile([data.userId])))

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  // console.log(data?.userId)

  const handleInputUpload = (e:any) => {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: fileReader.result as string,
          avatar: uploadImage,
        });
      });
    }
  };
  // console.log(data.previewImage)

  const onFormSubmit = async (e:any) => {
    e.preventDefault();
    if (!data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", data.avatar);
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
            <label className="cursor-pointer " htmlFor="image_uploads" data-aos="fade-in">
              {data?.previewImage ? (
                <Image
                  src={data?.previewImage} // Replace with actual profile picture URL or a placeholder
                  alt="Profile Picture"
                  className="w-24 h-24 rounded-full object-cover"
                  width={100}
                  height={100}
                  priority
                />
              ) : (
                <BsPersonCircle className="w-28 h-28 rounded-full m-auto  text-gray-700 " />
              )}
            </label>
              <input
                onChange={handleInputUpload}
                type="file"
                accept="image/*"
                className="hidden"
                id="image_uploads"
                name="image_uploads"
              />
            </div>
            <div className="flex items-center space-x-1 mt-2" data-aos="fade-in">
              <button
              type="submit"
                className="mt-3 p-3 bg-gradient-to-r from-[#0CEDE6] text-white rounded-full to-[#0A8E8A]"
              >
                Update Profile Image
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
