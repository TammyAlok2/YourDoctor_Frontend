'use client';

// components/ReviewComponent.js

import { useState } from 'react';

const ReviewComponent:React.FC = () => {
  const [rating, setRating] = useState(0);
  
  const handleRating = (rate:any) => {
    setRating(rate);
  };

  return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-7 w-7 cursor-none ${
              rating >= star ? 'text-yellow-500' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
            onClick={() => handleRating(star)}
          >
            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
  );
};

export default ReviewComponent;
