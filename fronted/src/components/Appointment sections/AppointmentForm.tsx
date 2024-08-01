"use client";

import { useState } from "react";
import FormSelectedButton from "./AppointmentForm components/FormSelectButton";
import FormHead from "./AppointmentForm components/FormHead";
import Link from "next/link";

const DocForm = () => {
  const [submit, setSubmit] = useState(true);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Do something with formData if needed
    setSubmit(false)
  };

  return (
   
    <div className="">
      <div className="w-[75%] mx-auto h-[85%] bg-white p-[2rem] border-x-[0.1rem] border-gray-200">
        <FormHead />
        <form className="font-bold flex flex-col gap-[1rem]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[0.3rem]">
            <label htmlFor="name">patient Name*</label>
            <input
              type="text"
              name="name"
              id="name"
              className="p-[0.2rem] border-[0.1rem] [box-shadow:0rem_0.1rem_.1rem_0rem_gray] border-black py-3 px-2"
              required={true}
            />
          </div>

          <div className="flex md:flex-col lg:flex-row sm:flex-col xs:flex-col">
            <div className="flex flex-col gap-[0.3rem]">
              <label htmlFor="phone">Mobile No.*</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="p-[0.2rem] border-[0.1rem] [box-shadow:0rem_0.1rem_.1rem_0rem_gray] border-black w-[22rem] py-3 px-2 xs:w-[90%]"
                minLength={10}
                maxLength={13}
                required={true}
              />
            </div>
            <div className="flex flex-col gap-[0.3rem] ml-[11rem] w-[4rem] md:ml-0 md:mt-3 sm:ml-0 sm:mt-3 xs:ml-0 xs:mt-3 lg:ml-[11rem] lg:relative lg:bottom-3">
              <label htmlFor="age">Age.*</label>
              <input
                type="number"
                name="age"
                id="age"
                className="p-[0.2rem] border-[0.1rem] [box-shadow:0rem_0.1rem_.1rem_0rem_gray] border-black py-3 px-2 w-[6rem]"
                required={true}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[0.3rem] mb-[2rem] space-y-3">
            <label htmlFor="gender">Gender*</label>
            <div className="flex gap-[3rem] xs:flex-col">
              <div className="flex gap-[0.5rem]">
                <input type="radio" name="gender" id="male" className="w-[2rem]"/>
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex gap-[0.5rem]">
                <input type="radio" name="gender" id="female" className="w-[2rem]"/>
                <label htmlFor="female">Female</label>
              </div>
              <div className="flex gap-[0.5rem]">
                <input type="radio" name="gender" id="other" className="w-[2rem]"/>
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>

            <div className="flex mb-[2.5rem] sm:flex-col xs:flex-col sm:space-x-0 xs:space-x-0 lg:flex-row lg:space-x-[7rem]">
              <div className="flex gap-[0.5rem] space-x-[3rem] md:space-x-[2rem] xs:space-x-[1rem]">
                <h1>diabetes</h1>
                <div className="select"><FormSelectedButton first="Yes" second="No"/></div>
              </div>
              <div className="flex gap-[0.5rem] space-x-[3rem] sm:mt-[5rem] xs:mt-[5rem] xs:space-x-[1rem] mt-[-3rem] lg:mt-0">
                <h1>BP</h1>
                <div className="select"><FormSelectedButton first="Yes" second="No"/></div>
              </div>
            </div>

          <div className="flex items-center justify-center">
            <button type="submit" className="text-[1.2rem] font-bold py-[0.5rem] px-[3rem] bg-[aqua] font-sans tracking-tighter" aria-required><Link href={"/doctor/appointment/payment"}><h1>Submit</h1></Link></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocForm;
