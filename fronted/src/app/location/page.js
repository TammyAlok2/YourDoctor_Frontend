'use client';

import React, { useState } from 'react';
import { FiMapPin, FiChevronDown } from 'react-icons/fi'; // Importing icons from react-icons

export default function Location() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [pincodeSuggestions, setPincodeSuggestions] = useState([
    '110001',
    '110002',
    '110003',
    '110004',
    '110005',
  ]);

  // Toggles the visibility of the pincode suggestions
  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  return (
    <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
      <div
        className="flex items-center px-[1rem] relative w-[23rem]"
        onClick={toggleSuggestions} // Show suggestions when clicking on input or icon
      >
        <FiMapPin className="text-gray-500 mr-2 cursor-pointer" />
        <input
          type="text"
          placeholder="Find your location"
          className="focus:outline-none w-full"
          onClick={toggleSuggestions} // Show suggestions when input is clicked
        />
        <FiChevronDown className="text-gray-500 absolute right-4 text-[2rem] cursor-pointer" />
      </div>
      <button className="bg-teal-500 text-white px-4 py-2">Done</button>

      {showSuggestions && (
        <div className="absolute top-[3.5rem] left-0 bg-white border border-gray-300 w-[23rem] max-h-[10rem] overflow-auto z-10 rounded-lg">
          {pincodeSuggestions.map((pincode, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                // Optionally, you can update the input with the selected pincode
                console.log(`Selected pincode: ${pincode}`);
                setShowSuggestions(false); // Hide suggestions after selecting
              }}
            >
              {pincode}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
