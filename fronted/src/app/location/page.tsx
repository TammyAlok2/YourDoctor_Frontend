"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";

interface PostOffice {
  Name: string;
  District: string;
  State: string;
  Pincode: string;
}

interface LocationSectionProps {
  onPincodeSelect: (pincode: string, location: string) => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({ onPincodeSelect }) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<PostOffice[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPincode, setSelectedPincode] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });
  }, []);

  // Function to fetch locations based on search term
  const fetchLocations = async (search: string) => {
    setLoading(true);
    setError("");
    try {
      let url: string;
      // If search term is numeric and 6 digits, search by pincode
      if (/^\d{6}$/.test(search)) {
        url = `https://api.postalpincode.in/pincode/${search}`;
      } else {
        // Otherwise search by city name
        url = `https://api.postalpincode.in/postoffice/${search}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data[0].Status === "Success") {
        const postOffices: PostOffice[] = data[0].PostOffice;
        // Remove duplicates based on unique combinations of city, district, and pincode
        const uniqueLocations = postOffices.filter((po, index, self) =>
          index === self.findIndex((p) => 
            p.Name === po.Name && 
            p.District === po.District && 
            p.Pincode === po.Pincode
          )
        );
        setSuggestions(uniqueLocations);
      } else {
        setSuggestions([]);
        setError("No locations found");
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError("Failed to fetch locations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Debounce search to prevent too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 3) {
        fetchLocations(searchTerm);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleLocationSelect = (postOffice: PostOffice) => {
    const locationString = `${postOffice.Name}, ${postOffice.District}, ${postOffice.State}`;
    setSelectedPincode(postOffice.Pincode);
    setLocation(locationString);
    setSearchTerm(`${postOffice.Name} - ${postOffice.Pincode}`);
    setShowSuggestions(false);

    onPincodeSelect(postOffice.Pincode, locationString);
    
    if (typeof window !== "undefined") {
      localStorage.setItem("location", locationString);
      localStorage.setItem("pincode", postOffice.Pincode);
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    window.location.reload();
  };

  return (
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
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by city name or pincode"
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
            suggestions.map((postOffice, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleLocationSelect(postOffice)}
              >
                <div className="font-medium">{postOffice.Name}</div>
                <div className="text-sm text-gray-600">
                  {postOffice.District}, {postOffice.State} - {postOffice.Pincode}
                </div>
              </div>
            ))}
        </div>
      )}

      {selectedPincode && (
        <div 
          className="mt-4 p-4 bg-gray-100 rounded-lg cursor-pointer" 
          onClick={handleReload}
        >
          <p className="font-semibold">Selected Pincode: {selectedPincode}</p>
          <p>Location: {location}</p>
        </div>
      )}
    </div>
  );
};

export default function Page() {
  const handlePincodeSelect = (pincode: string, location: string) => {
    console.log("Selected Pincode:", pincode);
    console.log("Location:", location);
  };

  return <LocationSection onPincodeSelect={handlePincodeSelect} />;
}