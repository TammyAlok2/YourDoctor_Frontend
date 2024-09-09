"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getUserData, updatePassword } from "../GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import { AppDispatch } from "../GlobalRedux/store";

interface ResetFormData {
  oldPassword: string;
  newPassword: string;
}

export default function Reset() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // const dispatch = useDispatch();
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const togglePasswordVisibility = (e:any) => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (e:any) => {
    e.preventDefault();
    if (!data.oldPassword || !data.newPassword) {
      toast.error("All fields are mandatory");
      return;
    }
    const response = await dispatch(updatePassword(data));
    if (response?.payload?.success) {
      router.push("/login");
    }
    console.log(response);
    await dispatch(getUserData());
    setData({
      oldPassword: "",
      newPassword: "",
    });
  };
  // console.log(data)
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl text-gray-950 font-bold mb-4 text-center">
            Update Password
          </h1>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-6 relative">
              <label
                className="block mb-2 font-semibold"
                htmlFor="new-password"
              >
                Old Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter new password"
                className="w-full p-2 border rounded-lg"
                value={data.oldPassword}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 bottom-1 transform -translate-y-1/2 text-gray-600 mt-1"
              >
                <img
                  src={
                    showPassword ? "/eye-open-icon.png" : "/eye-closed-icon.png"
                  }
                  alt="Toggle Password Visibility"
                  width="20"
                  height="20"
                />
              </button>
            </div>
            <div className="mb-6 relative">
              <label
                className="block mb-2 font-semibold"
                htmlFor="confirm-password"
              >
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Confirm password"
                className="w-full p-2 border rounded-lg"
                value={data.newPassword}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 bottom-1 transform -translate-y-1/2 text-gray-600 mt-1"
              >
                <img
                  src={
                    showPassword ? "/eye-open-icon.png" : "/eye-closed-icon.png"
                  }
                  alt="Toggle Password Visibility"
                  width="20"
                  height="20"
                />
              </button>
            </div>
            <button className="w-full p-2 bg-teal-600 text-white rounded-lg">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
