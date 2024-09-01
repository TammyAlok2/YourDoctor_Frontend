"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Link from "next/link";

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

const HomeCard = () => {
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
  };

  useEffect(() => {
    setTimeout(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 4000);
  }, [current]);

  if (!Array.isArray(cardData) || cardData.length <= 0) {
    return null;
  }

  return (
    <div className="mt-[3rem] xs:mt-8">
      <div className="rounded-2xl w-[80%] p-[5rem] relative overflow-hidden mx-auto">
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
        <div className="flex items-center justify-center font-semibold text-[2.3rem] my-[3rem]"></div>
        <div className="flex items-center justify-center gap-[5rem] xs:flex-col">
          <div className="relative h-[2.4rem] bg-white rounded-lg">
            <input
              type="text"
              className="w-full h-full rounded-lg relative py-[1rem] px-[1rem] outline-0 sm:w-[11rem] xs:w-[12rem] lg:w-[22rem]"
              placeholder={"Search here"}
              value={inputVal}
              onChange={handleChange}
            />
            <Image
              className="absolute right-[0.2rem] top-[0.6rem] invert-[0.2] cursor-pointer"
              width={20}
              height={20}
              src={"https://img.icons8.com/ios-glyphs/50/search--v1.png"}
              alt="search-icon"
            />
          </div>
          <div className="flex gap-[3rem] items-center justify-center">
            <button className="text-[0.9rem] font-semibold text-white bg-[rgb(247,86,61)] py-[0.6rem] px-[1rem] rounded-xl [box-shadow:0_0_0.4rem_0_gray] xs:w-[7rem] sm:w-[7rem]">
              Lab Tests
            </button>
            <button className="text-[0.9rem] font-semibold text-white bg-[rgb(17_164_160_/_99%)] hover:bg-[rgba(17,164,159,0.89)] py-[0.6rem] px-[1rem] rounded-xl [box-shadow:0_0_0.4rem_0_gray]">
              <Link href={"/doctors"}>Doctors</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
