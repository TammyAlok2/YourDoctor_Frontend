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
      "https://slidesbase.com/wp-content/uploads/2015/11/medical-doctor-hospital-nurse-healthcare-powerpoint-ppt-template-presentation-Slide1-1.jpg",
  },
  {
    cardImage:
      "https://tse2.mm.bing.net/th?id=OIP.ZsMcWqEMPmwWD0QKBCcwhAHaEK&pid=Api&P=0&h=220",
  },
  {
    cardImage:
      "https://kotadiasdental.com/wp-content/uploads/2017/02/doctor-team.jpg",
  },
];

const HomeCard: React.FC<HomeCard> = ({ setSearchTerm }) => {
  const [current, setCurrent] = useState(0);
  const length = cardData.length;

  const [inputVal, setInputVal] = useState("");

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
    <div className="mt-[3rem] xs:mt-8">
      <div className="rounded-2xl w-[74.4%] p-[2rem] relative overflow-hidden mx-auto border-teal-500 border-[0.1rem] xs:bg-gradient-to-br xs:from-[#00ffffc2] xs:to-[#dadde2ca] xs:z-[-1]">
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
                className="w-full h-full absolute -z-10 object-cover top-0 left-0 block"
                layout="responsive"
                quality={100}
                priority
                data-aos="fade-left"
              />
            )}
          </div>
        ))}
        <div className="flex items-center justify-center font-semibold text-[2.3rem] mt-[3rem] sm:mb-[5rem] md:mb-[7rem] xl:mb-[10rem] lg:mb-[7rem]"></div>
        <div className="flex items-center justify-center gap-[5rem] xs:flex-col">
          <div className="relative h-[2.4rem] bg-white rounded-lg xs:mt-2 shadow-lg">
            <input
              type="text"
              className="w-full h-full rounded-lg relative py-[1rem] px-[1rem] outline-0 sm:w-[11rem] xs:w-[12rem] lg:w-[22rem] active:bg-[#f3f1f1]"
              placeholder={"Search here"}
              value={inputVal}
              onChange={handleChange}
            />
            <Image
              className="absolute right-[0.5rem] top-[0.6rem] invert-[0.2] cursor-pointer"
              width={20}
              height={20}
              src={"https://img.icons8.com/ios-glyphs/50/search--v1.png"}
              alt="search-icon"
            />
          </div>
          <div className="flex gap-[3rem] items-center justify-center">
            <button className="text-[0.9rem] font-semibold text-white bg-[#FD7456] hover:bg-[#fd7556ce] py-[0.6rem] px-[1rem] rounded-xl [box-shadow:0_0_0.4rem_0_gray] xs:w-[7rem] sm:w-[7rem] active:text-[0.8rem]">
              <Link href={"/labtests"}>Lab Tests</Link>
            </button>
            <button className="text-[0.9rem] font-semibold text-white bg-[#0A8E8A] hover:bg-[#0a8e8ab8] py-[0.6rem] px-[1rem] rounded-xl [box-shadow:0_0_0.4rem_0_gray] active:text-[0.8rem]">
              <Link href={"/doctors"}>Doctors</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
