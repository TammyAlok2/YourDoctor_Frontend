"use client";

import React, { useEffect, useState } from "react";
import FirstDoctorsSection from "../../components/DoctorComponent/firstDoctors/page";
import SecondDoctorsSection from "../../components/DoctorComponent/secondDoctors/page";
import Image from "next/image";

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

const Doctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Doctor[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = data?.filter((doctor) => {
    const specialistMatch = doctor.specialist?.toLowerCase().includes(searchTerm) ?? false;
    const addressMatch = doctor.address?.toLowerCase().includes(searchTerm) ?? false;
    const fullNameMatch = doctor.fullName?.toLowerCase().includes(searchTerm) ?? false;
   
    return specialistMatch || addressMatch || fullNameMatch;
  });

  return (
    <>
      <div className="flex flex-col items-center p-4 mt-[6rem]">
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
              src="https://img.icons8.com/ios-glyphs/50/search--v1.png"
              alt="search-icon"
            />
          </div>
        </div>
      </div>
      <div>
        <SecondDoctorsSection />
        <FirstDoctorsSection setData={setData} filteredData={filteredData} />
      </div>
    </>
  );
};

export default Doctors;