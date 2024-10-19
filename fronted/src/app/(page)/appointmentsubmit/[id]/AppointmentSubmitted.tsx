"use client";

import Link from "next/link";
import { getAllDoctor } from "@/app/GlobalRedux/slice/AuthSlice";
import Image from "next/image";
import { useParams, useRouter ,useSearchParams} from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ReviewComponent from "@/components/HomePage/ratings/page";
import { AppDispatch } from "@/app/GlobalRedux/store";

// Shimmer Component
const Shimmer = () => (
<div className="2xl:w-[70rem] xl:w-[70rem] lg:w-[58rem] mx-auto flex my-[2rem] rounded-xl flex-row-reverse justify-between p-[1rem] shadow-md md:w-[40rem] sm:w-[30rem] xs:w-[20rem] xs:flex-col animate-pulse">
      <div className="flex items-center flex-col space-y-2">
        <div className="w-[8rem] h-[8rem] rounded-full bg-gray-300"></div>
        <div className="h-6 bg-gray-300 rounded w-48 mt-2"></div>
        <div className="h-4 bg-gray-300 rounded w-40"></div>
      </div>
      <div className="mx-[2.5rem] xs:mx-[0.8rem] xs:my-[1rem] flex-grow">
        <div className="space-y-10">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
        <div className="mt-[3.8rem] grid grid-cols-2 gap-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-4 bg-gray-300 rounded w-full"></div>
          ))}
        </div>
      </div>
    </div>
);

interface Doctor {
  _id: string;
  avatar: {
    secure_url: string;
  };
  status: boolean;
  fullName: string;
  email: string;
  specialist: string;
  address: string;
  fees: {
    emergencyFee1: number;
    emergencyFee2: number;
    firstVisitFee: number;
    secondVisitFee: number;
    visitUnder7DaysFee: number;
  };
}

const AppointmentSubmitted: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const appointmentId = searchParams.get('appointmentId');
  const doctorId = params.id

  const getDoctorData = async () => {
    try {
      setIsLoading(true);
      const response: any = await dispatch(getAllDoctor());
      const doctors: Doctor[] = response?.payload?.data;

      if (doctors) {
        const foundDoctor = doctors.find((doc) => doc._id === params.id);
        if (foundDoctor) {
          setDoctor(foundDoctor);
        } else {
          toast.error("Doctor not found");
        }
      } else {
        toast.error("Failed to fetch doctor data");
      }
    } catch (error: any) {
      console.error("Error fetching doctor data:", error);
      toast.error(`Doctor data fetch Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDoctorData();

    const intervalId = setInterval(() => {
      getDoctorData();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(intervalId);
  }, [params.id]);

  useEffect(() => {
    // Set a 5-second timer to redirect to another page
    const timer = setTimeout(() => {
      const queryString = new URLSearchParams({
        
        patientId: appointmentId,
        doctorId: doctorId
      }as any).toString();
      
      router.push(`/appointmentdetails?${queryString}`)
    
 // Redirect to a different page (replace with the target path)
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [router]);

  if (isLoading) {
    return (
      <div className="text-center mt-8">
        <Shimmer />
      </div>
    );
  }

  if (!doctor) {
    return <div className="text-center mt-8">Doctor not found</div>;
  }

  return (
    <>
      <div>
        <div className="2xl:w-[70rem] xl:w-[70rem] lg:w-[58rem] mx-auto flex my-[2rem] rounded-xl flex-row-reverse justify-between px-[1.5rem] py-[1rem] shadow-md md:w-[40rem] sm:w-[30rem] xs:w-[20rem] xs:flex-col mt-[6rem]">
          <div className="flex items-center flex-col space-y-2">
            <div className="w-[8rem] h-[8rem] rounded-full relative flex items-center justify-center">
              <div
                className={`${
                  doctor.status === false
                    ? ""
                    : "border-[#0A8E8A] border-4 rounded-full w-[8rem] h-[8rem] flex text-center justify-center p-[0.2rem] mx-auto"
                }`}
              >
                {doctor.avatar && (
                  <Image
                    src={doctor.avatar.secure_url}
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
                    backgroundColor: doctor.status ? "#54FC05" : "transparent",
                  }}
                ></div>
              </div>
            </div>
            <h1 className="font-bold text-center text-[#61b1ae] text-[1.7rem]">
              {doctor.fullName}
            </h1>
            <h1 className="text-[rgba(0,0,0,0.99)] font-bold">{doctor.email}</h1>
          </div>
          <div className="xs:mx-[0.8rem] xs:my-[1rem]">
            <div className="space-y-4">
              <h1 className="font-semibold">Specialist: {doctor.specialist}</h1>
              <div className="flex gap-[0.5rem]">
                Ratings: <ReviewComponent />
              </div>
              <h1>Address: {doctor.address}</h1>
            </div>
            <div className="mt-[2rem] grid grid-cols-2 gap-2">
              <a className="list-none text-gray-600">
                Emergency Fee1: <span className="text-teal-700">{doctor.fees.emergencyFee1}rs</span>
              </a>
              <a className="list-none text-gray-600">
                Emergency Fee2: <span className="text-teal-700">{doctor.fees.emergencyFee2}rs</span>
              </a>
              <a className="list-none text-gray-600">
                First Visit Fees: <span className="text-teal-700">{doctor.fees.firstVisitFee}rs</span>
              </a>
              <a className="list-none text-gray-600">
                Second Visit Fee: <span className="text-teal-700">{doctor.fees.secondVisitFee}rs</span>
              </a>
              <a className="list-none text-gray-600">
                Visit Under 7 Days Fees: <span className="text-teal-700">{doctor.fees.visitUnder7DaysFee}rs</span>
              </a>
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
