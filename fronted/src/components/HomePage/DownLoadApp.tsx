'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";

export default function DownloadApp() {
  const [isHelloVisible, setIsHelloVisible] = useState(true);
  const [openSelect, setOpenSelect] = useState(false);

  // Switch between "Hello" and "Hi"
  useEffect(() => {
    const interval = setInterval(() => {
      setIsHelloVisible((prev) => !prev); // Toggle text
    }, 2000); // Adjust the interval as needed
    return () => clearInterval(interval);
  }, []);

  const handleOpenDownloadSelect = () =>{
    setOpenSelect(prev=>!prev)
  }

  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <div className="flex items-center h-[5rem] absolute right-0">
      <div className="fixed right-4 top-[8rem] z-10 flex items-center">
      {!openSelect && <h1 className="border-[0.1rem] border-black rounded-md px-2 py-1 border-r-transparent mr-[-0.1rem] relative hover:bg-teal-100 cursor-pointer font-bold bg-white" data-aos='fade-out' onClick={handleOpenDownloadSelect}>Download App</h1>}
      {openSelect && <ul className="font-bold">
        <li className="border-[0.1rem] border-black hover:bg-teal-200 rounded-md px-2 py-1 border-r-transparent bg-white -mr-1 relative cursor-pointer mb-1" data-aos='fade-bottom'>Patient App</li>
        <li className="border-[0.1rem] border-black rounded-md px-2 py-1 border-r-transparent -mr-1 relative bg-white  hover:bg-[rgb(255_0_0_/_63%)] cursor-pointer" data-aos='fade-top '>Doctor App</li>
      </ul>}
      <div className="relative bg-white w-[3rem] h-[5rem] rounded-lg border-[0.1rem] border-black flex items-center justify-center cursor-pointer" onClick={handleOpenDownloadSelect}>
        {/* Mobile Outer Layer */}
        <div className="absolute w-[90%] h-[85%] bg-white border-[0.1rem] overflow-hidden border-black rounded-md flex flex-col items-center justify-center">
          {/* Inner text animation */}
          <div className="overflow-hidden relative w-full h-full">
            <div
              className={`absolute top-0 left-0 w-full h-full flex justify-center items-center transition-all duration-700 ${isHelloVisible ? "translate-x-0" : "-translate-x-full"
                }`}
            >
              {/* "Hello" text */}
              <span className="text-2xl font-bold text-blue-600 flex flex-col items-center"><Image className="w-[2rem]" width={50} height={50} src="/icons8-down.gif" alt="map-gif"/><Image className="w-[1.5rem]" width={50} height={50} src="/favicon.ico" alt="map-gif"/></span>
            </div>
            <div
              className={`absolute left-full bg-teal-100 w-full h-full flex justify-center items-center transition-all duration-700 ${isHelloVisible ? "translate-x-0" : "-translate-x-full"
                }`}
            >
              {/* "Hi" text */}
              <span className="text-2xl font-bold text-red-600" data-aos='fade-up'><Image width={150} height={150} src={"/YOURLab_Logo.png"} alt="map-gif"/></span>
            </div>
          </div>
        </div>
          <div className="w-[0.4rem] h-[0.4rem] border-[0.1rem] border-black rounded-full absolute bottom-[0rem]"></div>
      </div>
      </div>
    </div>
  );
}
