'use client';

// components/LocationCard.js
import React from 'react';
import { FiMapPin, FiChevronDown } from 'react-icons/fi'; // Importing icons from react-icons

export default function Location() {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex items-center px-[1rem] relative w-[23rem]">
        <FiMapPin className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Find your location"
          className="focus:outline-none"
        />
        <FiChevronDown className="text-gray-500 absolute left-[12rem] text-[2rem]" />
      </div>
      <button className="bg-teal-500 text-white px-4 py-2">Done</button>
    </div>
  );
}
