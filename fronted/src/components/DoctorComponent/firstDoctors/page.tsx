'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllDoctors } from "@/app/GlobalRedux/slice/DoctorSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import ReviewComponent from "@/components/HomePage/ratings/page";
import { useParams } from "next/navigation";
import { AppDispatch } from "@/app/GlobalRedux/store";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

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
  const [isHovered, setIsHovered] = useState<number | null | string>(null);
  const [isCardHovered, setIsCardHovered] = useState<number | null | string>(null);

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

  const handleError = (error: any) => {
    console.error('Fetch error:', error);
  };

  return (
    <div className="flex items-center justify-center relative">
      <div className="grid grid-cols-1 gap-[1rem] xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center mx-[1rem] sm:mx-[2rem] md:mx-[1rem] xs:my-0 my-[3rem] lg:w-full xs:w-[78%] xl:mx-2 2xl:mx-[1rem] lg:mx-3 lg:grid-cols-2">
        {isLoading
          ? Array(3).fill(0).map((_, index) => <ShimmerUI key={index} />)
          : filteredData.map((userData) => (
            // <FollowerPointerCard
            //   title={
            //     <TitleComponent
            //       title={userData?.fullName}
            //     // avatar={userData?.avatar?.secure_url}
            //     />
            //   }
            // >
              <div className='shadow-md pb-[0.5rem] rounded-lg relative z-1' onMouseEnter={() => setIsCardHovered(userData._id)}
                onMouseLeave={() => setIsCardHovered(null)}>
                <div
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isCardHovered === userData._id ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                </div>
                <div
                  className="flex justify-end rounded-md w-[100%] xs:flex-col-reverse sm:flex-row-reverse sm:gap-[1.5rem] text-[0.9rem] relative"
                  key={userData._id}
                  data-aos="fade-right"
                >
                  <div className="flex flex-col gap-[1.1rem] xs:mx-auto xs:mb-3 text-[1.1rem] xs:mt-2">
                    <h1 className="text-[rgb(17_164_160_/_99%)] text-[1.2rem] active:text-[rgba(17,164,159,0.82)] active:text-[1.1rem] font-bold md:text-left xs:ml-0 xs:text-center cursor-pointer">
                      <Link href={`/doctor/${userData._id}`} className=' cursor-pointer'>
                        {userData.fullName}
                      </Link>
                    </h1>
                    <h1 className="font-bold text-[0.9rem] bg-teal-50 px-[0.5rem] py-[0.2rem] rounded-md w-[80%] xs:text-center">
                      {/* Specialist:{" "} */}
                      <span className="text-[#006effa8]">{userData.specialist}</span>
                    </h1>
                    <ul className="list-none xs:text-center sm:text-left">
                      <a className="list-none text-[0.96rem] flex items-center gap-2">
                        <span className='font-semibold'><Image width="30" height="30" src="https://img.icons8.com/external-sbts2018-solid-sbts2018/58/0A8E8A/external-payment-black-friday-5-sbts2018-solid-sbts2018.png" alt="external-payment-black-friday-5-sbts2018-solid-sbts2018" /></span>{" "}
                        <span className="text-teal-700 font-bold">
                          {userData?.fees && userData?.fees?.firstVisitFee + "rs"}
                        </span>
                      </a>
                    </ul>
                    <p className='xs:text-center text-[0.96rem] flex items-center gap-2 font-semibold text-gray-700'><span className='font-semibold'><Image width="30" height="30" src="https://img.icons8.com/sf-black-filled/50/0A8E8A/address.png" alt="address" /></span> {userData?.address?.trim()}, {userData.pincode}</p>

                  </div>
                  <div className="flex flex-col items-center justify-evenly w-[40%] xs:items-center xs:ml-0 relative gap-[1rem] xs:w-[100%] sm:w-auto lg:w-[40%]">

                    <div className="rounded-full relative xs:items-center xs:ml-0">
                      <div className={`${userData?.status === false ? "border-[0.1rem] border-gray-600 rounded-full" : "border-4 rounded-full w-[8rem] border-[#0A8E8A] flex text-center justify-center p-[0.2rem] mx-auto"}`}>
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
                      <span className='font-semibold'></span> <ReviewComponent />
                    </div>
                  </div>
                </div>
                <Link href={`/appointment/${userData._id}`} className='cursor-pointer'>
                  <button className="bg-white mx-auto mt-4 p-[0.3rem] hover:text-white text-black rounded-md xl:text-[0.8rem] xs:w-[100%] sm:w-[99%] sm:ml-1 lg:w-[90%] lg:mx-auto lg:ml-[1.5rem] relative 2xl:text-[1rem] lg:text-[0.8rem] xl:active:text-[0.9rem] font-semibold xs:items-center xs:ml-0 lg:py-[0.5rem] cursor-pointer overflow-hidden border-[#0A8E8A] group border" onMouseEnter={() => setIsHovered(userData._id)}
                    onMouseLeave={() => setIsHovered(null)}>
                    <span className="absolute bottom-0 left-0 h-full w-full rounded-sm bg-[#0a8e8abd] transform -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                    {isHovered === userData._id ? (
                      <span className="relative z-10">Book Appointment</span>
                    ) : (
                      <Image
                        height="60"
                        width="60"
                        src="https://img.icons8.com/ios/50/0A8E8A/right--v1.png" // replace with the path to your image
                        alt="Hover Image"
                        className="h-[1.5rem] w-[2.9rem] mx-auto"
                      />
                    )}
                  </button>
                </Link>
              </div>
            // </FollowerPointerCard>
          ))}
      </div>
    </div>
  );
};

const TitleComponent = ({
  title,
  // avatar,
}: {
  title: any;
  // avatar: string;
}) => (
  <div className="flex space-x-2 items-center">
    <p>{title}</p>
  </div>
);

export default FirstDoctorsSection;
