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

// Generate dates for the next 7 days
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
  const [slot, setSlot] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const [timeSchedulingData, setTimeSchedulingData] = useState(
    generateNextWeekDates()
  );
  const dispatch = useDispatch();
  const params = useParams();

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
  const getVisibleItems = () => {
    const visibleItems = [];
    for (let i = 0; i < 3; i++) {
      visibleItems.push(
        timeSchedulingData[(currentIndex + i) % timeSchedulingData.length]
      );
    }
    return visibleItems;
  };

  // Fetch schedules based on the selected date
  const fetchSchedules = async (date) => {
    try {
      setLoading(true); // Start loader
      const schedule = await dispatch(allScheduleByDate([params.id, date]));

      if (schedule?.payload?.success) {
        const response = schedule?.payload?.data;
        toast.success(schedule?.payload?.message);
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

  useEffect(() => {
    AOS.init({
      once: false,
      mirror: false,
    });
  }, []);

  // Handle date click to fetch schedules for the selected date
  const handleDateClick = (index) => {
    setSelectedIndex((currentIndex + index) % timeSchedulingData.length);
  };

  return (
    <div className="w-[75%] mx-auto">
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-between space-x-2">
        <button
          className="text-gray-800 font-bold py-1 px-2 rounded-full h-[4rem] w-[4rem]"
          onClick={prevSlide}
        >
          <Image
            width="36"
            height="36"
            src="https://img.icons8.com/metro/26/back.png"
            alt="back"
          />
        </button>
        <div className="flex space-x-4 overflow-hidden w-full justify-center">
          {getVisibleItems().map((item, index) => {
            const globalIndex =
              (currentIndex + index) % timeSchedulingData.length;
            return (
              <div
                key={index}
                className={`flex flex-col space-x-[0.5rem] w-1/3 p-4 items-center justify-center flex-shrink-0 cursor-pointer  ${
                  selectedIndex === globalIndex
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white border-b-4 border-green-700 rounded-lg"
                    : ""
                } ${
                  item.isToday && selectedIndex !== index
                    ? "text-black"
                    : "hover:border-b-[0.3rem] hover:border-black"
                } ${!index && "border-b-[0.3rem] border-teal-500"}`}
                onClick={() => handleDateClick(index)}
              >
                <h2 className="text-xl font-bold mb-2">{item.day}</h2>
                <p className="text-lg">{item.slot} slots</p>
              </div>
            )
          })}
        </div>
        <button
          className="text-gray-800 font-bold py-1 px-2 rounded-full h-[4rem] w-[4rem]"
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
      <Toaster />
      {loading ? (
        <div className="text-center mt-4">Loading...</div> // Loader
      ) : slot ? (
        <AppointmentSec3 allSlot={slot} />
      ) : (
        <h1 className="text-center mt-4">{message}</h1>
      )}
    </div>
  );
};

export default AppointmentSec2;
