"use client";

import React, { useState, useEffect } from "react";
import { FiMapPin, FiChevronDown } from "react-icons/fi"; // Importing icons from react-icons

export default function Location() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [pincodeSuggestions] = useState([
    "110001",
    "110002",
    "110003",
    "110004",
    "110005",
    "120001",
    "120002",
    "120003",
    "120004",
    "120005",
    "130001",
    "130002",
    "130003",
    "130004",
    "130005",
    "140001",
    "140002",
    "140003",
    "140004",
    "140005",
    "150001",
    "150002",
    "150003",
    "150004",
    "150005",
    "160001",
    "160002",
    "160003",
    "160004",
    "160005",
    "170001",
    "170002",
    "170003",
    "170004",
    "170005",
    "180001",
    "180002",
    "180003",
    "180004",
    "180005",
    "190001",
    "190002",
    "190003",
    "190004",
    "190005",
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Toggles the visibility of the pincode suggestions
  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  // Validates the input value
  const validatePincode = () => {
    const pincodePattern = /^[1-9][0-9]{5}$/; // Regex pattern for a valid 6-digit pincode
    if (!pincodePattern.test(inputValue)) {
      setErrorMessage("Please enter a valid 6-digit pincode.");
    } else {
      setErrorMessage("");
    }
  };

  // Handles the input change and filters suggestions based on input value
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setErrorMessage(""); // Clear error message on input change

    // Filter pincode suggestions based on input value
    if (value) {
      const filtered = pincodeSuggestions.filter((pincode) =>
        pincode.startsWith(value)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true); // Show suggestions if there's input
    } else {
      setFilteredSuggestions([]); // Clear suggestions when input is cleared
      setShowSuggestions(false);
    }
  };

  // Handles the pincode selection
  const handlePincodeSelect = (pincode) => {
    setInputValue(pincode);
    setShowSuggestions(false); // Hide suggestions after selecting
    setErrorMessage(""); // Clear any previous errors
  };

  return (
    <div className="relative flex flex-col">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <div
          className="flex items-center px-[1rem] relative w-[23rem]"
          onClick={toggleSuggestions} // Show suggestions when clicking on input or icon
        >
          <FiMapPin className="text-gray-500 mr-2 cursor-pointer" />
          <input
            type="text"
            placeholder="Find your location"
            value={inputValue}
            onChange={handleInputChange}
            className="focus:outline-none w-full"
            onClick={toggleSuggestions} // Show suggestions when input is clicked
          />
          <FiChevronDown className="text-gray-500 absolute right-4 text-[2rem] cursor-pointer" />
        </div>
        <button
          className="bg-teal-500 text-white px-4 py-2"
          onClick={validatePincode} // Validate input on Done click
        >
          Done
        </button>
      </div>

      {/* Show error message if validation fails */}
      {errorMessage && <p className="text-red-500 mt-1">{errorMessage}</p>}

      {/* Pincode suggestions based on input */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-[3.5rem] left-0 bg-white border border-gray-300 w-[23rem] max-h-[10rem] overflow-auto z-10 rounded-lg">
          {filteredSuggestions.map((pincode, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handlePincodeSelect(pincode)} // Update input with selected pincode
            >
              {pincode}
            </div>
          ))}
        </div>
      )}

      {/* Show message if no matching pincode is found */}
      {showSuggestions && filteredSuggestions.length === 0 && (
        <div className="absolute top-[3.5rem] left-0 bg-white border border-gray-300 w-[23rem] max-h-[10rem] overflow-auto z-10 rounded-lg px-4 py-2 text-gray-500">
          No matching pincodes found
        </div>
      )}
    </div>
  );
}
