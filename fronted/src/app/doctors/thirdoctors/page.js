"use client";

import Link from "next/link";
import { getAllDoctors } from "@/app/GlobalRedux/slice/DoctorSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import ReviewComponent from "@/components/HomePage/ratings/page";
import { useParams } from "next/navigation";

const ThirdDoctorSection = ({ setData2, filteredThirdData }) => {
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();
  // const response = useSelector((state) => state?.doctor?.doctors);
  // console.log("doctor data : ", response);
  const params = useParams();

  const getAllDoctor = async () => {
    try {
      // Step 1: Check if doctor data is available in localStorage
      const storedDoctors = localStorage.getItem('doctors');
  
      if (storedDoctors) {
        const parsedDoctors = JSON.parse(storedDoctors);
        setData2(parsedDoctors.slice(3)); // Use data from localStorage starting from index 3
      } else {
        // Step 2: If no data is found in localStorage, dispatch to fetch it from the API
        const response = await dispatch(getAllDoctors());
        const doctorsData = response?.payload?.data;
  
        if (doctorsData) {
          // Step 3: Store the fetched data in localStorage
          localStorage.setItem('doctors', JSON.stringify(doctorsData));
          setData2(doctorsData.slice(3)); // Set data starting from index 3
        }
      }
    } catch (error) {
      console.error('Error fetching doctor data:', error);
      throw error; // Handle the error as needed
    }
  };
  
  useEffect(() => {
    getAllDoctor();
  }, []);

  // console.log("our data: ",filteredThirdData)

  return (
    <div className="flex items-center justify-center relative">
      <div className="grid grid-cols-1 gap-[2rem] xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center mx-[1rem] sm:mx-[2rem] md:mx-[3rem] my-[3rem]">
        {filteredThirdData?.map((userData) => (
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
            <div className="ml-auto flex flex-col items-end sm:items-start relative gap-[0.8rem] w-[45%] sm:w-auto">
              <div className="w-[6rem] h-[6rem] rounded-full bg-[rgb(206_206_206_/_71%)] overflow-hidden items-end ml-auto relative">
                <div className="border-4 rounded-full w-22 h-22 border-[#0A8E8A] flex text-center justify-center p-[0.2rem] mx-auto">
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

export default ThirdDoctorSection;
