"use client";

import Link from "next/link";
import { getAllDoctor } from "@/app/GlobalRedux/slice/AuthSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ReviewComponent from "@/components/HomePage/ratings/page";
const AppointmentSubmitted = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [doctor, setDoctor] = useState(null);

  const getDoctorData = async () => {
    try {
      const response = await dispatch(getAllDoctor());
      const doctors = response?.payload?.data;
      const foundDoctor = doctors?.find((doctor) => doctor._id === params.id);
      setDoctor(foundDoctor);
    } catch (error) {
      toast.error("Doctor data fetch Error: ", error);
    }
  };
  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <>
      <div>
        <div className="2xl:w-[70rem] xl:w-[70rem] lg:w-[58rem] mx-auto flex my-[2rem] rounded-xl flex-row-reverse justify-between p-[2rem] shadow-md md:w-[40rem] sm:w-[30rem] xs:w-[20rem] xs:flex-col">
          <div className="flex items-center flex-col space-y-2">
            <div className="w-[8rem] h-[8rem] rounded-full relative flex items-center justify-center">
          <div className={`${doctor?.status === false ? "" : 'border-[#0A8E8A] border-4 rounded-full w-[8rem] h-[8rem] flex text-center justify-center p-[0.2rem] mx-auto'}`}>
              {doctor?.avatar && (
                <Image
                  src={doctor?.avatar?.secure_url}
                  alt="Profile"
                  className="w-28 h-26 rounded-full"
                  width={100}
                  height={100}
                  priority
                />
              )}
              <div
                className={`absolute w-[1rem] right-3 animate-ping rounded-full bottom-3 h-[1rem]`}
                style={{
                  backgroundColor: `${doctor?.status === false ? "" : "#54FC05"}`,
                }}
              ></div>
            </div>
          </div>
            <h1 className="font-bold text-center text-[#61b1ae] text-[1.7rem]">
              {doctor?.fullName}
            </h1>
              <h1 className="text-[rgba(0,0,0,0.99)] font-bold">{doctor?.email}</h1>
          </div>
          <div className="mx-[2.5rem] xs:mx-[0.8rem] xs:my-[1rem]">
            <div className="space-y-10">
              <h1 className="font-semibold">Specialist: {doctor?.specialist}</h1>
              <div className="flex gap-[0.5rem]">Ratings: <ReviewComponent /></div>
              <h1>Address: {doctor?.address}</h1>
            </div>
            <div className="mt-[3.8rem] grid grid-cols-2 gap-2">
            <a className="list-none text-gray-600">Emergency Fee1: <span className="text-teal-700">{doctor?.fees && doctor?.fees?.emergencyFee1 + "rs"}</span></a>
                <a className="list-none text-gray-600">Emergency Fee2: <span className="text-teal-700">{doctor?.fees && doctor?.fees?.emergencyFee2 + "rs"}</span></a>
                <a className="list-none text-gray-600">First Visit Fees: <span className="text-teal-700">{doctor?.fees && doctor?.fees?.firstVisitFee + "rs"}</span></a>
                <a className="list-none text-gray-600">Second Visit Fee: <span className="text-teal-700">{doctor?.fees && doctor?.fees?.secondVisitFee + "rs"}</span></a>
                <a className="list-none text-gray-600">Visit Under 7 Days Fees: <span className="text-teal-700">{doctor?.fees && doctor?.fees?.visitUnder7DaysFee + "rs"}</span></a>
              </div>
          </div>
        </div>
      </div>
      <img
        width="68"
        height="68"
        src="https://img.icons8.com/color/48/ok--v1.png"
        alt="ok--v1"
        className="mx-auto mt-[2rem]"
      />
      <form className="flex items-center justify-center flex-col h-[26vh] font-bold gap-[2rem]">
        <div>
          <h1 className="text-[1.3rem] text-center">
            Your Appointment Has Successfully <br /> Booked
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="text-[1.2rem] font-bold py-[0.5rem] px-[3rem] bg-[#0A8E8A] font-sans tracking-tighter"
            aria-required
          >
            <Link href={"/"}>
              <h1>Back To Home</h1>
            </Link>
          </button>
        </div>
      </form>
    </>
  );
};

export default AppointmentSubmitted;
