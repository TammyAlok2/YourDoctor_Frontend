"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserProfile,
  getUserData,
} from "../../GlobalRedux/slice/AuthSlice";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
// import { useRouter } from "next/navigation";

// Define the shape of the form data
interface FormData {
  mobile: string;
  userId: string;
}

const UpdateUserMobile:React.FC = () => {
  const userId = useSelector((state:RootState) => state?.auth?.data?._id);
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<FormData>({
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

  const validateMobileNumber = (mobile:string) => {
    const mobilePattern = /^[6-9]\d{9}$/;
     
    return mobilePattern.test(mobile);
  };

  const onFormSubmit = async (e:any) => {
    e.preventDefault();
    const { mobile } = data;

    if (!mobile) {
      toast.error("Mobile number is required");
      return;
    }

    if (!validateMobileNumber(mobile)) {
      toast.error(
        "Mobile number should have 10 digits and start with a digit between 6 and 9"
      );
      return;
    }

    const formData = new FormData();
    formData.append("mobile", mobile);

    await dispatch(updateUserProfile([data.userId, formData]));
    await dispatch(getUserData());
    toast.success("Mobile number updated successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={onFormSubmit}>
          <div className="flex flex-col items-center">
            <div className="relative">
              <label className="block text-gray-700">Mobile</label>
              <input
                required
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Enter your mobile number"
                className="block w-full p-3 pl-5 pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500"
                value={data.mobile}
                onChange={handleInputChange}
                data-aos="fade-left"
              />
            </div>
            <div className="flex items-center space-x-1 mt-2" data-aos="fade-in">
              <button
                type="submit"
                className="mt-3 p-3 bg-gradient-to-r from-[#0CEDE6] text-white rounded-full to-[#0A8E8A]"
              >
                Update Mobile Number
              </button>
            </div>
          </div>

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

export default UpdateUserMobile;
