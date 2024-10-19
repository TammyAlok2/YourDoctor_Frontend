'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CardStack } from "../ui/card-stack";
import style from 'styled-jsx/style';

// Define a type for the card data structure
interface Card {
    id: number;
    name: string;
    designation: string;
    content: JSX.Element;
}

export const ReviewPage = ({
    className,
}: {
    className?: string;
}) => {
    const CARDS: Card[] = [
        {
            id: 0,
            name: "Dr. Sarah Johnson",
            designation: "Cardiologist",
            content: (
                <>
                    <p>
                    Dr. Sarah Johnson provided excellent care during my heart surgery. She was kind, professional, and took time to explain every step of the process. I highly recommend her services.
                    </p>
                    <div className="flex mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className={`h-7 w-7 cursor-none ${star <= 5 ? 'text-yellow-500' : 'text-gray-300'
                                    }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ))}
                    </div>
                </>
            ),
        },
        {
            id: 1,
            name: "Dr. Alex Roberts",
            designation: "Pediatrician",
            content: (
                <>
                    <p>
                    Dr. Alex Roberts is amazing with kids. My daughter used to be scared of doctors, but Dr. Roberts made her feel so comfortable. A fantastic pediatrician!
                    </p>
                    <div className="flex mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className={`h-7 w-7 cursor-none ${star <= 4 ? 'text-yellow-500' : 'text-gray-300'
                                    }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ))}
                    </div>
                </>
            ),
        },
        {
            id: 2,
            name: "Dr. Emily Davis",
            designation: "Dermatologist",
            content: (
                <>
                    <p>
                    After suffering from skin problems for years, Dr. Emily Davis finally helped me find the right treatment. I’m extremely satisfied with the results.
                    </p>
                    <div className="flex mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className={`h-7 w-7 cursor-none ${star <= 3 ? 'text-yellow-500' : 'text-gray-300'
                                    }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ))}
                    </div>
                </>
            ),
        },
        {
            id: 3,
            name: "Dr. John Baker",
            designation: "Orthopedic Surgeon",
            content: (
                <>
                    <p>
                    Dr. Baker did an amazing job with my knee replacement surgery. His expertise and care throughout the recovery process were exceptional.
                    </p>
                    <div className="flex mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className={`h-7 w-7 cursor-none ${star <= 4 ? 'text-yellow-500' : 'text-gray-300'
                                    }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ))}
                    </div>
                </>
            ),
        },
        {
            id: 4,
            name: "Dr. Lisa Carter",
            designation: "Oncologist",
            content: (
                <>
                    <p>
                    Dr. Lisa Carter was incredibly supportive during my cancer treatment. Her empathy, combined with her vast knowledge, helped me through a very tough time.
                    </p>
                    <div className="flex mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className={`h-7 w-7 cursor-none ${star <= 5 ? 'text-yellow-500' : 'text-gray-300'
                                    }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ))}
                    </div>
                </>
            ),
        },
    ];

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-[#39cabb0b]">
            <div className="bg-white rounded-lg shadow-lg p-6 flex max-w-5xl w-full items-center justify-center">
                <div className="w-[24rem] h-[21rem] relative">
                    <Image
                        src="/reviewbackroundimg.png" // Replace with your actual image path
                        alt="Doctor"
                        fill
                        quality={100} // Maximum image quality
                        className="rounded-l-lg w-[80%]"
                        priority // Prioritize loading this image
                    />
                </div>
                {/* Left side - Doctor Image */}

                {/* Right side - Review Section */}
                <div className="w-1/2 p-6 rounded-r-lg text-white">
                    <CardStack items={CARDS} />
                </div>
            </div>
        </div>
    );
};