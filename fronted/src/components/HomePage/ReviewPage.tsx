'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CardStack } from "../ui/card-stack";
import style from 'styled-jsx/style';

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

// Define a type for the card data structure
interface Card {
    id: number;
    name: string;
    designation: string;
    content: JSX.Element;
}

export const ReviewPage = ({
    className,
}: {
    className?: string;
}) => {

    const testimonials = [
        {
          img:"https://wallpapercave.com/wp/wp2968489.jpg",
          name: "Comprehensive Health Support",
          title: "Offering extensive medical care, this service covers everything from preventive health measures to chronic disease management.",
        },
        {
          img:"https://wallpaperaccess.com/full/1189426.jpg",
          name: "Emergency Care Specialist",
          title: "Providing fast and effective treatment in critical situations, this service is designed to stabilize and manage urgent medical conditions.",
        },
        {
          img:"https://tse1.mm.bing.net/th?id=OIF.%2bdxTgR96kOyk1V8uipltYg&pid=Api&P=0&h=220",
          name: "Chronic Care Support Expert",
          title: "This service focuses on providing ongoing support for managing chronic conditions such as diabetes, hypertension, and asthma.",
        },
        {
          img:"https://wallpaperaccess.com/full/677511.jpg",
          name: "Preventive Health Advocate",
          title: "Dedicated to promoting health and preventing illness, this service offers routine check-ups, screenings, and personalized wellness plans.",
        },
        {
          img:"https://tse1.mm.bing.net/th?id=OIP.hITPmpTKXkGwqBfqDJt-QgHaE7&pid=Api&P=0&h=220",
          name: "Rehabilitation and Recovery",
          title: "Offering specialized rehabilitation services, this support system helps patients recover from surgeries, injuries, or long-term illnesses.",
        },
      ];

    const CARDS: Card[] = [
        {
            id: 0,
            name: "Dr. Sarah Johnson",
            designation: "Cardiologist",
            content: (
                <>
                    <p>
                    Dr. Sarah Johnson provided excellent care during my heart surgery.
                    </p>
                </>
            ),
        },
        {
            id: 1,
            name: "Dr. Alex Roberts",
            designation: "Pediatrician",
            content: (
                <>
                    <p>
                    Dr. Alex Roberts is amazing with kids.
                    </p>
                </>
            ),
        },
        {
            id: 2,
            name: "Dr. Emily Davis",
            designation: "Dermatologist",
            content: (
                <>
                    <p>
                    After suffering from skin problems for years, Dr. Emily Davis finally helped me find the right treatment.
                    </p>
                </>
            ),
        },
        {
            id: 3,
            name: "Dr. John Baker",
            designation: "Orthopedic Surgeon",
            content: (
                <>
                    <p>
                    Dr. Baker did an amazing job with my knee replacement surgery.
                    </p>
                </>
            ),
        },
        {
            id: 4,
            name: "Dr. Lisa Carter",
            designation: "Oncologist",
            content: (
                <>
                    <p>
                    Dr. Lisa Carter was incredibly supportive during my cancer treatment.
                    </p>
                </>
            ),
        },
    ];

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#39cabb0b]">
            <h1 className='text-[2.5rem] text-center font-bold text-[#2e4b64] mb-7 mt-[3rem]'>Patient Reviews and Ratings</h1>
            <div className="bg-white rounded-lg shadow-lg p-6 flex max-w-5xl w-full items-center justify-center mb-10">
                <div className="w-[28rem] h-[21rem] relative">
                    <Image
                        src="/reviewbackroundimg.png" // Replace with your actual image path
                        alt="Doctor"
                        fill
                        quality={100} // Maximum image quality
                        className="rounded-l-lg w-[80%]"
                        priority // Prioritize loading this image
                    />
                </div>
                {/* Left side - Doctor Image */}

                {/* Right side - Review Section */}
                {/* <div className="w-1/2 p-6 rounded-r-lg text-white">
                    <CardStack items={CARDS} />
                </div> */}
                <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normal"
      />
            </div>
        </div>
    );
};