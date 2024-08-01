'use client';

import { useEffect, useState } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';
import Image from "next/image";
import AppointmentSec3 from "./AppointmentSec3";

const TimeSchedulingData = [
  {
      day: "Today",
      slot: "6 slots left",
      borderBottom: '0.2rem solid rgb(20 86 45)'
  },
  {
      day: "Tomorrow",
      slot: "8 slots left"
  },
  {
      day: "26 July",
      slot: "19 slots left"
  },
  {
      day: "30 Jun",
      slot: "7 slots left"
  },
  {
      day: "25 August",
      slot: "12 slots left"
  },
  {
      day: "5 August",
      slot: "15 slots left"
  },
]

const AppointmentSec2 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? TimeSchedulingData.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === TimeSchedulingData.length - 1 ? 0 : prevIndex + 1));
  };

  const getVisibleItems = () => {
    const visibleItems = [];
    for (let i = 0; i < 3; i++) {
      visibleItems.push(TimeSchedulingData[(currentIndex + i) % TimeSchedulingData.length]);
    }
    return visibleItems;
  };

    useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 2000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <>
    <div className="relative w-full max-w-4xl mx-auto flex items-center justify-between space-x-2">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full h-[3rem] w-[3rem]"
        onClick={prevSlide}
      >
        <Image width="34" height="34" src="https://img.icons8.com/metro/26/back.png" alt="back"/>
      </button>
      <div className="flex space-x-4 overflow-hidden w-full justify-center">
        {getVisibleItems().map((item, index) => (
          <div key={index} className="flex flex-col space-x-[0.5rem] w-1/3 p-4 bg-white items-center justify-center" data-aos="fade-left" style={{borderBottom:item.borderBottom}}>
            <h2 className="text-xl font-bold mb-2">{item.day}</h2>
            <p className="text-green-500">{item.slot}</p>
          </div>
        ))}
      </div>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full h-[3rem] w-[3rem]"
        onClick={nextSlide}
      >
        <Image width="34" height="34" src="https://img.icons8.com/metro/26/back.png" alt="back" className="rotate-[180deg]"/>
      </button>
    </div>
    <AppointmentSec3 />
    </>
  )
}

export default AppointmentSec2
