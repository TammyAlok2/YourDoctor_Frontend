"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/app/GlobalRedux/slice/AuthSlice";
import { AppDispatch } from "@/app/GlobalRedux/store";

interface ForgetData {
  email: string;
}

interface ForgetProps {
  onForgetCancel: () => void;
}

const Forget: React.FC<ForgetProps> = ({ onForgetCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [data, setData] = useState<ForgetData>({
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.email) {
      toast.error("All fields are mandatory");
      return;
    }
    
    const response = await dispatch(forgotPassword([data.email, null]));
    
    if (response.payload.success) {
      onForgetCancel();
      router.push("/");
    }
    setData({ email: "" });
  };

  return (
    <div className="flex border-black border-[0.1rem] justify-center items-center bg-white rounded-xl xs:h-screen" data-aos="fade-in">
      <div className="w-full max-w-sm p-8 rounded mt-10">
        <h1 className="text-2xl text-gray-950 font-bold mb-4 text-center">
          Forget Password
        </h1>
        <form onSubmit={onFormSubmit}>
          <div className="text-[0.9rem] flex flex-col">
            <label className="font-bold mb-2 text-gray-950">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full p-2 border rounded-lg text-black"
              value={data.email}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-[1rem] text-[0.9rem] bg-teal-600 text-white rounded-lg mb-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forget;