'use client';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccount } from "../../app/GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import { isEmail, isValidPassword } from "../../app/Helpers/regexMatcher";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { AppDispatch } from "../../app/GlobalRedux/store";

interface SignupData {
  name: string;
  email: string;
  password: string;
  mobile: string;
  avatar: File | string;
}
interface SignProps {
  onSignupCancel: () => void;
  onBack: () => void;
}
const SignupPage: React.FC<SignProps> = ({onSignupCancel, onBack}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
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
      !signupData.name ||
      !signupData.mobile 
    ) {
      toast.error("Please fill all the details");
      return;
    }

    if (signupData.name.length < 5) {
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

    // Convert FormData to plain object if needed
    const registerData = {
      name:'yourlab',
      fullName: signupData.name,
      email: signupData.email,
      password: signupData.password,
      mobile: signupData.mobile,
      avatar: signupData.avatar instanceof File ? signupData.avatar : null,
    };

    try {
      const response = await dispatch(createAccount(registerData));
      if (response?.payload?.success) {
        router.push("/");
        setSignupData({
          name: "",
          email: "",
          password: "",
          mobile: "",
          avatar: "",
        });
        setPreviewImage("");
        onBack();
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup");
    }
  }

  return (
    <div className="flex border-black border-[0.1rem] justify-center items-center min-h-[85vh] mt-3 bg-white rounded-xl" data-aos="fade-in">
      <div className="w-full max-w-sm p-8 rounded -mt-5">
        <h1 className="text-2xl text-gray-950 font-bold mb-4 text-center">
          Create an Account
        </h1>
        <form onSubmit={createNewAccount} className="flex flex-col gap-[0.5rem]">
          <div className="my-1 text-[0.9rem]">
            <label htmlFor="image_uploads" className="cursor-pointer">
              {previewImage ? (
                <img
                  className="w-20 h-20 rounded-full m-auto"
                  src={previewImage}
                  alt="Preview"
                />
              ) : (
                <BsPersonCircle className="w-20 h-20 rounded-full m-auto text-gray-600" />
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
          <div className="mb-1 text-[0.9rem] flex flex-col">
          <label className="font-bold mb-1 text-gray-950">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              className="w-full p-2 border rounded-lg text-black"
              value={signupData.name}
              onChange={handleUserInput}
            />
          </div>
          <div className="mb-1 text-[0.9rem] flex flex-col">
          <label className="font-bold mb-1 text-gray-950">Mobile</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter Your Mobile Number"
              className="w-full p-2 border rounded-lg text-black"
              value={signupData.mobile}
              onChange={handleUserInput}
            />
          </div>
          <div className="mb-1 text-[0.9rem] flex flex-col">
          <label className="font-bold mb-1 text-gray-950">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full p-2 border rounded-lg text-black"
              value={signupData.email}
              onChange={handleUserInput}
            />
          </div>
          <div className="mb-4 relative text-[0.9rem] flex flex-col">
          <label className="font-bold mb-1 text-gray-950">Password</label>
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
              className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-600 mt-1"
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
            className="w-full p-2 bg-teal-600 text-white rounded-lg mb-1 text-[0.9rem]"
          >
            Sign up
          </button>
          <div className="text-center text-gray-500 mb-2">
            _____________or With_____________
          </div>
          <button className="w-full p-2 bg-white text-gray-500 border rounded-lg flex items-center justify-center mb-2">
            <img
              src="/google-logo.png"
              alt="Google Logo"
              width="20"
              height="20"
              className="mr-2"
            />
            <span className="mx-auto text-[0.9rem]">Sign up with Google</span>
          </button>
          <div className="text-center cursor-pointer font-medium text-[0.9rem]"  onClick={onBack}>
            <span className="text-black cursor-pointer">
              Already have an account?{" "}
            </span>
            <span className="text-[#160062]">Log In </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
