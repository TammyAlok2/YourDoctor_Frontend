"use client";

import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Image from "next/image";
import AppointmentSec3 from "./AppointmentSec3";
import { useDispatch, useSelector } from "react-redux";
import { allScheduleByDate } from "@/app/GlobalRedux/slice/AuthSlice";
import { useParams } from "next/navigation";

const TimeSchedulingData = [
  {
    day: "Today",
    slot: 9,
    borderBottom: "0.2rem solid rgb(20 86 45)",
  },
  {
    day: "Tomorrow",
    slot: 7,
  },
  {
    day: "26 July",
    slot: 8,
  },
  {
    day: "30 Jun",
    slot: 4,
  },
  {
    day: "25 August",
    slot: 4,
  },
  {
    day: "5 August",
    slot: 5,
  },
];

const AppointmentSec2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const [timeSchedulingData, setTimeSchedulingData] = useState([]);
  const params = useParams();
  // const res = useSelector((state)=>state.auth.schedule)
  // console.log(res)

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? TimeSchedulingData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === TimeSchedulingData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getVisibleItems = () => {
    const visibleItems = [];
    for (let i = 0; i < 3; i++) {
      visibleItems.push(
        TimeSchedulingData[(currentIndex + i) % TimeSchedulingData.length]
      );
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

  // Function to fetch schedule data
  // const fetchSchedules = async () => {
  //   try {
  //     const response = await dispatch(allScheduleByDate([params.id])); 
  //     console.log(response)// Replace with your API endpoint
  //     setTimeSchedulingData(response);
  //   } catch (error) {
  //     console.error("Error fetching schedules:", error);
  //   }
  // };

  // useEffect(()=>{
  //   fetchSchedules()
  // },[dispatch])

  // console.log(timeSchedulingData)

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const date = new Date().toISOString().split("T")[0]; // Format date as YYYY-MM-DD
        // console.log(date)
        const schedule = await dispatch(allScheduleByDate([params.id, date]));
        console.log(schedule)
        if (schedule) {
          setTimeSchedulingData([schedule]); // Assuming the API returns a single schedule
        } else {
          setTimeSchedulingData([]); // Handle case where no schedule is found
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, [params.id]);

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
              className={`flex flex-col space-x-[0.5rem] w-1/3 p-4 bg-white items-center justify-center flex-shrink-0 ${
                !index ? "border-b-4 border-black" : ""
              }`}
              data-aos="fade-left"
            >
              <h2 className="text-xl font-bold mb-2">{item.day}</h2>
              <p className="text-green-500">{item.slot}</p>
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
      <AppointmentSec3 />
    </div>
  );
};

export default AppointmentSec2;
