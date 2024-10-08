"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";

// Define the shape of pincode data
interface LocationSectionProps {
  onPincodeSelect: (pincode: string, location: string) => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  onPincodeSelect,
}) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [pincodes, setPincodes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPincode, setSelectedPincode] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);

  // Fetch pincodes based on the search term
  useEffect(() => {
    if (searchTerm.length >= 1) {
      fetchPincodes(searchTerm);
    } else {
      setPincodes([]);
    }
  }, [searchTerm]);

  // Function to fetch pincodes from the API
  const fetchPincodes = async (search: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${search}`
      );
      const data = await response.json();
      if (data[0].Status === "Success") {
        const uniquePincodes: string[] = Array.from(
          new Set(
            data[0].PostOffice.map((po: { Pincode: string }) => po.Pincode)
          )
        );
        setPincodes(uniquePincodes);
      } else {
        setPincodes([]);
      }
    } catch (error) {
      console.error("Error fetching pincodes:", error);
      setError("Failed to fetch pincodes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle pincode selection and fetch location data
  const handlePincodeSelect = async (pincode: string) => {
    if (!/^\d{6}$/.test(pincode)) {
      setError("Invalid Pincode. Please enter a 6-digit pincode.");
      setLocation("Location not found");
      onPincodeSelect(pincode, "Location not found");
      return;
    }

    setSelectedPincode(pincode);
    setSearchTerm(pincode);
    setShowSuggestions(false);
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();
      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        const locationString = `${postOffice.Name}, ${postOffice.District}`;
        setLocation(locationString);

        onPincodeSelect(pincode, locationString);
        if (typeof window !== "undefined") {
          localStorage.setItem("location", locationString);
          localStorage.setItem("pincode", pincode);
        }

      } else {
        setLocation("Location not found");
        onPincodeSelect(pincode, "Location not found");
      }
    } catch (error) {
      console.error("Error fetching pincode information:", error);
      setError("Failed to fetch location information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the Done button click
  const handleDone = () => {
    if (/^\d{6}$/.test(searchTerm)) {
      handlePincodeSelect(searchTerm);
    } else {
      setError("Invalid Pincode. Please enter a 6-digit pincode.");
    }
  };
  useEffect(()=>{
    handleDone();
  },[])

  const handleReload = () => {
    setIsLoading(true)
    window.location.reload();
  }

  return (
    <>
    <div className="relative max-w-2xl mx-auto" data-aos="fade-left">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <div className="flex-grow flex items-center px-4 py-2 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter pincode / city"
            className="focus:outline-none w-full"
            onClick={() => setShowSuggestions(true)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 absolute right-4 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 mt-1 max-h-60 overflow-auto z-10 rounded-lg">
          {loading && <div className="px-4 py-2 text-gray-500">Loading...</div>}
          {error && <div className="px-4 py-2 text-red-500">{error}</div>}
          {!loading &&
            !error &&
            pincodes.map((pincode, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handlePincodeSelect(pincode)}
              >
                {pincode}
              </div>
            ))}
        </div>
      )}

      {selectedPincode && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg cursor-pointer" onClick={handleReload}>
          <p className="font-semibold">Selected Pincode: {selectedPincode}</p>
          <p>Location: {location}</p>
        </div>
      )}
    </div>
    </>
  );
};

// Page Component
export default function Page() {
  const handlePincodeSelect = (pincode: string, location: string) => {
    // Handle the selected pincode and location here
    console.log("Selected Pincode:", pincode);
    console.log("Location:", location);
  };

  return <LocationSection onPincodeSelect={handlePincodeSelect} />;
}
