'use client';
import {FC} from 'react';

import Image from "next/image";
import { FaAward } from "react-icons/fa6";

interface LabCardData {
  achieve: string;
  time: string;
  date: string;
  address: string;
}

const labCardData: LabCardData[] = [
  {
    achieve: "ISO and NABL certified",
    time: "Mon-Sat 9am to 7pm",
    date: "Sun: 10am to 6pm",
    address: "Sirmour chowk near tansen complex, Hospital Road, Rewa, 486001",
  },
  {
    achieve: "ISO and NABL certified",
    time: "Mon-Sat 9am to 7pm",
    date: "Sun: 10am to 6pm",
    address: "Sirmour chowk near tansen complex, Hospital Road, Rewa, 486001",
  },
  {
    achieve: "ISO and NABL certified",
    time: "Mon-Sat 9am to 7pm",
    date: "Sun: 10am to 6pm",
    address: "Sirmour chowk near tansen complex, Hospital Road, Rewa, 486001",
  },
  {
    achieve: "ISO and NABL certified",
    time: "Mon-Sat 9am to 7pm",
    date: "Sun: 10am to 6pm",
    address: "Sirmour chowk near tansen complex, Hospital Road, Rewa, 486001",
  }
];

const LabTestCards:FC = () => {
  return (
    <>
     <div className="flex items-center justify-center relative">
        <div className="grid grid-cols-1 gap-[0.8rem] xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 justify-center mx-[1rem] sm:mx-[2rem] md:mx-[3rem] xs:mb-9 my-[3rem] lg:w-full xs:w-[78%] xl:mx-2 2xl:mx-[1rem] lg:mx-2 lg:grid-cols-3">
          {labCardData?.map((data, index) => (
            <div
              className="flex flex-col bg-white border rounded-lg shadow-md lg:w-[100%] xs:w-[19rem] xs:mx-auto xl:w-[19rem] 2xl:w-[23rem]"
              key={index}
            >
              <div className="bg-teal-600 text-white text-center py-2 rounded-t-lg">
                <h2 className="font-bold text-md">Thyrocare</h2>
              </div>
              <div className="p-2 xs:p-5 flex gap-3 xs:flex-col">
                <div className="w-[13rem]">
                  <div className="text-center mb-4 space-y-2">
                    <p className="text-[0.8rem] flex text-left ">
                      <FaAward className="text-[rgb(255_135_0_/_87%)] rounded-sm bg-[rgba(255,179,93,0.16)] p-1 [filter:drop-shadow(.1rem_.2rem_.1rem_gray)] text-[1.5rem] mr-1" />{" "}
                      {data.achieve}
                    </p>
                    <p className="text-[0.8rem] flex items-center">
                      <Image
                        src={
                          "https://tse2.mm.bing.net/th?id=OIP.fLWpg4oYllvUxXniLMvNsQHaHa&pid=Api&P=0&h=220"
                        }
                        alt="time icon"
                        width={21}
                        height={21}
                        className="mr-1"
                      />{" "}
                      Timing: {data.time}
                    </p>
                    <p className="text-[0.8rem]">{data.date}</p>
                  </div>
                  <div className="flex items-center text-[0.8rem]">
                    <span className="inline-block mr-1">
                      <Image
                        src="https://img.icons8.com/ios/50/marker.png" // Use an appropriate icon for location
                        alt="Location Icon"
                        width={21}
                        height={21}
                        className="w-[3.2rem] -ml-[0.1rem]"
                      />
                    </span>
                    {data.address}
                  </div>
                </div>

                <div className="ml-auto xs:ml-0 xs:items-center flex flex-col items-end lg:w-[9rem]">
                  <div className="flex justify-center mb-2">
                    <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-2xl overflow-hidden border-[#0A8E8A] border-[0.1rem]">
                      <Image
                        src={
                          "https://bookmerilab.com/offers/images/thyrocare-logo.png"
                        } // You can replace this with the actual image
                        alt="Lab Logo"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button className="bg-teal-600 hover:bg-teal-500 text-white py-2 px-6 rounded-full text-sm xl:px-4 2xl:px-6">
                      Select Lab
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LabTestCards;
