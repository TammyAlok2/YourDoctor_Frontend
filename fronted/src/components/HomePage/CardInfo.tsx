"use client";

import { FaAward } from "react-icons/fa6";
import { FaFileMedicalAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import AOS from "aos";
import { useEffect } from "react";

const CardInfo = () => {
  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);
  return (
    <div className="my-[3rem] lg:mx-auto lg:w-[50rem] lg:my-[2rem] xs:w-[20rem] xs:mx-auto md:mx-auto md:my-0 sm:my-0">
      <div className="flex xs:mx-10 xs:justify-center sm:justify-center md:justify-center xs:flex-col xs:mb-[1rem] lg:gap-3 xl:gap-16 2xl:gap-16">
        <div className="flex gap-[1rem] items-center md:justify-center xs:mb-[1rem] sm:mr-[1rem] sm:ml-[1rem]">
          <div className="bg-[rgba(241,239,219,0.7)] rounded-2xl p-[1.3rem]">
            <FaAward className="text-[rgb(255_135_0_/_87%)] [filter:drop-shadow(.1rem_.2rem_.1rem_gray)] text-[2rem]" />
          </div>
          <div data-aos="fade-right">
            <p className="text-gray-800">In house labs</p>
            <h1 className="font-bold">NABL certified</h1>
          </div>
        </div>
        <div className="flex gap-[1rem] items-center xs:mb-[1rem] sm:mr-[1rem]">
          <div className="bg-[rgba(241,239,219,0.7)] rounded-2xl p-[1.3rem]">
            <FaFileMedicalAlt className="text-[rgb(255_135_0_/_87%)] [filter:drop-shadow(.1rem_.2rem_.1rem_gray)] text-[2rem]" />
          </div>
          <div data-aos="fade-bottom">
            <p className="text-gray-800">60 mins collections</p>
            <h1 className="font-bold">6AM - 10PM</h1>
          </div>
        </div>
        <div className="flex gap-[1rem] items-center xs:mb-[1rem] sm:mr-[1rem]">
          <div className="bg-[rgba(241,239,219,0.7)] rounded-2xl p-[1.3rem]">
            <FaClock className="text-[rgb(255,136,0)] [filter:drop-shadow(.1rem_.2rem_.1rem_gray)] text-[2rem]" />
          </div>
          <div data-aos="fade-right">
            <p className="text-gray-800">Reports In</p>
            <h1 className="font-bold">6 hours</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
