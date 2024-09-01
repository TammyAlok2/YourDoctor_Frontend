"use client";

import { getAllDoctor } from "@/app/GlobalRedux/slice/AuthSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const AppointmentSec1 = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [doctor, setDoctor] = useState(null);

  // console.log(params.id)
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
  // console.log(doctor)
  return (
    <div>
      <div className="2xl:w-[70rem] xl:w-[70rem] lg:w-[58rem] mx-auto flex mb-[3rem] mt-[4rem] flex-col px-[2rem] py-[1rem] shadow-lg rounded-xl md:w-[40rem] sm:w-[30rem] xs:w-[20rem]">
        <div className="flex items-center justify-center flex-col space-y-2">
          <div className="w-[6rem] h-[5.5rem] rounded-full flex items-center justify-center relative">
            {doctor?.avatar && (
              <Image
                src={doctor?.avatar?.secure_url}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4"
                width={100}
                height={100}
                priority
              />
            )}
            <div
              className={`absolute right-2 w-[0.7rem] animate-ping rounded-full bottom-3 h-[0.7rem]`}
              style={{
                backgroundColor: `${doctor?.status === false ? "" : "green"}`,
              }}
            ></div>
          </div>
          <h1 className="font-bold text-center text-[#61b1ae] text-[1.7rem]">
            {doctor?.fullName}
          </h1>
        </div>
        <div className="space-y-5 my-[2rem] mx-[2.5rem] xs:mx-[0.8rem]">
          <div className="space-y-3">
            <h1 className="font-semibold">Specialist: {doctor?.specialist}</h1>
            <h1 className="font-semibold">Address: {doctor?.address}</h1>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[0.9rem]">
            <a className="list-none text-gray-600">
              Emergency Fee1:{" "}
              <span className="text-teal-700">
                {doctor?.fees && doctor?.fees?.emergencyFee1 + "rs"}
              </span>
            </a>
            <a className="list-none text-gray-600">
              Emergency Fee2:{" "}
              <span className="text-teal-700">
                {doctor?.fees && doctor?.fees?.emergencyFee2 + "rs"}
              </span>
            </a>
            <a className="list-none text-gray-600">
              First Visit Fees:{" "}
              <span className="text-teal-700">
                {doctor?.fees && doctor?.fees?.firstVisitFee + "rs"}
              </span>
            </a>
            <a className="list-none text-gray-600">
              Second Visit Fee:{" "}
              <span className="text-teal-700">
                {doctor?.fees && doctor?.fees?.secondVisitFee + "rs"}
              </span>
            </a>
            <a className="list-none text-gray-600">
              Visit Under 7 Days Fees:{" "}
              <span className="text-teal-700">
                {doctor?.fees && doctor?.fees?.visitUnder7DaysFee + "rs"}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSec1;
