"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";
import { toast } from "react-hot-toast";
import { AppDispatch } from "../GlobalRedux/store";

interface LoginProps {
  onBack: () => void;
  onBack1: () => void;
}

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({
  onBack,
  onBack1,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  async function onLogin(event: React.FormEvent<HTMLFormElement>) {
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
      console.error("Login error:", error);
      toast.error("An error occurred during login");
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
            <label className="font-bold mb-2 text-gray-950">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full p-2 border rounded-lg text-black"
              value={loginData.email}
              onChange={handleUserInput}
            />
          </div>
          <div className="mb-4 relative">
            <label className="font-bold mb-2 text-gray-950">Password</label>
            <input
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
              <img
                src={
                  showPassword ? "/eye-open-icon.png" : "/eye-closed-icon.png"
                }
                width="20"
                height="20"
                alt={showPassword ? "Hide password" : "Show password"}
              />
            </button>
          </div>
          <div className="flex justify-end mb-4 cursor-pointer" onClick={onBack1}>
            <a className="text-red-600 text-sm">
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
          <button 
            type="button"
            className="w-full p-2 bg-white text-gray-500 border rounded-lg flex items-center justify-center mb-6 relative"
          >
            <img
              src="/google-logo.png"
              alt="Google Logo"
              className="mr-4"
              width="20"
              height="20"
            />
            Login with Google
          </button>
          <div className="text-center cursor-pointer"  onClick={() => router.push("/signup")}>
            Don&apos;t have an account? Sign Up
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
