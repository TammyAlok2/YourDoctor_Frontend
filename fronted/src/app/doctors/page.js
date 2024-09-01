"use client";

import React, { useEffect, useState } from "react";
import FirstDoctorsSection from "./firstdoctors/page";
import SecondDoctorsSection from "./secondoctors/page";
import ThirdDoctorsSection from "./thirdoctors/page";

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = data?.filter(
    (box) =>
      box?.specialist?.toLowerCase().includes(searchTerm) ||
      box?.address?.toLowerCase().includes(searchTerm) ||
      box?.fullName?.toLowerCase().includes(searchTerm)
  );

  const filteredSecondData = data1?.filter(
    (box) =>{
      const doctorPincode = String(box?.pincode).toLowerCase();
      return(
      box?.title?.toLowerCase().includes(searchTerm) ||
      box?.description?.toLowerCase().includes(searchTerm) ||
      doctorPincode === searchTerm
      )
    }
  )

  const filteredThirdData = data2?.filter(
    (box) =>{
      const doctorPincode = String(box?.pincode).toLowerCase();
      return(
        box?.specialist?.toLowerCase().includes(searchTerm) ||
        box?.address?.toLowerCase().includes(searchTerm) ||
        box?.fullName?.toLowerCase().includes(searchTerm) ||
        doctorPincode === searchTerm
      )
    }
  )

  // const filteredWithPincode = data2.filter((doctor) => {
  //   return doctorPincode === searchTerm.toLowerCase();
  // });

  return (
    <>
      <div className="flex flex-col items-center p-4 rounded-full">
        <input
          type="text"
          placeholder="Search..."
          className="mb-4 py-2 px-4 border rounded-full w-full max-w-md"
          value={searchTerm}
          onChange={handleSearch}
        />
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
