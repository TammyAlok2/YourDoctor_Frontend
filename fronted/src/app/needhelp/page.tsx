"use client";

// components/Form.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postEnquiry } from "../GlobalRedux/slice/DoctorSlice";
import { toast, Toaster } from "react-hot-toast";
import { AppDispatch } from "../GlobalRedux/store";

// Define the shape of the error object
interface Errors {
  name: string;
  mobile: string;
}

// Define the shape of the form data
interface FormData {
  name: string;
  number: string;
}



const NeedHelp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [mobile, setMobile] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({ name: "", mobile: "" });

  const validate = (): boolean => {
    let nameError = "";
    let mobileError = "";

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name) {
      nameError = "Name is required";
    } else if (!nameRegex.test(name)) {
      nameError = "Name can only contain letters";
    } else if (name.length < 2) {
      nameError = "Name must be at least 2 characters";
    } else {
      nameError = "";
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile) {
      mobileError = "Mobile number is required";
    } else if (!mobileRegex.test(mobile)) {
      mobileError = "Mobile number must be 10 digits long";
    } else {
      mobileError = "";
    }

    if (nameError || mobileError) {
      setErrors({ name: nameError, mobile: mobileError });
      return false;
    }
    setErrors({ name: "", mobile: "" });
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    
    if (!validate()) {
      toast.error("Please fill all the required fields"); // Stop form submission if validation fails
    }
    else{
      const data: FormData = {
        name: name,
        number: mobile,
      };
      
  
      const response = await dispatch(postEnquiry(data));
      console.log(response);
      if (response?.payload?.success) {
        toast.success("Enquiry send successfully");
  
        // Reset form fields
        setName("");
        setMobile("");
      } else {
        toast.error("Enquiry send failed");
      }
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter your name"
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
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.mobile ? "border-red-500" : ""
              }`}
              placeholder="Enter your mobile number"
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
