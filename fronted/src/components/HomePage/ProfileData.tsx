"use client";

import Link from "next/link";
import { getAllDoctors } from "@/app/GlobalRedux/slice/DoctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import ReviewComponent from "./ratings/page";
import { AppDispatch } from "@/app/GlobalRedux/store";

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

const ProfileData: React.FC<ProfileDataProps> = ({searchTerm}) => {
  const [data, setData] = useState<DoctorData[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const getAllDoctor = async () => {
    try {
      // Step 1: Try to get doctor data from localStorage
      const storedDoctors = localStorage.getItem('doctors');
      
      if (storedDoctors) {
        const parsedDoctors = JSON.parse(storedDoctors);
        setData(parsedDoctors); // Use the locally stored data
      } else {
        // Step 2: If no data in localStorage, fetch it using the dispatcher
        const response = await dispatch(getAllDoctors({}));
        const doctorsData = response?.payload?.data as DoctorData[];
  
        if (doctorsData) {
          // Step 3: Store the fetched data in localStorage for future use
          localStorage.setItem('doctors', JSON.stringify(doctorsData));
          setData(doctorsData.slice(0, 3)); // Use the fetched data
        }
      }
    } catch (error) {
      console.error('Error fetching doctor data:', error);
      return error;
    }
  };
  

  useEffect(() => {
    getAllDoctor();
  }, []);

  const filteredData = data.filter((doctor) =>
    doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Limit the displayed data to 3 cards
  const displayedData = filteredData.slice(0, 3);
  return (
    <div className="flex items-center justify-center relative">
      <div className="grid grid-cols-1 gap-[2rem] xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center mx-[1rem] sm:mx-[2rem] md:mx-[3rem] my-[3rem]">
        {displayedData?.map((userData) => (
          <div
            className="flex flex-col sm:flex-row gap-[2rem] p-[1rem] shadow-md rounded-md"
            key={userData._id}
          >
            <div className="flex flex-col gap-[1rem] w-[16rem]">
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
                    {userData?.fees && userData?.fees?.firstVisitFee + "rs"}
                  </span>
                </a>
              </ul>
            </div>
            <div className="ml-auto flex flex-col items-end sm:items-start relative gap-[0.8rem] w-[45%] xs:w-[100%] sm:w-auto">
              <div className="w-[6rem] h-[6rem] rounded-full overflow-hidden items-end ml-auto relative">
              {/* className={`${doctor?.status === false ? "" : 'border-[#0A8E8A] border-4 rounded-full w-[8.8rem] h-[8.8rem] flex text-center justify-center p-[0.2rem] mx-auto'}` */}
                <div className={`${userData?.status === false ? "" : "border-4 rounded-full w-22 h-22 border-[#0A8E8A] flex text-center justify-center p-[0.2rem] mx-auto"}`}>
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

export default ProfileData;
