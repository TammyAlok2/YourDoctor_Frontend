'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllDoctors } from "@/app/GlobalRedux/slice/DoctorSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import ReviewComponent from "@/components/HomePage/ratings/page";
import { useParams } from "next/navigation";
import { AppDispatch } from "@/app/GlobalRedux/store";

interface Doctor {
  _id: string;
  specialist?: string;
  address?: string;
  fullName?: string;
  pincode?: string;
  fees?: { firstVisitFee?: number };
  avatar?: { secure_url: string };
  status?: boolean;
  title?: string;
  description?: string;
}

interface FirstDoctorsSectionProps {
  setData: (data: Doctor[]) => void;
  filteredData: Doctor[];
}

const ShimmerUI: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col sm:flex-row gap-[2rem] p-[1rem] shadow-md rounded-md">
      <div className="flex flex-col gap-[1rem] w-[16rem]">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
      <div className="ml-auto flex flex-col items-end sm:items-start relative gap-[0.8rem] w-[45%] xs:w-[100%] sm:w-auto">
        <div className="w-[6rem] h-[6rem] bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

const FirstDoctorsSection: React.FC<FirstDoctorsSectionProps> = ({
  setData,
  filteredData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await dispatch(getAllDoctors({}));
      const doctorsData = response?.payload?.data;
      setData(doctorsData);
      setDoctorData(doctorsData);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDoctors();

    const intervalId = setInterval(() => {
      fetchDoctors();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center relative xs:mb-[2rem]">
      <div className="grid grid-cols-1 gap-[0.8rem] xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 justify-center mx-[1rem] sm:mx-[2rem] md:mx-[3rem] xs:my-0 my-[3rem] lg:w-full xs:w-[78%] xl:mx-2 2xl:mx-[1rem] lg:mx-3 lg:grid-cols-3">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => <ShimmerUI key={index} />)
          : filteredData.map((userData) => (
              <div
                className="flex flex-col sm:flex-row p-[1rem] shadow-md rounded-md w-[100%] xs:w-[18rem] xs:mx-auto text-[0.9rem]"
                key={userData._id}
                data-aos="fade-right"
              >
                <div className="flex flex-col gap-[1rem] w-[12rem] xs:mx-auto xs:mb-3">
                  <h1 className="font-bold">
                    Specialist:{" "}
                    <span className="text-[blue]">{userData.specialist}</span>
                  </h1>
                  <div className="flex gap-[0.5rem]">
                    Ratings: <ReviewComponent />
                  </div>
                  <p>Address: {userData.address}</p>
                  <p>Pincode: {userData.pincode}</p>
                  <ul className="text-gray-600 list-none">
                    <a className="list-none text-gray-600">
                      Fees:{" "}
                      <span className="text-teal-700">
                        {userData?.fees?.firstVisitFee}rs
                      </span>
                    </a>
                  </ul>
                </div>
                <div className="ml-auto flex flex-col items-end xs:items-center xs:ml-0 sm:items-end relative gap-[1rem] xs:w-[100%] sm:w-auto lg:w-[11rem]">
                  <div className="w-[6rem] h-[6rem] rounded-full overflow-hidden items-end ml-auto relative xs:items-center xs:ml-0">
                    <div
                      className={`${
                        userData?.status === false
                          ? ""
                          : "border-4 rounded-full w-22 h-22 border-[#0A8E8A] flex text-center justify-center p-[0.2rem] mx-auto"
                      }`}
                    >
                      {userData?.avatar && (
                        <Image
                          src={userData.avatar.secure_url}
                          alt="Doctor Avatar"
                          width={100}
                          height={100}
                          className="rounded-full object-cover"
                        />
                      )}
                    </div>
                    <div
                      className={`absolute right-2 w-[0.8rem] animate-ping rounded-full bottom-3 h-[0.8rem]`}
                      style={{
                        backgroundColor: userData?.status
                          ? "#54FC05"
                          : "transparent",
                      }}
                    ></div>
                  </div>
                  <h1 className="text-[rgb(17_164_160_/_99%)] active:text-[rgba(17,164,159,0.82)] active:text-[0.8rem] font-bold items-end ml-auto 2xl:text-[1rem] text-right xs:text-center sm:text-right xs:ml-0">
                    <Link href={`/doctor/${userData._id}`}>
                      {userData.fullName}
                    </Link>
                  </h1>
                  <button className="bg-[#0A8E8A] hover:bg-[#0A8E8A] p-[0.3rem] text-white rounded-md ml-auto items-end xl:text-[0.8rem] 2xl:text-[1rem] lg:text-[0.8rem] xs:items-center md:items-end md:ml-auto xs:ml-0">
                    <Link href={`/appointment/${userData._id}`}>
                      Book Appointment
                    </Link>
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default FirstDoctorsSection;
