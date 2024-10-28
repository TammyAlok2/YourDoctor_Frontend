"use client";

import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Image from "next/image";
import AppointmentSec3 from "./AppointmentSec3";
import { useDispatch } from "react-redux";
import { allScheduleByDate } from "@/app/GlobalRedux/slice/AuthSlice";
import { useParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { AppDispatch } from "@/app/GlobalRedux/store";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

type Slot = {
  _id: string;
  startTime: string;
  endTime: string;
  availableSlot: number;
};

type Schedule = {
  slots: Slot[];
  date: string;
  doctorId: string;
};

type TimeSchedulingData = {
  day: string;
  date: string;
  slot: number;
  isToday: boolean;
};

// Generate dates for the next 7 days
const generateNextWeekDates = ():TimeSchedulingData[] => {
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Track selected date index
  const [slot, setSlot] = useState<Schedule | null>(null);
  
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loader state
  const [timeSchedulingData, setTimeSchedulingData] = useState<TimeSchedulingData[]>(
    generateNextWeekDates()
  );
  const dispatch = useDispatch<AppDispatch>();
  const params: Params = useParams();

  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? timeSchedulingData.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === timeSchedulingData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Get the visible items (3 dates) based on the current index
  const getVisibleItems = (): TimeSchedulingData[] => {
    const visibleItems: TimeSchedulingData[] = [];
    for (let i = 0; i < 3; i++) {
      visibleItems.push(
        timeSchedulingData[(currentIndex + i) % timeSchedulingData.length]
      );
    }
    return visibleItems;
  };

  // Fetch schedules based on the selected date
  const fetchSchedules = async (date: string) => {
    try {
      setLoading(true); // Start loader
      const schedule = await dispatch(allScheduleByDate([params.id, date]));

      if (schedule?.payload?.success) {
        const response = schedule?.payload?.data as Schedule;
        toast.success(schedule?.payload?.message);
        if(!response){
          setMessage(schedule?.payload?.message || "No schedules available.");
        }
        setSlot(response);
   
      } else {
        setSlot(null);
        setMessage(schedule?.payload?.message || "No schedules available.");
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      setMessage("Failed to fetch schedules.");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  // Fetch schedules when the selectedIndex changes
  useEffect(() => {
    if (selectedIndex !== null) {
      const selectedDate = timeSchedulingData[selectedIndex].date;
      fetchSchedules(selectedDate);
    }
  }, [selectedIndex]);

  // Handle date click to fetch schedules for the selected date
  const handleDateClick = (index:number) => {
    setSelectedIndex((currentIndex + index) % timeSchedulingData.length);
  };

  return (
    <div className="2xl:w-[1185px] shadow-lg mx-auto py-[1rem] my-[3rem]">
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-between space-x-2">
        <button
          className="text-gray-800 font-bold py-1 px-2 rounded-full xs:w-[3rem] xs:h-[3rem] h-[4rem] w-[4rem]"
          onClick={prevSlide}
          data-aos="fade-right"
        >
          <Image
            width="36"
            height="36"
            src="https://img.icons8.com/metro/26/back.png"
            alt="back"
          />
        </button>
        <div className="flex space-x-4 xs:space-x-1 overflow-hidden w-full justify-center xs:items-center"
                data-aos="fade-up">
          {getVisibleItems().map((item, index) => {
            const globalIndex =
              (currentIndex + index) % timeSchedulingData.length;
            return (
              <div
                key={index}
                className={`flex flex-col space-x-[0.5rem] w-1/3 p-4 xs:p-0 items-center justify-center flex-shrink-0 cursor-pointer  ${
                  selectedIndex === globalIndex
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white border-b-4 border-green-700 rounded-lg"
                    : ""
                } ${
                  item.isToday && selectedIndex !== index
                    ? "text-black"
                    : "hover:border-b-[0.3rem] hover:border-black"
                } ${!index && "border-b-[0.3rem] border-[#0A8E8A]"}`}
                onClick={() => handleDateClick(index)}
              >
                <h2 className="text-xl xs:ml-[0.5rem] xs:text-[0.9rem] font-bold mb-2">{item.day}</h2>
              
              </div>
            )
          })}
        </div>
        <button
          className="text-gray-800 font-bold py-1 px-2 rounded-full xs:w-[3rem]
xs:h-[3rem] h-[4rem] w-[4rem]"
          onClick={nextSlide}
          data-aos="fade-left"
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
      <Toaster />
      {loading ? (
        <div className="text-center mt-4">Loading...</div> // Loader
      ) : slot ? (
        <AppointmentSec3 allSlot={slot} />
      ) : (
        <h1 className="text-center mt-4 text-xl">{message}</h1>
      )}
    </div>
  );
};

export default AppointmentSec2;
