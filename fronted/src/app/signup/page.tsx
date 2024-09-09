"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { createAccount, getUserData } from "../GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import {
  isEmail,
  isValidPassword,
  // isValidPhone,
} from "../Helpers/regexMatcher";

import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { AppDispatch } from "../GlobalRedux/store";

interface SignupProps {
  onBack: () => void;
  setVisibleComponent: (component: string | null) => void;
  setSignupVisible: (visible: boolean) => void;
}

// Define types for signup data state
interface SignupData {
  fullName: string;
  email: string;
  password: string;
  mobile: string;
  avatar: File | string;
}

export default function Signup({onBack, setVisibleComponent, setSignupVisible}:SignupProps) {
  const dispatch = useDispatch<AppDispatch>();

  // const userData = useSelector((state)=>state.data)
  // console.log(userData)
  const [previewImage, setPreviewImage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [signupData, setSignupData] = useState<SignupData>({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    avatar: "",
  });
  // const [openPopup, setOpenPopup] = useState(true);

  const router = useRouter();

  function handleUserInput(e:any) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  // console.log(signupData)

  const togglePasswordVisibility = (e:any) => {
    setShowPassword(!showPassword);
  };

  const getImage = (e:any) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      console.log(fileReader);
      fileReader.addEventListener("load", () => {
        setSignupData({
          ...signupData,
          avatar: uploadedImage,
        });
        setPreviewImage(fileReader?.result as string);
      });
    }
  };

  console.log(signupData.avatar);
  async function createNewAccount(event: any) {
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

    // checking name field length
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 characters");
      return;
    }
    // checking valid email
    if (!isEmail(signupData.email)) {
      toast.error("Invalid email id");
      return;
    }
    // checking password validation
    if (!isValidPassword(signupData.password)) {
      toast.error(
        "Password should be 6 - 16 character long with at least a number and special character"
      );
      return;
    }
    //checking mobile validation
    // if (!isValidPhone(signupData.mobile)) {
    //   toast.error(
    //     "Invalid mobile number. Please enter a valid 10-digit number."
    //   );
    //   return;
    // }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("mobile", signupData.mobile);
    formData.append("avatar", signupData.avatar as Blob);

    // dispatch create account action
    const response = await dispatch(createAccount(formData));

    // console.log(response)
    if (response?.payload?.success) {
      router.push("/");
      setSignupData({
        fullName: "",
        email: "",
        password: "",
        mobile: "",
        avatar: "",
      });
      setPreviewImage("");
      setVisibleComponent(null)
      setSignupVisible(false)
    }
  }


  return (
    <>
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
                    />
                  ) : (
                    <BsPersonCircle className="w-24 h-24 rounded-full m-auto text-gray-600" />
                  )}
                </label>
                <input
                  onChange={getImage}
                  className="hidden text-black border border-gray-800"
                  type="file"
                  name="image_uploads"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png, .svg"
                  // value={""}
                />
              </div>
              <div className="mb-6 text-black">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Your Name"
                  className="w-full p-2 border rounded-lg"
                  value={signupData.fullName}
                  onChange={handleUserInput}
                />
              </div>
              <div className="mb-6 text-black">
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter Your Mobile Number"
                  className="w-full p-2 border rounded-lg"
                  value={signupData.mobile}
                  onChange={handleUserInput}
                />
              </div>
              <div className="mb-6 text-black">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className="w-full p-2 border rounded-lg"
                  value={signupData.email}
                  onChange={handleUserInput}
                />
              </div>
              <div className="mb-6 relative text-black">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your Password"
                  className="w-full p-2 border rounded-lg pr-10"
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
              <div className="text-center cursor-pointer" onClick={onBack}>
                <span
                  className="text-black cursor-pointer"
                >
                  Already have an account?{" "}
                </span>
                Log In
              </div>
            </form>
          </div>
        </div>      
    </>
  );
}
