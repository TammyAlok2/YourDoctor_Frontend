"use client";

import React, { useEffect, useState } from "react";
import FirstDoctorsSection from "./firstdoctors/page";
import SecondDoctorsSection from "./secondoctors/page";
import ThirdDoctorsSection from "./thirdoctors/page";
import Image from "next/image";

interface DoctorData {
  specialist?: string;
  address?: string;
  fullName?: string;
  pincode?: number | string;
  title?: string;
  description?: string;
}

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


const Doctors:React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<DoctorData[]>([]);
  const [data1, setData1] = useState<DoctorData[]>([]);
  const [data2, setData2] = useState<DoctorData[]>([]);

  const handleSearch = (event:any) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = data?.filter(
    (box) =>
      box?.specialist?.toLowerCase().includes(searchTerm) ||
      box?.address?.toLowerCase().includes(searchTerm) ||
      box?.fullName?.toLowerCase().includes(searchTerm)
  );

  const filteredSecondData = data1?.filter((box) => {
    const doctorPincode = String(box?.pincode).toLowerCase();
    return (
      box?.title?.toLowerCase().includes(searchTerm) ||
      box?.description?.toLowerCase().includes(searchTerm) ||
      doctorPincode === searchTerm
    );
  });

  const filteredThirdData = data2?.filter((box) => {
    const doctorPincode = String(box?.pincode).toLowerCase();
    return (
      box?.specialist?.toLowerCase().includes(searchTerm) ||
      box?.address?.toLowerCase().includes(searchTerm) ||
      box?.fullName?.toLowerCase().includes(searchTerm) ||
      doctorPincode === searchTerm
    );
  });

  // const filteredWithPincode = data2.filter((doctor) => {
  //   return doctorPincode === searchTerm.toLowerCase();
  // });

  return (
    <>
      <div className="flex flex-col items-center p-4">
        <div className="relative w-full max-w-md xs:w-[60%] sm:w-[60%] md:w-[60%] lg:w-[58%]">
          <input
            type="text"
            placeholder="Search..."
            className="mb-4 py-2 pl-4 pr-8 border rounded-full w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="bg-white absolute top-[0.6rem] right-3 cursor-pointer">
            <Image
              className="invert-[0.2]"
              width={20}
              height={20}
              src={"https://img.icons8.com/ios-glyphs/50/search--v1.png"}
              alt="search-icon"
            />
          </div>
        </div>
      </div>
      <div>
        <FirstDoctorsSection setData={setData} filteredData={filteredData} />
        <SecondDoctorsSection
          setData1={setData1}
          filteredSecondData={filteredSecondData}
        />
        <ThirdDoctorsSection
          setData2={setData2}
          filteredThirdData={filteredThirdData}
        />
      </div>
    </>
  );
};

export default Doctors;
