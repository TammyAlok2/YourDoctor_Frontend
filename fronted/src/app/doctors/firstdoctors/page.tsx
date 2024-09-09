"use client";

import Link from "next/link";
import { getAllDoctors } from "@/app/GlobalRedux/slice/DoctorSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import ReviewComponent from "@/components/HomePage/ratings/page";
import { useParams } from "next/navigation";
import { AppDispatch } from "@/app/GlobalRedux/store";

// Define the shape of the doctor data
interface Doctor {
  _id: string;
  specialist: string;
  address: string;
  pincode: string;
  fees?: { firstVisitFee?: number };
  avatar?: { secure_url: string };
  status?: boolean;
  fullName: string;
}

interface FirstDoctorsSectionProps {
  setData: (data: Doctor[]) => void;
  filteredData: Doctor[];
}

const FirstDoctorsSection: React.FC<FirstDoctorsSectionProps> = ({ setData, filteredData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);

  const isBrowser = typeof window !== "undefined"; // Check if the code is running in the browser

  const getAllDoctor = async () => {
    try {
      // Step 1: Try to get doctor data from localStorage (only if on the client-side)
      if (isBrowser) {
        const storedDoctors = localStorage.getItem('doctors');

        if (storedDoctors) {
          const parsedDoctors: Doctor[] = JSON.parse(storedDoctors);
          setData(parsedDoctors.slice(0, 3)); // Use the locally stored data
          return;
        }
      }

      // Step 2: If no data in localStorage, fetch it using the dispatcher
      const response = await dispatch(getAllDoctors({}));
      const doctorsData = response?.payload?.data;
      setData(doctorsData);

      if (filteredData && isBrowser) {
        // Step 3: Store the fetched data in localStorage for future use
        localStorage.setItem('doctors', JSON.stringify(filteredData));
        setData(filteredData.slice(0, 3)); // Use the fetched data
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      return error;
    }
  };

  // Polling function to fetch updated doctor status
  const pollDoctorStatus = async () => {
    try {
      const response = await dispatch(getAllDoctors({}));
      const updatedDoctorsData = response?.payload?.data;
      if (updatedDoctorsData) {
        // Update the state with the latest doctor data
        setDoctorData(updatedDoctorsData.slice(0, 3));

        // Update local storage with the new data (only on client-side)
        if (isBrowser) {
          localStorage.setItem("doctors", JSON.stringify(updatedDoctorsData));
        }
      }
    } catch (error) {
      console.error("Error polling doctor status:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    getAllDoctor();

    // Poll every 30 seconds
    const intervalId = setInterval(() => {
      pollDoctorStatus();
    }, 30000); // 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center relative">
      <div className="grid grid-cols-1 gap-[2rem] xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center mx-[1rem] sm:mx-[2rem] md:mx-[3rem] my-[3rem]">
        {filteredData?.map((userData) => (
          <div
            className="flex flex-col sm:flex-row gap-[2rem] p-[1rem] shadow-md rounded-md"
            key={userData._id}
          >
            <div className="flex flex-col gap-[1rem] w-[16rem]">
              <h1 className="font-bold">
                Specialist:{" "}
                <span className="text-[blue]">{userData.specialist}</span>
              </h1>
              <p className="flex gap-[0.5rem]">
                Ratings: <ReviewComponent />
              </p>
              <p>Address: {userData.address}</p>
              <p>Pincode: {userData.pincode}</p>
              <ul className="text-gray-600 list-none">
                <a className="list-none text-gray-600">
                  Fees:{" "}
                  <span className="text-teal-700">
                    {userData?.fees && userData?.fees?.firstVisitFee + "rs"}
                  </span>
                </a>
              </ul>
            </div>
            <div className="ml-auto flex flex-col items-end sm:items-start relative gap-[0.8rem] w-[45%] xs:w-[100%] sm:w-auto">
              <div className="w-[6rem] h-[6rem] rounded-full overflow-hidden items-end ml-auto relative">
                <div
                  className={`${
                    userData?.status === false
                      ? ""
                      : "border-4 rounded-full w-22 h-22 border-[#0A8E8A] flex text-center justify-center p-[0.2rem] mx-auto"
                  }`}
                >
                  {userData?.avatar && (
                    <Image
                      src={userData?.avatar?.secure_url}
                      alt={"Doctor Avatar"}
                      width={100}
                      height={100}
                      className="rounded-full object-cover"
                    />
                  )}
                </div>
                <div
                  className={`absolute right-2 w-[0.8rem] animate-ping rounded-full bottom-3 h-[0.8rem]`}
                  style={{
                    backgroundColor: `${
                      userData?.status === false ? "" : "#54FC05"
                    }`,
                  }}
                ></div>
              </div>
              <h1 className="text-[rgb(17_164_160_/_99%)] font-bold items-end ml-auto">
                {userData.fullName}
              </h1>
              <button className="bg-[rgb(17_164_160_/_99%)] hover:bg-[rgba(17,164,159,0.89)] p-[0.3rem] text-white rounded-md">
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
