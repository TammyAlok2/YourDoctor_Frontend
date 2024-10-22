'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Amelia Anna",
    role: "Marketer",
    image: "/testimony1.jpg", // Replace with actual image path
    message: "Lorem ipsum dolor sit amet con sectetur adipic eksed do eiusmod od tempor incid.",
  },
  {
    id: 2,
    name: "Paolo Dybala",
    role: "Marketer",
    image: "/testimony2.jpg", // Replace with actual image path
    message: "Lorem ipsum dolor sit amet con sectetur adipic eksed do eiusmod od tempor incid.",
  },
  {
    id: 3,
    name: "Samuel Daniels",
    role: "Marketer",
    image: "/testimony3.jpg", // Replace with actual image path
    message: "Lorem ipsum dolor sit amet con sectetur adipic eksed do eiusmod od tempor incid.",
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // Change testimonial every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#e8f7f9] py-12">
      <div className="text-center mb-8">
        <h5 className="text-teal-600 uppercase tracking-wider">Testimonials</h5>
        <h2 className="text-4xl font-bold text-gray-900">Testimonials</h2>
      </div>

      <div className="flex justify-center overflow-hidden">
        <div className="w-[20%] max-w-screen-lg">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full px-4 flex-shrink-0"
                style={{ width: "100%" }}
              >
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-lg italic text-gray-600 mb-4">
                    {`"${testimonial.message}"`}
                  </p>
                  <div className="flex justify-center items-center space-x-3 mt-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      {/* <div className="flex justify-center space-x-2 mt-4">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${currentIndex === idx ? 'bg-teal-600' : 'bg-gray-300'}`}
          />
        ))}
      </div> */}
      {/* <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normal"
      /> */}
    </div>
  );
};

export default Testimonials;