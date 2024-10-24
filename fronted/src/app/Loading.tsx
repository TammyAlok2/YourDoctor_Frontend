"use client";

import React, { useEffect, useState } from "react";

const Loading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Disable scrolling by adding 'overflow-hidden' to the body
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Reset to default
    }

    // Mocking a network request or some async action
    const timeoutId = setTimeout(() => {
      setIsLoading(false); // Set loading to false after some time (e.g., data is fetched)
    }, 1500); // Adjust the timeout as necessary

    // Cleanup function to clear the timeout and reset the overflow
    return () => {
      clearTimeout(timeoutId);
      document.body.style.overflow = ""; // Reset overflow in case of unmounting
    };
  }, [isLoading]);

  return isLoading ? (
    <div className="sticky top-0 h-[100vh] w-screen bottom-0 flex items-center justify-center bg-[#0000002c] z-[1000]">
      <div className="text-[3rem] text-[#37a9a3] font-bold">
        <div className="loader"></div>
      </div>
    </div>
  ) : null;
};

export default Loading;
