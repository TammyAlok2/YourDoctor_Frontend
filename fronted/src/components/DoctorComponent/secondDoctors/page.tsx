'use client'
// pages/Boxes.js
import Image from "next/image";
import { useEffect } from "react";

// Define the shape of the box data
interface Box {
  title: string;
  imageSrc: string;
  description: string;
}



const SecondDoctorsSection: React.FC = () => {

  const boxes: Box[] = [
    {
      title: "Consult Now",
      imageSrc: "https://thumbs.dreamstime.com/z/fears-doubts-difficulties-pregnancy-concept-banner-question-marks-around-pregnant-woman-single-mother-modern-card-flat-279007372.jpg",
      description: "Period doubts or Pregnancy",
    },
    {
      title: "Consult Now",
      imageSrc: "https://thumbs.dreamstime.com/z/fears-doubts-difficulties-pregnancy-concept-banner-question-marks-around-pregnant-woman-single-mother-modern-card-flat-279007372.jpg",
      description: "Acne, pimple or skin issues, ",
    },
    {
      title: "Consult Now",
      imageSrc: "https://thumbs.dreamstime.com/z/fears-doubts-difficulties-pregnancy-concept-banner-question-marks-around-pregnant-woman-single-mother-modern-card-flat-279007372.jpg",
      description: "Cold, cough or fever,",
    },
    {
      title: "Consult Now",
      imageSrc: "https://thumbs.dreamstime.com/z/fears-doubts-difficulties-pregnancy-concept-banner-question-marks-around-pregnant-woman-single-mother-modern-card-flat-279007372.jpg",
      description: "Child not feeling well.",
    },
    {
      title: "Consult Now",
      imageSrc: "https://thumbs.dreamstime.com/z/fears-doubts-difficulties-pregnancy-concept-banner-question-marks-around-pregnant-woman-single-mother-modern-card-flat-279007372.jpg",
      description: "Depression or anxiety.",
    },
  ];
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between">
        {boxes.map((box, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-full md:w-1/5 p-4 mb-6 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={box.imageSrc}
              alt={box.title}
              width={100}
              height={100}
              className="rounded-full mb-4 h-[6rem] w-[6rem]"
            />
            <p className="text-[1.2rem] text-center font-bold">{box.description}</p>
            <h2 className="text-xl font-bold mb-2 text-center text-[#0A8E8A] active:text-[1.2rem] cursor-pointer hover:text-[#0a8e8ad2]">{box.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecondDoctorsSection;