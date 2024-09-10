"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, getUserData } from "../GlobalRedux/slice/AuthSlice";
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import Image from "next/image";
import { AppDispatch, RootState } from "../GlobalRedux/store";

// Define the shape of the data state
interface DataState {
  previewImage: string;
  fullName: string;
  avatar: File | undefined;
  userId: string;
}

const UpdateProfile: React.FC = () => {
  const userId = useSelector((state: RootState) => state?.auth?.data?._id || "");
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState<DataState>({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: userId || "",
  });

  useEffect(() => {
    if (userId) {
      setData((prevData) => ({
        ...prevData,
        userId: userId,
      }));
    }
  }, [userId]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const handleInputUpload = (e: any) => {
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

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullName.length < 5) {
      toast.error("Name cannot be less than 5 characters long");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    await dispatch(updateUserProfile([data.userId, formData]));
    await dispatch(getUserData());
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Update Profile Data</h1>
        <div className="flex flex-col md:flex-row">
          <form
            className="flex flex-col justify-center gap-5 rounded-lg p-4 w-80 min-h-[26rem] shadow-xl"
            onSubmit={onFormSubmit}
          >
            <div className="md:w-1/4 mb-6 md:mb-0">
              <div className="flex items-center">
                <label className="cursor-pointer" htmlFor="image_uploads">
                  {data?.previewImage ? (
                    <Image
                      src={data?.previewImage}
                      alt="Profile Update"
                      className="w-[12rem] h-[12rem] rounded-full mb-4"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <BsPersonCircle className="w-28 h-28 rounded-full m-auto text-gray-700" />
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
            </div>
            <div className="w-full md:w-3/4 ml-0 md:ml-8">
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  required
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter your name"
                  className="w-full p-2 border rounded-lg"
                  value={data.fullName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer"
            >
              Update Profile
            </button>

            <Link href="/profile">
              <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2 font-semibold">
                <AiOutlineArrowLeft /> Go back to profile
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
