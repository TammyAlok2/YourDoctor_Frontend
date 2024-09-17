"use client";

import { useRef } from "react";
import { jsPDF } from "jspdf"; // for PDF download functionality
import html2canvas from "html2canvas";
import Link from "next/link";
import Image from "next/image";

const AppointmentDetail = () => {
  const printRef = useRef<HTMLDivElement>(null);

  // Download the page content as PDF
  const handleDownload = async () => {
    const content = printRef.current;

    if (content) {
      // Convert content to canvas using html2canvas
      const canvas = await html2canvas(content, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a1");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add image to PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("appointment-detail.pdf");
    }
  };
  return (
    <div className="flex flex-col items-center mt-[2rem] min-h-screen relative">
      <Link href={"/cart"}>
        <Image
          width={25}
          height={25}
          src="https://img.icons8.com/ios-filled/50/reply-arrow.png"
          alt="reply-arrow"
          className="absolute left-[2rem] top-1 cursor-pointer hover:invert-[0.4] active:rotate-[-15deg]"
        />
      </Link>
      {/* The container to be exported */}
      <div
        ref={printRef}
        className="border-[0.1rem] border-[#0A8E8A] rounded-md w-[90%] sm:w-[70%] md:w-[50%] bg-white"
      >
        <h2 className="text-center text-lg font-bold py-3 border-b">
          Appointment Detail
        </h2>

        {/* Doctor details */}
        <div className="border-b py-2 px-6">
          <h3 className="font-bold">Doctor Detail</h3>
          <p>{""}</p>
          <p>{""}</p>
          <p>{""}</p>
          <p>{""}</p>
        </div>

        {/* Patient details */}
        <div className="border-b py-2 px-6 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold">Patient Detail</h3>
            <p>{""}</p>
            <p>{""}</p>
            <p>{""}</p>
          </div>
          <div className="text-right">
            <h3 className="font-bold">Patient ID</h3>
            <p>{""}</p>
          </div>
        </div>

        {/* Appointment and Payment details */}
        <div className="grid grid-cols-2 pt-2 pb-4 px-6 gap-4">
          <div>
            <h3 className="font-bold">Appointment Date & Time</h3>
            <p>{""}</p>
          </div>
          <div className="text-right flex justify-between xs:flex-col">
            <div>
              <h3 className="font-bold">Payment Mode</h3>
              <p>{""}</p>
            </div>
            <div>
              <h3 className="font-bold">Amount</h3>
              <p>{""}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex gap-[14rem] mt-6 items-center xs:gap-[5rem]">
        <Link href={"/"}>
          <button className="bg-transparent border border-teal-500 text-[#0A8E8A] px-4 py-2 rounded hover:bg-[#0a8e8ade] hover:text-white transition">
            Back To Home
          </button>
        </Link>
        <button
          onClick={handleDownload}
          className="bg-[#0A8E8A] text-white px-4 py-2 rounded hover:bg-teal-600 transition"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default AppointmentDetail;
