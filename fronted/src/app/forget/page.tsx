"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { forgotPassword } from "../GlobalRedux/slice/AuthSlice";
import { AppDispatch } from "../GlobalRedux/store";

interface ForgetData {
  email: string;
}

export default function Forget() {
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
    
    // Modified dispatch call
    const response = await dispatch(forgotPassword([data.email,null]));
    
    if (response.payload) {
      router.push("/");
    }
    setData({ email: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white rounded-xl">
      <div className="w-full max-w-md p-8 rounded">
        <h1 className="text-3xl text-gray-950 font-bold mb-6 text-center">
          Forget Password
        </h1>
        <form onSubmit={onFormSubmit}>
          <div className="mb-6 text-black">
            <label className="font-bold mb-2 text-gray-950">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full p-2 border rounded-lg"
              value={data.email}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-teal-600 text-white rounded-lg mb-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}