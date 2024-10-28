"use client";

import { getAllDoctor } from "@/app/GlobalRedux/slice/AuthSlice";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ReviewComponent from "@/components/HomePage/ratings/page";
import { AppDispatch } from "@/app/GlobalRedux/store";
import AOS from "aos";

interface Doctor {
  _id: string;
  avatar: {
    secure_url: string;
  };
  fullName: string;
  specialist: string;
  address: string;
  fees: {
    emergencyFee1: number;
    emergencyFee2: number;
    firstVisitFee: number;
    secondVisitFee: number;
    visitUnder7DaysFee: number;
  };
  status: boolean;
}

const ShimmerUI: React.FC = () => (
  <div className="animate-pulse">
    <div className="flex space-y-2 relative">
      <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
      <div className="h-8 bg-gray-300 rounded w-48"></div>
    </div>
    <div className="space-y-5 my-8 mx-10">
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-4 bg-gray-300 rounded w-full"></div>
        ))}
      </div>
    </div>
  </div>
);

const AppointmentSec1: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);

  const getDoctorData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getAllDoctor()) as any;
      const doctors = response?.payload?.data;

      if (doctors) {
        const foundDoctor = doctors.find((doc: Doctor) => doc._id === params.id);
        if (foundDoctor) {
          setDoctor(foundDoctor);
        } else {
          toast.error("Doctor not found");
        }
      }
    } catch (error: any) {
      toast.error(`Doctor data fetch Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctorData();

    // Set up polling for real-time updates
    const interval = setInterval(getDoctorData, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [params.id]);

  if (loading) {
    return (
      <div className="2xl:w-[70rem] xl:w-[70rem] lg:w-[58rem] mx-auto flex mb-[3rem] mt-[4rem] flex-row-reverse px-[2rem] py-[1rem] shadow-lg rounded-xl md:w-[40rem] sm:w-[30rem] xs:w-[20rem] justify-between relative">
        <ShimmerUI />
      </div>
    );
  }

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <div>
      <div className="2xl:w-[948px] xs:flex-col xl:w-[70rem] lg:w-[58rem] mx-auto flex mb-[3rem] mt-[8rem] flex-row-reverse px-[2rem] pt-[1rem] shadow-lg rounded-xl md:w-[40rem] sm:w-[30rem] xs:w-[20rem] justify-between relative" data-aos="fade-in">
        <div className="flex space-y-2 relative justify-center">
          <Link href={`/doctor/${params.id}`}>
            <div className={`${doctor.status === false ? "" : "border-4 rounded-full border-[#0A8E8A] w-[8.8rem] h-[8.8rem] flex text-center justify-center p-[0.2rem] mx-auto"}`}>
              <div className="w-[8rem] h-[8rem] rounded-full flex items-center relative mx-auto">
                {doctor.avatar && (
                  <Image
                    src={doctor.avatar.secure_url}
                    alt="Profile"
                    className="w-[20rem] h-[8rem] rounded-full"
                    width={100}
                    height={100}
                    priority
                  />
                )}
                <div
                  className={`absolute right-2 w-[1rem] animate-ping rounded-full bottom-3 h-[1rem]`}
                  style={{
                    backgroundColor: `${doctor.status === false ? "" : "#54FC05"}`,
                  }}
                ></div>
              </div>
            </div>
            <h1 className="font-bold text-center text-[#61b1ae] text-[1.7rem]">
              {doctor.fullName}
            </h1>
          </Link>
        </div>
        <Link href={"/"}>
            <Image
              width={25}
              height={25}
              src="https://img.icons8.com/ios-glyphs/30/arrow.png"
              alt="reply-arrow"
              className="absolute left-2 top-2 cursor-pointer hover:invert-[0.4] active:rotate-[-200deg] rotate-180"
            />
          </Link>
        <div className="space-y-5 my-[2rem] xs:mx-[0.8rem]">
          <div className="space-y-3">
            <h1 className="font-semibold">Specialist: {doctor.specialist}</h1>
            <div className="flex gap-[0.5rem] items-center">
              Ratings: <ReviewComponent />
            </div>
            <h1 className="font-semibold">Address: {doctor.address}</h1>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[0.9rem]">
            <a className="list-none text-gray-600">
              Emergency Fee1:{" "}
              <span className="text-teal-700">
                {doctor.fees && doctor.fees.emergencyFee1 + "rs"}
              </span>
            </a>
            <a className="list-none text-gray-600">
              Emergency Fee2:{" "}
              <span className="text-teal-700">
                {doctor.fees && doctor.fees.emergencyFee2 + "rs"}
              </span>
            </a>
            <a className="list-none text-gray-600">
              First Visit Fees:{" "}
              <span className="text-teal-700">
                {doctor.fees && doctor.fees.firstVisitFee + "rs"}
              </span>
            </a>
            <a className="list-none text-gray-600">
              Second Visit Fee:{" "}
              <span className="text-teal-700">
                {doctor.fees && doctor.fees.secondVisitFee + "rs"}
              </span>
            </a>
            <a className="list-none text-gray-600">
              Visit Under 7 Days Fees:{" "}
              <span className="text-teal-700">
                {doctor.fees && doctor.fees.visitUnder7DaysFee + "rs"}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSec1;