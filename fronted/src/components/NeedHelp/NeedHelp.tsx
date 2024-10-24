"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postEnquiry } from "@/app/GlobalRedux/slice/DoctorSlice";
import { toast, Toaster } from "react-hot-toast";
import { AppDispatch } from "@/app/GlobalRedux/store";
import AOS from "aos";
import Image from "next/image";

interface Errors {
  name: string;
  mobile: string;
}

interface FormData {
  name: string;
  number: string;
}

interface NeedHelpProps {
  onNeedCancel: () => void;
}

const NeedHelp: React.FC<NeedHelpProps> = ({ onNeedCancel }) => {
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [mobile, setMobile] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({ name: "", mobile: "" });

  const validate = (): boolean => {
    let nameError = "";
    let mobileError = "";

    const nameRegex = /^[A-Za-z\s]{5,}$/;
    if (!name) {
      nameError = "Name is required";
    } else if (!nameRegex.test(name)) {
      nameError =
        "Name must be at least 5 letters and contain only letters and spaces";
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobile) {
      mobileError = "Mobile number is required";
    } else if (!mobileRegex.test(mobile)) {
      mobileError =
        "Mobile number must be 10 digits and start with 6, 7, 8, or 9";
    }

    setErrors({ name: nameError, mobile: mobileError });
    return !(nameError || mobileError);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      const data: FormData = {
        name: name,
        number: mobile,
      };

      const response = await dispatch(postEnquiry(data));
      if (response?.payload?.success) {
        toast.success("Enquiry sent successfully");
        setName("");
        setMobile("");
        onNeedCancel();
      } else {
        toast.error("Enquiry send failed");
      }
    } else {
      toast.error("Please correct the errors in the form");
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });
  }, []);

  return (
    <div className="flex justify-center items-center relative z-[-1]" data-aos="fade-in">
      <div className="bg-white p-10 fl pb-6 xs:p-[3rem] rounded-2xl shadow-lg w-full xs:h-screen">


        <div>

        </div>
        <div className="flex gap-[2rem] items-center mb-[1rem]">
          <Image width={100} height={100} src='/YOURLab_Logo.png' alt='Yourlab_Logo' className="w-[13rem] relative ml-[-1rem]" />
          <div className="w-[20rem]">
            <div className="text-left mb-5">
              <h1 className="font-bold text-[1.4rem] relative">Need Help</h1>
              {/* <p className="text-[0.9rem] font-light">We are here to help with any questions or issues you may have</p> */}
            </div>
            <form className="space-y-4 w-[100%]" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-2 border-black border-[0.1rem] rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.name ? "border-red-500" : ""
                    }`}
                  placeholder="Enter your name (min 5 letters)"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Mobile No.
                </label>
                <input
                  type="tel"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={`w-full p-2 border-black border-[0.1rem] rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.mobile ? "border-red-500" : ""
                    }`}
                  placeholder="Enter 10-digit mobile number"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-[90%] mx-[1rem] bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 mt-[0.5rem] relative top-4"
              >
                Submit
              </button>
              <Toaster />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedHelp;