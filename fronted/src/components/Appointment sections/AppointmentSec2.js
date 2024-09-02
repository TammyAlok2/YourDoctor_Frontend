"use client";

import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Image from "next/image";
import AppointmentSec3 from "./AppointmentSec3";
import { useDispatch } from "react-redux";
import { allScheduleByDate } from "@/app/GlobalRedux/slice/AuthSlice";
import { useParams } from "next/navigation";
import {toast,Toaster} from 'react-hot-toast'

const generateNextWeekDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      day: date.toDateString(), // Display full date string
      date: date.toISOString().split("T")[0], // Store as YYYY-MM-DD
      slot: Math.floor(Math.random() * 10) + 1, // Random slot numbers for now
      isToday: i === 0, // Mark today for special styling
    });
  }
  return dates;
};

const AppointmentSec2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected date index
  const dispatch = useDispatch();
  const [slot,setSlot] = useState([])
  const [message,setMessage] = useState('')
  const [timeSchedulingData, setTimeSchedulingData] = useState(generateNextWeekDates());
  const params = useParams();
console.log('slot',slot)
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? timeSchedulingData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === timeSchedulingData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getVisibleItems = () => {
    const visibleItems = [];
    for (let i = 0; i < 3; i++) {
      visibleItems.push(
        timeSchedulingData[(currentIndex + i) % timeSchedulingData.length]
      );
    }
    return visibleItems;
  };

  const fetchSchedules = async (date) => {
    try {
      const schedule = await dispatch(allScheduleByDate([params.id, date]));
      
      if(schedule?.payload?.success){
        const response = schedule?.payload?.data;
        
        toast.success(schedule?.payload?.message)
        setSlot(response)
      }
      
      setMessage(schedule?.payload?.message)
      
      // You can handle the fetched schedule data as needed here
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    AOS.init({
    
      once: false,
      mirror: false,
    });
  }, []);


  const handleDateClick = (index, date) => {
    setSelectedIndex(index);
    fetchSchedules(date);
  };

  return (
    <div className="w-[75%] mx-auto">
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-between space-x-2">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full h-[3rem] w-[3rem]"
          onClick={prevSlide}
        >
          <Image
            width="34"
            height="34"
            src="https://img.icons8.com/metro/26/back.png"
            alt="back"
          />
        </button>
        <div className="flex space-x-4 overflow-hidden w-full justify-center">
          {getVisibleItems().map((item, index) => (
            <div
              key={index}
              className={`flex flex-col space-x-[0.5rem] w-1/3 p-4 bg-white items-center justify-center flex-shrink-0 rounded-lg cursor-pointer shadow-lg transition-all duration-200 ${
                selectedIndex === index ? "bg-green-500 text-white border-b-4 border-green-700" : ""
              } ${
                item.isToday && selectedIndex !== index
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              
              onClick={() => handleDateClick(index, item.date)}
            >
              <h2 className="text-xl font-bold mb-2">{item.day}</h2>
              <p className="text-lg">{item.slot} slots</p>
            </div>
          ))}
        </div>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full h-[3rem] w-[3rem]"
          onClick={nextSlide}
        >
          <Image
            width="34"
            height="34"
            src="https://img.icons8.com/metro/26/back.png"
            alt="back"
            className="rotate-[180deg]"
          />
        </button>
      </div>
      <Toaster/> {
       !slot ? (<h1>{!message ? (<h1>No Schedule </h1>):(<h1>{message}</h1>)}</h1>): (<AppointmentSec3 allSlot = {slot} />)
     }
    
    </div>
  );
};

export default AppointmentSec2;
