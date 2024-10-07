"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { getAllDoctors } from "@/app/GlobalRedux/slice/DoctorSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import ReviewComponent from "./ratings/page";
import { AppDispatch } from "@/app/GlobalRedux/store";
import AOS from "aos";

interface DoctorData {
  _id: string;
  fullName: string;
  avatar?: { secure_url: string };
  specialist: string;
  address: string;
  pincode: string;
  fees?: { firstVisitFee: number };
  status?: boolean;
}

interface ProfileDataProps {
  searchTerm: string;
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

const ProfileData: React.FC<ProfileDataProps> = ({ searchTerm }) => {
  const [data, setData] = useState<DoctorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await dispatch(getAllDoctors({}));
      const doctorsData = response?.payload?.data as DoctorData[];

      if (doctorsData) {
        setData(doctorsData);
      }
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(); // Initial fetch

    // const intervalId = setInterval(fetchDoctors, 20000); // Poll every 30 seconds for more frequent updates

    // return () => clearInterval(intervalId);
  }, []);

  const filteredData = data?.filter((doctor) => {
    const specialistMatch = doctor.specialist?.toLowerCase().includes(searchTerm) ?? false;
    const addressMatch = doctor.address?.toLowerCase().includes(searchTerm) ?? false;
    const fullNameMatch = doctor.fullName?.toLowerCase().includes(searchTerm) ?? false;

    return specialistMatch || addressMatch || fullNameMatch;
  }
  );

  const displayedData = filteredData.slice(0, 2);


  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);

  const handleError = (error: any) => {
    console.error('Fetch error:', error);
  };

  return (
    <div className="flex items-center justify-center relative">
      <div className="grid grid-cols-1 gap-[0.8rem] xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 justify-center mx-[1rem] sm:mx-[2rem] md:mx-[1rem] xs:my-0 my-[3rem] lg:w-full xs:w-[78%] xl:mx-2 2xl:mx-[1rem] lg:mx-3 lg:grid-cols-2">
        {isLoading
          ? Array(2).fill(0).map((_, index) => <ShimmerUI key={index} />)
          : displayedData.map((userData) => (
            <div className='shadow-md p-[1rem]'>
            <div
              className="flex justify-end rounded-md w-[100%] xs:flex-col-reverse sm:flex-row-reverse sm:gap-[1.5rem] lg:gap-[2rem] text-[0.9rem] relative"
              key={userData._id}
              data-aos="fade-right"
            >
              <div className="flex flex-col gap-[1.1rem] xs:mx-auto xs:mb-3 text-[1.1rem] xs:mt-2">
                <h1 className="text-[rgb(17_164_160_/_99%)] text-[1.5rem] active:text-[rgba(17,164,159,0.82)] active:text-[1.4rem] font-bold md:text-left xs:ml-0 xs:text-center">
                  <Link href={`/doctor/${userData._id}`}>
                    {userData.fullName}
                  </Link>
                </h1>
                <h1 className="font-bold text-[1.1rem] xs:text-center">
                  Specialist:{" "}
                  <span className="text-[blue]">{userData.specialist}</span>
                </h1>
                <ul className="list-none xs:text-center sm:text-left">
                  <a className="list-none">
                    <span className='font-semibold'>Fees:</span>{" "}
                    <span className="text-teal-700">
                      {userData?.fees && userData?.fees?.firstVisitFee + "rs"}
                    </span>
                  </a>
                </ul>
                <p className='xs:text-center'><span className='font-semibold'>Address:</span> {userData.address.trim()}, {userData.pincode}</p>
                
                {/* <p><span className='font-semibold'>Pincode:</span> </p> */}
                
              </div>
              <div className="flex flex-col items-center w-[40%] xs:items-center xs:ml-0 relative gap-[1rem] xs:w-[100%] sm:w-auto lg:w-[40%]">
                
                <div className="rounded-full relative xs:items-center xs:ml-0">
                  <div className={`${userData?.status === false ? "" : "border-4 rounded-full w-[8rem] border-[#0A8E8A] flex text-center justify-center p-[0.2rem] mx-auto"}`}>
                    {userData?.avatar && (
                      <Image
                        src={userData?.avatar?.secure_url}
                        alt={"Doctor Avatar"}
                        width={100}
                        height={100}
                        className="rounded-full w-[7rem] h-[7rem] object-cover"
                        onError={handleError} // Handle any loading errors
                      />
                    )}
                  </div>
                  <div
                    className={`absolute right-4 w-[0.8rem] animate-ping rounded-full bottom-3 h-[0.8rem]`}
                    style={{
                      backgroundColor: `${userData?.status === false ? "" : "#54FC05"
                        }`,
                    }}
                  ></div>
                </div>
                <div className="flex gap-[0.5rem] text-[1.1rem] items-center md:flex-col xl:flex-row">
                  <span className='font-semibold'>Ratings:</span> <ReviewComponent />
                </div>
              </div>
            </div>
                <button className="bg-[#0A8E8A] w-[90%] ml-3 mt-4 hover:bg-[#0A8E8A] p-[0.4rem] text-white rounded-md xl:text-[0.8rem] xs:w-[100%] sm:w-[99%] sm:ml-1 lg:w-[95%] 2xl:text-[1rem] lg:text-[0.8rem] xs:items-center xs:ml-0">
                  <Link href={`/appointment/${userData._id}`}>
                    Book Appointment
                  </Link>
                </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileData;