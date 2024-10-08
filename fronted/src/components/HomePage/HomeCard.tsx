"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Link from "next/link";

interface HomeCard {
  setSearchTerm: any;
}

const cardData = [
  {
    cardImage:
      "https://static.vecteezy.com/system/resources/thumbnails/008/137/038/small/female-doctor-in-medical-clothes-with-a-stethoscope-in-her-hands-on-a-medical-blue-background-side-view-healthcare-banner-copy-space-photo.jpeg",
  },
  {
    cardImage:
      "https://previews.123rf.com/images/kritchanut/kritchanut1608/kritchanut160800094/63246026-doctor-hand-touching-empty-virtual-screen-modern-medical-banner-background-concept.jpg",
  },
  {
    cardImage:
      "https://unihealthparanaque.com/static/image/services/servicecenter/othermedical_dep.jpg",
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
      duration: 1000, // values from 0 to 3000, with step 50ms
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

  return (
    <div className="mt-[1.5rem] xs:mt-8" data-aos="fade-in">
      <div className="rounded-2xl w-[64.4%] p-[2rem] relative overflow-hidden mx-auto border-teal-500 border-[0.1rem] bg-gradient-to-br from-[#00ffffc2] to-[#dadde2ca] z-[1]">
        {cardData.map((cardItem, index) => (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <Image
                src={cardItem.cardImage}
                alt="cardImage"
                width={100}
                height={100}
                className="xs:h-[11rem] sm:h-full w-full h-full absolute -z-10 object-fit top-0 left-0 block"
                // layout="responsive"
                // quality={100}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                data-aos="fade-left"
                priority
              />
            )}
          </div>
        ))}
        <div className="flex items-center justify-center font-semibold text-[2.3rem] mt-[3rem] xs:mb-[7rem] sm:mb-[5rem] md:mb-[7rem] xl:mb-[15rem] lg:mb-[7rem]"></div>
        <div className="flex items-center justify-center gap-[5rem] xs:flex-col sm:flex-col md:flex-row lg:justify-between lg:pr-2 xl:justify-between xl:gap-[8rem] mb-[-1rem]">
          <div className={`relative h-[3.4rem] bg-white rounded-lg xs:mt-2 shadow-lg ${showSuggestions && suggestions.length > 0 && 'absolute top-[-16rem]'}`}>
            
              <input
                className={`w-full h-full rounded-lg relative py-[1.4rem] px-[1rem] outline-0 sm:w-[11rem] text-[1.3rem] xs:w-[12rem] lg:w-[39rem] active:bg-[#f3f1f1]`}
                placeholder={"Search here"}
                value={inputVal}
                onChange={handleChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}  // small delay to allow click on suggestions
              />
              <Image
                className="absolute right-[0.5rem] top-[0.6rem] invert-[0.2] cursor-pointer"
                width={30}
                height={30}
                src={"https://img.icons8.com/ios-glyphs/50/search--v1.png"}
                alt="search-icon"
              />

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white shadow-lg rounded-lg py-2 max-h-[10rem] overflow-y-auto z-50">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 z-10 hover:bg-gray-100 cursor-pointer"
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
          <div className="flex gap-[3rem] items-center justify-center ml-[-4rem]" data-aos="fade-left">
            <button className="xs:text-[0.8rem] xs:w-[6rem] text-[1.2rem] font-semibold text-white bg-[#FD7456] hover:bg-[rgb(243_98_66)] hover:shadow-[0rem_0rem_1rem_0rem_rgb(243_98_66)] py-[0.75rem] px-[1rem] rounded-xl [box-shadow:0_0_0.4rem_0_gray] sm:w-[9rem] active:text-[0.8rem] cursor-pointer">
              <Link href={"/labtests"}>Lab Tests</Link>
            </button>
            <button className="text-[1.2rem] font-semibold text-white bg-[#0A8E8A] hover:bg-[rgb(10_129_126)] hover:shadow-[0rem_0rem_1rem_0rem_rgb(10_129_126)] py-[0.75rem] px-[1rem] rounded-xl [box-shadow:0_0_0.4rem_0_gray] sm:w-[9rem] active:text-[0.8rem]">
              <Link href={"/doctors"}>Doctors</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
