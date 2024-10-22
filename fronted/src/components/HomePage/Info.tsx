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

const cardData = [
    {
        cardImage:
            "/medical-equipment.png",
    },
    {
        cardImage:
            "/Tips-for-Choosing-Medical-Equipment-For-Your-Practice.png",
    },
    {
        cardImage:
            "",
    },
];

const Info: React.FC = () => {
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
        AOS.init({
            // Global settings:
            duration: 2000, // values from 0 to 3000, with step 50ms
            once: false, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
        });
    }, []);

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
            top: 450,
            behavior: 'smooth',
        });
    };

    return (
        <div className="mx-auto mt-[2.1rem]">
            <>
                <div className={`p-[2rem] relative overflow-hidden z-[-1] w-[76%] mx-auto h-[40vh] flex items-center justify-center flex-row-reverse gap-5`}>
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
            </>
        </div>
    );
};

export default Info;
