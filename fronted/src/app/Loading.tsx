"use client";

import React, { useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";

const Loading = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Simulate a loading process or wait for some data/action to complete.
    useEffect(() => {
      // Mocking a network request or some async action
      const timeoutId = setTimeout(() => {
        setIsLoading(false); // Set loading to false after some time (e.g., data is fetched)
      }, 500); // Adjust the timeout as necessary
  
      // Cleanup function to clear the timeout if component unmounts
      return () => clearTimeout(timeoutId);
    }, []);
  return <div>
    {
        isLoading ? <div className="text-[3rem] font-bold flex items-center justify-center absolute top-0 z-10 w-screen h-screen bg-[#0000002c]"><RiseLoader color="#37a9a3" /></div> : ""
    }
  </div>;
};

export default Loading;
