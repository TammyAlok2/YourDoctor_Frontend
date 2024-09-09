"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Define the shape of the box data
interface Box {
  title: string;
  imageSrc: string;
  description: string;
}

interface SecondDoctorsSectionProps {
  setData1: (data: Box[]) => void;
  filteredSecondData: Box[];
}

const SecondDoctorsSection: React.FC<SecondDoctorsSectionProps> = ({
  setData1,
  filteredSecondData,
}) => {
  const boxes: Box[] = [
    {
      title: "Consult Now",
      imageSrc:
        "https://thumbs.dreamstime.com/z/fears-doubts-difficulties-pregnancy-concept-banner-question-marks-around-pregnant-woman-single-mother-modern-card-flat-279007372.jpg",
      description: "Period doubts or Pregnancy",
    },
    {
      title: "Consult Now",
      imageSrc:
        "https://thumbs.dreamstime.com/z/fears-doubts-difficulties-pregnancy-concept-banner-question-marks-around-pregnant-woman-single-mother-modern-card-flat-279007372.jpg",
      description: "Acne, pimple or skin issues",
    },
    {
      title: "Consult Now",
      imageSrc:
        "https://thumbs.dreamstime.com/z/fears-doubts-difficulties-pregnancy-concept-banner-question-marks-around-pregnant-woman-single-mother-modern-card-flat-279007372.jpg",
      description: "Cold, cough or fever",
    },
    {
      title: "Consult Now",
      imageSrc:
        "https://thumbs.dreamstime.com/z/fears-doubts-difficulties-pregnancy-concept-banner-question-marks-around-pregnant-woman-single-mother-modern-card-flat-279007372.jpg",
      description: "Child not feeling well",
    },
    {
      title: "Consult Now",
      imageSrc:
        "https://thumbs.dreamstime.com/z/fears-doubts-difficulties-pregnancy-concept-banner-question-marks-around-pregnant-woman-single-mother-modern-card-flat-279007372.jpg",
      description: "Depression or anxiety",
    },
  ];

  useEffect(() => {
    setData1(boxes);
  }, [setData1]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-[2rem] xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center mx-[1rem] sm:mx-[2rem] md:mx-[3rem] my-[3rem]">
        {filteredSecondData.map((box, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-[1rem] shadow-md rounded-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-[6rem] h-[6rem] rounded-full overflow-hidden">
              <Image
                src={box.imageSrc}
                alt={box.title}
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-[1.2rem] font-bold text-center mt-4 mb-2">
              {box.description}
            </p>
            <h2 className="text-xl font-bold text-[#0A8E8A] text-center">
              {box.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Page() {
  const [data1, setData1] = useState<Box[]>([]);
  const filteredSecondData = data1.slice(0, 5); // Show only the first 5 consult options

  return (
    <SecondDoctorsSection setData1={setData1} filteredSecondData={filteredSecondData} />
  );
}
