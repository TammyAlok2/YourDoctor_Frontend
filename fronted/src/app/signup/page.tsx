"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccount } from "../GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { AppDispatch } from "../GlobalRedux/store";

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  mobile: string;
  avatar: File | string;
}

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signupData, setSignupData] = useState<SignupData>({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    avatar: "",
  });

  const router = useRouter();

  function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = e.target.files?.[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onload = () => {
        setSignupData({
          ...signupData,
          avatar: uploadedImage,
        });
        setPreviewImage(fileReader.result as string);
      };
    }
  };

  async function createNewAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.fullName ||
      !signupData.mobile ||
      !signupData.avatar
    ) {
      toast.error("Please fill all the details");
      return;
    }

    if (signupData.fullName.length < 5) {
      toast.error("Name should be at least 5 characters");
      return;
    }
    if (!isEmail(signupData.email)) {
      toast.error("Invalid email id");
      return;
    }
    if (!isValidPassword(signupData.password)) {
      toast.error(
        "Password should be 6 - 16 characters long with at least a number and special character"
      );
      return;
    }

    // Create a plain object matching the SignupData type
    const registerData = {
      fullName: signupData.fullName,
      email: signupData.email,
      password: signupData.password,
      mobile: signupData.mobile,
      avatar: signupData.avatar, // You may need to handle avatar upload separately
    };

    try {
      const response = await dispatch(createAccount(registerData));
      if (response?.payload?.success) {
        router.push("/login");
        setSignupData({
          fullName: "",
          email: "",
          password: "",
          mobile: "",
          avatar: "",
        });
        setPreviewImage("");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white rounded-xl">
      <div className="w-full max-w-md p-8 rounded">
        <h1 className="text-3xl text-gray-950 font-bold mb-4 text-center">
          Create an Account
        </h1>
        <form onSubmit={createNewAccount}>
          <div className="my-4">
            <label htmlFor="image_uploads" className="cursor-pointer">
              {previewImage ? (
                <img
                  className="w-24 h-24 rounded-full m-auto"
                  src={previewImage}
                  alt="Preview"
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 rounded-full m-auto text-gray-600" />
              )}
            </label>
            <input
              onChange={getImage}
              className="hidden"
              type="file"
              name="image_uploads"
              id="image_uploads"
              accept=".jpg, .jpeg, .png, .svg"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              name="fullName"
              placeholder="Enter Your Name"
              className="w-full p-2 border rounded-lg text-black"
              value={signupData.fullName}
              onChange={handleUserInput}
            />
          </div>
          <div className="mb-6">
            <input
              type="tel"
              name="mobile"
              placeholder="Enter Your Mobile Number"
              className="w-full p-2 border rounded-lg text-black"
              value={signupData.mobile}
              onChange={handleUserInput}
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full p-2 border rounded-lg text-black"
              value={signupData.email}
              onChange={handleUserInput}
            />
          </div>
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              className="w-full p-2 border rounded-lg pr-10 text-black"
              value={signupData.password}
              onChange={handleUserInput}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 mt-1"
            >
              <img
                src={
                  showPassword
                    ? "/eye-open-icon.png"
                    : "/eye-closed-icon.png"
                }
                alt="Toggle Password Visibility"
                width="20"
                height="20"
              />
            </button>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-teal-600 text-white rounded-lg mb-9"
          >
            Sign up
          </button>
          <div className="text-center text-gray-500 mb-6">
            _____________or With_____________
          </div>
          <button className="w-full p-2 bg-white text-gray-500 border rounded-lg flex items-center justify-center mb-8">
            <img
              src="/google-logo.png"
              alt="Google Logo"
              width="20"
              height="20"
              className="mr-2"
            />
            <span className="mx-auto">Sign up with Google</span>
          </button>
          <div className="text-center cursor-pointer" onClick={() => router.push("/login")}>
            <span className="text-black cursor-pointer">
              Already have an account?{" "}
            </span>
            Log In
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
