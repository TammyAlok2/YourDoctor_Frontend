"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Doctor {
  _id: string;
  fees: {
    firstVisitFee: number;
    emergencyFee1: number;
  };
}

const DoctorPayment:React.FC = () => {
  const params = useParams();
  const doctors = localStorage.getItem("doctors");
  const doctor: Doctor | undefined = JSON.parse(doctors).find((doctor:Doctor) => doctor._id === params.id);
  const fees = doctor?.fees;

  // Get the current time
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  // Check if it's after 10 PM
  const isEmergencyTime = currentHour >= 22 || currentHour <= 5;

  // Determine which fee to display
  const feeToDisplay = isEmergencyTime
    ? (!fees?.emergencyFee1 !== undefined && fees?.emergencyFee1 !== 0 ? fees?.firstVisitFee : fees?.emergencyFee1)
    : fees?.firstVisitFee;

  // Calculate discount and total
  const discount = Math.round(feeToDisplay * 0.3);
  const total = feeToDisplay - discount;

  return (
    <div className="flex h-screen flex-col items-center mt-[1.7rem]">
      <div className="bg-white pt-6 pb-10 px-7 border-[0.3rem] border-[#0A8E8A] w-[34rem] text-center rounded-lg shadow-lg">
        <h1 className="text-2xl text-left font-semibold mb-2">
          You're paying,
        </h1>
        <p className="text-4xl font-semibold mt-[1.5rem] mb-2">
          Rs {feeToDisplay}
        </p>
        <div className="bg-green-100 text-green-800 p-3 rounded-md mt-4 mb-6">
          <p className="font-bold">Special Offer!</p>
          <p>Get a 30% discount on your visit today!</p>
        </div>
        <hr className="border-t-2 border-gray-200" />
        <div className="mt-4">
          <div className="flex justify-between text-lg">
            <span className="font-bold">Original Fee</span>
            <span>Rs {feeToDisplay}</span>
          </div>
          <div className="flex justify-between text-lg mt-1">
            <span className="font-bold">Tax</span>
            <span>Rs 0.00</span>
          </div>
          <div className="flex justify-between text-lg mt-1 text-green-600">
            <span className="font-bold">Discount (30%)</span>
            <span>- Rs {discount}</span>
          </div>
          <div className="flex justify-between text-xl mt-3 pt-3 border-t-2 border-gray-200">
            <span className="font-bold">Total</span>
            <span className="font-bold text-[#0A8E8A]">Rs {total}</span>
          </div>
        </div>
      </div>
      <button className="mt-[7rem] bg-[#0A8E8A] text-white py-3 px-6 rounded-lg hover:bg-[#086e6e] transition duration-200 text-2xl shadow-md">
        <Link href={`/appointmentsubmit/${params.id}`}>Pay at clinic</Link>
      </button>
    </div>
  );
};

export default DoctorPayment;