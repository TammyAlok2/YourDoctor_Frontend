"use client";

import { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf"; // for PDF download functionality
import html2canvas from "html2canvas";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import {
  getAllAppointments,
  getAllDoctor,
} from "@/app/GlobalRedux/slice/AuthSlice";
import { useRouter, useSearchParams } from "next/navigation";
import AOS from "aos";

interface AppointmentsDetails {
  age?: number;
  bloodPressure?: string;
  createdAt?: string;
  date?: string;
  description?: string;
  diabetes?: string;
  doctorId?: string;
  gender?: string;
  patientId?: string;
  patientName?: string;
  patientPhone: number;
  slotId?: string;
  time?: string;
  updatedAt?: string;
  userId?: string;
  weight: number;
  _id?: string;
}

export interface Doctor {
  _id: string;
  specialist?: string;
  address?: string;
  pincode?: string;
  fees?: {
    emergencyFee1?: number;
    emergencyFee2?: number;
    firstVisitFee?: number;
    secondVisitFee?: number;
    visitUnder7DaysFee?: number;
  };
  status?: boolean;
  avatar?: {
    secure_url: string;
  };
  fullName?: string;
  description?: string;
}

interface Doctors {
  _id: string;
  fees: {
    firstVisitFee: number;
    emergencyFee1: number;
  };
}

const AppointmentDetail = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId");
  const doctorId = searchParams.get("doctorId");

  const [appointmentData, setAppointmentData] =
    useState<AppointmentsDetails | null>(null);
  const [doctorData, setDoctorData] = useState<Doctor | null>(null);

  const [doctor, setDoctor] = useState<Doctors | undefined>(undefined);

  const [feeToDisplay, setFeeToDisplay] = useState<number | undefined>(
    undefined
  );


  
  // Download the page content as PDF
  const handleDownload = async () => {
    const content = printRef.current;

    if (content) {
      // Convert content to canvas using html2canvas with specific scale for better quality
      const canvas = await html2canvas(content, {
        scale: window.devicePixelRatio,
      });

      const imgData = canvas.toDataURL("image/png");

      // Define A4 page size in points (72 DPI)
      const a4Width = 595.28; // A4 width in points
      const a4Height = 841.89; // A4 height in points

      // Get the content dimensions
      const contentWidth = canvas.width;
      const contentHeight = canvas.height;

      // Calculate scale factor to fit the content within A4 page dimensions while maintaining aspect ratio
      const scaleFactor = Math.min(a4Width / contentWidth, a4Height / contentHeight);

      // Adjust the content size to fit within A4
      const scaledWidth = contentWidth * scaleFactor;
      const scaledHeight = contentHeight * scaleFactor;

      // Create a jsPDF instance for A4 format
      const pdf = new jsPDF({
        orientation: 'portrait', // A4 portrait
        unit: "pt", // Using points (pt) for A4 handling
        format: 'a4', // A4 format
      });

      // Calculate position to center the content on the A4 page
      const xPos = (a4Width - scaledWidth) / 2;
      // const yPos = (a4Height - scaledHeight) / 2;
      
      // Add the content image to the PDF, scaled and centered
      pdf.addImage(imgData, "PNG", xPos, 0, scaledWidth, scaledHeight);

      // Save the PDF with content properly scaled and centered on an A4 page
      pdf.save("appointment-detail.pdf");
    }
  };

  useEffect(() => {
    const getAppointment = async () => {
      const res = await dispatch(getAllAppointments());
      const appointment = res.payload?.data.find(
        (state: AppointmentsDetails) => state._id === patientId
      );
      setAppointmentData(appointment);
    };
    getAppointment();
  }, [dispatch]);

  useEffect(() => {
    const getDoctorViaAppointment = async () => {
      const res = await dispatch(getAllDoctor());
      const doctorViaAppointment = res.payload?.data.find(
        (state: Doctor) => state._id === doctorId
      );
      setDoctorData(doctorViaAppointment);
      updateFeeToDisplay(doctorViaAppointment);
    };
    getDoctorViaAppointment();
  }, [dispatch]);
  // console.log(doctorData)
  
  const updateFeeToDisplay = (doctorData: Doctors) => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    
    // Check if it's after 10 PM or before 5 AM (emergency hours)
    const isEmergencyTime = currentHour >= 22 || currentHour < 5;
    
    // Determine which fee to display
    const fee = isEmergencyTime
    ? doctorData.fees.emergencyFee1 !== undefined &&
    doctorData.fees.emergencyFee1 !== 0
    ? doctorData.fees.emergencyFee1
    : doctorData.fees.firstVisitFee
    : doctorData.fees.firstVisitFee;
    
    setFeeToDisplay(fee);
  };
  
  // Calculate discount and total
  const discount = feeToDisplay ? Math.round(100) : 0;
  const total = feeToDisplay ? feeToDisplay - discount : 0;
  
  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);
  return (
    <>
      <div className="flex flex-col items-center mt-[8rem] mb-[3rem] relative overflow-hidden" data-aos="fade-left">
        <Link href={"/cart"}>
          <Image
            width={35}
            height={35}
            src="https://img.icons8.com/ios-glyphs/30/arrow.png"
            alt="reply-arrow"
            className="absolute left-[2rem] top-1 cursor-pointer hover:invert-[0.4] active:rotate-[-200deg] rotate-180 xs:top-1 z-10 xs:left-8"
          />
        </Link>
        {/* The container to be exported */}

        {/* Hidden message for PDF */}
        <p
          ref={messageRef}
          style={{ display: "none" }}
          className="text-center font-semibold text-[2rem] animate-bounce mb-3 text-teal-600"
        >
          Appointment Details has been successfully downloaded.
        </p>

        <div
          // ref={printRef}
          className="border-[0.1rem] border-[#0A8E8A] rounded-md w-[90%] sm:w-[70%] md:w-[50%] bg-white relative"
        >
          <h2 className="text-center text-xl font-bold py-3 border-b">
            Appointment Detail
          </h2>

          {/* Doctor details */}
          <div className="border-b py-2 px-6 grid grid-cols-2 gap-4 xs:grid-cols-1">
            <div>
              <h3 className="font-light text-[1.4rem]">Doctor Detail</h3>
              <p className="font-semibold">{doctorData?.fullName}</p>
              <p className="font-semibold text-[0.9rem]">
                Fees: Rs {feeToDisplay}
              </p>
            </div>
            <div className="text-right xs:text-left">
              <h3 className="font-bold">General Medicine</h3>
              <p className="font-semibold text-[0.9rem]">{doctorData?.address}</p>
              <p className="font-semibold text-[0.9rem]">{doctorData?.pincode}</p>
            </div>
          </div>

          {/* Patient details */}
          <div className="border-b py-2 px-6 grid grid-cols-2 gap-4 xs:grid-cols-1">
            <div>
              <h3 className="font-light text-[1.4rem]">Patient Detail</h3>
              <p className="font-bold text-[1.3rem]">
                {appointmentData?.patientName}
              </p>
              <p className="font-semibold text-[0.9rem]">
                {appointmentData?.gender}, {appointmentData?.age} {"year"},{" "}
                {appointmentData?.patientPhone}
              </p>
            </div>
            <div className="text-right xs:text-left">
              <h3 className="font-light text-[1.4rem]">Patient ID</h3>
              <p className="font-bold text-[1.3rem]">
                {appointmentData?.patientId}
              </p>
            </div>
          </div>

          {/* Appointment and Payment details */}
          <div className="grid grid-cols-2 pt-2 pb-4 px-6 gap-4">
            <div>
              <h3 className="font-light text-[1.4rem]">
                Appointment Date & Time
              </h3>
              <p className="font-bold">
                {appointmentData?.date} {appointmentData?.time}
              </p>
            </div>
            <div className="text-center flex justify-between xs:flex-col mt-[0.5rem]">
              <div>
                <h3 className="font-bold">Payment Mode</h3>
                <p>{"Cash"}</p>
              </div>
              <div>
                <h3 className="font-bold">Amount</h3>
                <p className="text-[#0A8E8A] font-bold">Rs {total}</p>
              </div>
            </div>
          </div>

        </div>

        {/* download pdf  */}
        <div
          ref={printRef}
          className="rounded-md w-[90%] sm:w-[70%] md:w-[50%] bg-white flex flex-col min-h-[841.89pt] min-w-[595.28pt] absolute left-[-60rem]" // A4 size in points
        >
          {/* Header */}
          <header className="flex justify-between border-b-[1rem] border-b-[rgb(62_151_229)] relative">
            <img
              src={"/YOURLab_Logo.png"}
              alt="cardImage"
              className="w-[26%] object-fit block ml-[3rem] mr-[2rem] py-[0.5rem]"
            />
            <div
              className="bg-[#0A8E8A] skew-x-[22deg] h-[5rem] w-[60.3%] relative left-6"
              style={{
                borderBottom: "5rem solid #0A8E8A",
              }}
            ></div>
          </header>

          {/* Main content */}
          <div className="flex-grow mt-[14rem] px-2">
            <div className="border-[0.1rem] border-teal-600">

              <h2 className="text-center text-2xl font-bold pt-3 pb-5 border-b mb-2">
                Appointment Details
              </h2>

              {/* Doctor details */}
              <div className="border-b pb-4 px-6 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-light text-[1.4rem]">Doctor Detail</h3>
                  <p className="font-semibold">{doctorData?.fullName}</p>
                  <p className="font-semibold text-[0.9rem]">Fees: Rs {feeToDisplay}</p>
                </div>
                <div className="text-right">
                  <h3 className="font-bold">General Medicine</h3>
                  <p className="font-semibold text-[0.9rem]">{doctorData?.address}</p>
                  <p className="font-semibold text-[0.9rem]">{doctorData?.pincode}</p>
                </div>
              </div>

              {/* Patient details */}
              <div className="border-b pb-4 px-6 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-light text-[1.4rem]">Patient Detail</h3>
                  <p className="font-bold text-[1.3rem]">{appointmentData?.patientName}</p>
                  <p className="font-semibold text-[0.9rem]">
                    {appointmentData?.gender}, {appointmentData?.age} {"year"},{" "}
                    {appointmentData?.patientPhone}
                  </p>
                </div>
                <div className="text-right">
                  <h3 className="font-light text-[1.4rem]">Patient ID</h3>
                  <p className="font-bold text-[1.3rem]">{appointmentData?.patientId}</p>
                </div>
              </div>

              {/* Appointment and Payment details */}
              <div className="grid grid-cols-2 pb-4 px-6 gap-4">
                <div>
                  <h3 className="font-light text-[1.4rem]">Appointment Date & Time</h3>
                  <p className="font-bold">{appointmentData?.date} {appointmentData?.time}</p>
                </div>
                <div className="text-center flex justify-between mt-[0.5rem]">
                  <div>
                    <h3 className="font-bold">Payment Mode</h3>
                    <p>{"Cash"}</p>
                  </div>
                  <div>
                    <h3 className="font-bold">Amount</h3>
                    <p className="text-[#0A8E8A] font-bold">Rs {total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-[#0A8E8A] h-[5rem] w-[100%] p-[1rem] text-white flex items-center justify-between mt-auto 2xl:mt-[0.7rem]">
            <div className="flex text-[1rem]">
              <img src="/webico.png" alt="web icon" className="w-[2rem] invert-1 mr-[0.5rem] mt-[0.2rem]" />
              Visit here - <p className="ml-[0.2rem]">www.yourlab.in</p>
            </div>
            <div className="flex items-center mt-[-0.5rem]">Contact us - +91 9516785745</div>
          </footer>
        </div>

        {/* end  */}

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
               <Link href={`/reviews/${doctorId}`}>
               <button
           
            className="bg-[#0A8E8A] text-white px-4 py-2 rounded hover:bg-teal-600 transition"
          >
            Review
          </button>

               </Link>

        </div>
      </div>
    </>
  );
};

export default AppointmentDetail;
