"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";
import { toast } from "react-hot-toast";
import Image from 'next/image';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }
    if (!isEmail(loginData.email)) {
      toast.error("Invalid email id");
      return;
    }
    if (!isValidPassword(loginData.password)) {
      toast.error(
        "Password should be 6 - 16 characters long with at least a number and special character"
      );
      return;
    }

    try {
      const response = await dispatch(login(loginData));
      if (response?.payload?.success) {
        console.log(response);
        router.push("/");
        setLoginData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white rounded-xl">
      <div className="w-full max-w-md p-8 rounded">
        <h1 className="text-3xl text-gray-950 font-bold mb-4 text-center">
          Hi, Welcome Back! 👋
        </h1>
        <form noValidate onSubmit={onLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="font-bold mb-2 text-gray-950">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full p-2 border rounded-lg text-black"
              value={loginData.email}
              onChange={handleUserInput}
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="font-bold mb-2 text-gray-950">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              className="w-full p-2 border rounded-lg pr-10 text-black"
              value={loginData.password}
              onChange={handleUserInput}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 mt-3"
            >
              <Image
                src={showPassword ? "/eye-open-icon.png" : "/eye-closed-icon.png"}
                width={20}
                height={20}
                alt={showPassword ? "Hide password" : "Show password"}
              />
            </button>
          </div>
          <div className="flex justify-end mb-4">
            <a href="#" className="text-red-600 text-sm cursor-pointer">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-teal-600 text-white rounded-lg mb-6"
          >
            Login
          </button>
          <div className="text-center text-gray-500 mb-6">
            _____________or With_____________
          </div>
          <button type="button" className="w-full p-2 bg-white text-gray-500 border rounded-lg flex items-center justify-center mb-6 relative">
            <Image
              src="/google-logo.png"
              alt="Google Logo"
              width={20}
              height={20}
              className="mr-4"
            />
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
}