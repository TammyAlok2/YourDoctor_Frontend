'use client';

// components/LocationCard.js
import React from 'react';
import { FiMapPin, FiChevronDown } from 'react-icons/fi'; // Importing icons from react-icons

export default function Location() {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-max">
      <div className="flex items-center p-2">
        <FiMapPin className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Find your location"
          className="focus:outline-none"
        />
        <FiChevronDown className="text-gray-500 ml-2" />
      </div>
      <button className="bg-teal-500 text-white px-4 py-2">Done</button>
    </div>
  );
}
