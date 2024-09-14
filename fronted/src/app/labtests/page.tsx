"use client";

import LabBackgroundImage from "@/components/LabTestComponents/LabBackgroundImage";
import LabTestCards from "@/components/LabTestComponents/LabTestCards";
import LabTestsCards from "@/components/LabTestComponents/LabTestsCards";
import Image from "next/image";
import React from "react";

const LabTests: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center p-4">
        <div className="relative w-full max-w-md xs:w-[60%] sm:w-[60%] md:w-[60%] lg:w-[58%]">
          <input
            type="text"
            placeholder="Search..."
            className="mb-4 py-2 pl-4 pr-8 border rounded-full w-full"
            // value={searchTerm}
            // onChange={handleSearch}
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
      <div className="py-5 mb-5">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-8 justify-center">
            <LabTestCards />
          </div>
        </div>
      </div>
      <div>
        <LabBackgroundImage />
        <div className="py-10">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-8 justify-center">
              <LabTestsCards />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabTests;
