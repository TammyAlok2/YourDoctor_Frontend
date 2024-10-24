'use client';

// components/ReviewComponent.js

import { useState, useEffect } from 'react';

const ReviewComponent: React.FC = () => {
  const [initialRating, setInitialRating] = useState(0);
  const [isRated, setIsRated] = useState(false);

  // Generate a random rating between 1 and 5 when the component first loads
  useEffect(() => {
    const randomRating = Math.floor(Math.random() * 5) + 1;
    setInitialRating(randomRating);
  }, []);

  const handleRating = (rate: number) => {
    if (!isRated) {
      // Prevent further clicks from visually changing the stars
      setIsRated(true);
    }
  };

  return (
    <div className="flex relative">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-7 w-7 ${
            initialRating >= star ? 'text-yellow-500' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
          onClick={() => handleRating(star)} // Only handle click logic
          style={{ cursor: isRated ? 'default' : 'default' }} // Show pointer only if clickable
        >
          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

export default ReviewComponent;
