"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
// import Link from "next/link";
// import AutoTypingAndDeletingText from "./AutoTypingText";
import '../../../src/app/globals.css'
// import { FlipWords } from "../ui/flip-words";
// import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { CiSearch } from "react-icons/ci";
interface HomeCard {
  setSearchTerm: any;
}

const testimonials = [
  {
    img:"https://wallpapercave.com/wp/wp2968489.jpg",
    name: "Comprehensive Health Support",
    title: "Offering extensive medical care, this service covers everything from preventive health measures to chronic disease management. Patients receive continuous, personalized attention to help them maintain overall wellness and address a variety of health concerns.",
  },
  {
    img:"https://wallpaperaccess.com/full/1189426.jpg",
    name: "Emergency Care Specialist",
    title: "Providing fast and effective treatment in critical situations, this service is designed to stabilize and manage urgent medical conditions. Patients can count on rapid response and expert care during emergencies, ensuring timely intervention when it's needed most.",
  },
  {
    img:"https://tse1.mm.bing.net/th?id=OIF.%2bdxTgR96kOyk1V8uipltYg&pid=Api&P=0&h=220",
    name: "Chronic Care Support Expert",
    title: "This service focuses on providing ongoing support for managing chronic conditions such as diabetes, hypertension, and asthma. With tailored care plans and continuous monitoring, patients are empowered to live healthier lives while effectively managing their conditions.",
  },
  {
    img:"https://wallpaperaccess.com/full/677511.jpg",
    name: "Preventive Health Advocate",
    title: "Dedicated to promoting health and preventing illness, this service offers routine check-ups, screenings, and personalized wellness plans. The focus is on early detection and proactive measures to help patients stay healthy and reduce the risk of future medical issues.",
  },
  {
    img:"https://tse1.mm.bing.net/th?id=OIP.hITPmpTKXkGwqBfqDJt-QgHaE7&pid=Api&P=0&h=220",
    name: "Rehabilitation and Recovery",
    title: "Offering specialized rehabilitation services, this support system helps patients recover from surgeries, injuries, or long-term illnesses. Through personalized recovery plans and therapy, patients regain strength, mobility, and overall well-being.",
  },
];

const textArray = [
  "Welcome to YourLab!",
  "Your health, your way.",
  "Empowering better healthcare.",
  "Discover personalized care.",
  "Your journey to wellness begins here."
];

const cardData = [
  {
    cardImage:
      "https://dg0qqklufr26k.cloudfront.net/wp-content/uploads/2024/06/cosmetologist-consult_homepage-banner-desktop.webp",
  },
  {
    cardImage:
      "https://dg0qqklufr26k.cloudfront.net/wp-content/uploads/2024/09/main-banner-mobile.webp",
  },
  {
    cardImage:
      "https://dg0qqklufr26k.cloudfront.net/wp-content/uploads/2024/09/desktop-vitamin-banner-1.webp",
  },
];

const HomeCard: React.FC<HomeCard> = ({ setSearchTerm }) => {
  const [current, setCurrent] = useState(0);
  const length = cardData.length;

  const [inputVal, setInputVal] = useState("");
  //state for search suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [doctorData, setDoctorData] = useState<string[] | null>(null)

  useEffect(() => {
    const doctorData: any = typeof window !== 'undefined' ? localStorage.getItem("doctors") : null;
    const parseDoctorData = doctorData ? JSON.parse(doctorData) : []
    setDoctorData(parseDoctorData)
  }, [])

  useEffect(() => {
    const doctorName: any = doctorData?.map((doctor: any) => {
      const name = doctor?.fullName.toLowerCase()
      return name
    })
    const putSuggestions = doctorName;
    // console.log(putSuggestions)
    setSuggestions(putSuggestions);
  }, [doctorData])

  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 2000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);

  const handleChange = (e: any) => {
    setInputVal(e.target.value);
    setSearchTerm(e.target.value);

    // condition for search suggestions 

    if (e.target.value.length > 0) {
      const allSuggestions = doctorData?.map((doctor: any) => doctor.fullName.trim().toLowerCase()) || [];
      const filteredSuggestions = allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }

  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputVal(suggestion);
    setSearchTerm(suggestion);  // Set the selected suggestion as the search term
    setShowSuggestions(false);  // Hide the suggestions
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 4000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [current]);

  if (!Array.isArray(cardData) || cardData.length <= 0) {
    return null;
  }

  // Scroll the page to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top:550,
      behavior: 'smooth',
    });
  };

  return (
    <div className="mx-auto mt-[7.1rem]">
      <>
      <div className={`p-[2rem] relative overflow-hidden z-[-1] w-[73%] mx-auto h-[50vh] flex items-center justify-center flex-row-reverse gap-5`}>
        {/* <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normal"
      /> */}
        {cardData.map((cardItem, index) => (
          <>
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <Image
                  src={cardItem.cardImage}
                  alt="cardImage"
                  // width={500}
                  // height={500}
                  className="xs:h-[11rem] sm:h-full w-[80%] h-full absolute object-fit top-0 left-0 block contrast-75 rounded-2xl"
                  fill
                  objectFit="cover" // ensures the image covers the full area without distortion
                  priority={true} // loads image with high priority
                  quality={100} // improves image quality (value from 0 to 100)
                  data-aos="fade-left"
                // priority
                />
              )}
            </div>

          </>
        ))}
        <div className="flex items-center justify-center font-semibold text-[2.3rem]"></div>
        <div className={`flex gap-[0.5rem] xs:flex-col sm:flex-col md:flex-col lg:pr-2 mb-[-1rem] w-[40%] ${(showSuggestions && suggestions.length > 0) && 'relative top-[-5rem]'}`}>

          </div>

        </div>
        <div className="w-[40%] mx-auto mb-4 -mt-7 z-10">
        <div className={`relative h-[3rem] bg-white rounded-full shadow-lg`}>
          {/* // ${showSuggestions && suggestions.length > 0 && 'absolute top-[-16rem]'} */}

          <input
            className={`w-[100%] h-full rounded-full relative py-[1.3rem] px-[1.3rem] outline-0 text-[1rem] active:bg-[#f3f1f1] bg-[rgb(255,255,255)]`}
            placeholder={"Search doctors by name"}
            value={inputVal}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}  // small delay to allow click on suggestions
          />
          <div className='absolute right-0 top-0 h-full w-[3.2rem] rounded-full bg-teal-300 hover:bg-teal-600 flex items-center justify-center'>
          {/* <Image
            className="right-[0.5rem] top-[0.6rem] invert-[0.2] cursor-pointer"
            width={30}
            height={30}
            src={"/search_icon.png"}
            alt="search-icon"
          /> */}
          <CiSearch className="right-[0.5rem] top-[0.6rem] invert-[0.2] cursor-pointer text-[1.5rem]"/>
          </div>
      </div>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="scrollbar-custom relative left-0 right-0 bg-white shadow-lg rounded-lg py-3 max-h-[14rem] overflow-y-auto z-50" onClick={scrollToTop}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 z-10 hover:bg-gray-100 cursor-pointer`}
                  onClick={() => {
                    setInputVal(suggestion);
                    setShowSuggestions(true);
                    handleSuggestionClick(suggestion)
                  }}

                // onChange={handleChange}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
          </>
    </div>
  );
};

export default HomeCard;
