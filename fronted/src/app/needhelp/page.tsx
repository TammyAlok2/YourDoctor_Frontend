"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postEnquiry } from "../GlobalRedux/slice/DoctorSlice";
import { toast, Toaster } from "react-hot-toast";
import { AppDispatch } from "../GlobalRedux/store";

interface Errors {
  name: string;
  mobile: string;
}

interface FormData {
  name: string;
  number: string;
}

interface NeedProps{
  onNeedCancel: () => void;
}

const NeedHelp: React.FC<NeedProps> = ({onNeedCancel}) => {
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [mobile, setMobile] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({ name: "", mobile: "" });

  const validate = (): boolean => {
    let nameError = "";
    let mobileError = "";

    // Name validation: at least 5 letters, only letters and spaces
    const nameRegex = /^[A-Za-z\s]{5,}$/;
    if (!name) {
      nameError = "Name is required";
    } else if (!nameRegex.test(name)) {
      nameError = "Name must be at least 5 letters and contain only letters and spaces";
    }

    // Mobile number validation: 10 digits, starting with 6-9
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobile) {
      mobileError = "Mobile number is required";
    } else if (!mobileRegex.test(mobile)) {
      mobileError = "Mobile number must be 10 digits and start with 6, 7, 8, or 9";
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
      console.log(response);
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

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter your name (min 5 letters)"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="mobile" className="block text-gray-700 font-bold mb-2">
              Mobile No.
            </label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.mobile ? "border-red-500" : ""
              }`}
              placeholder="Enter 10-digit mobile number"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Submit
          </button>
          <Toaster />
        </form>
      </div>
    </div>
  );
};

export default NeedHelp;