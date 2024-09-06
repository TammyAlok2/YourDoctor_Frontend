"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const DoctorPayment = () => {
  const params = useParams();
  return (
    <div className="flex h-screen flex-col items-center mt-[1.7rem]">
      <div className="bg-white pt-6 pb-10 px-7 border-[0.3rem] border-[#0A8E8A] w-[34rem] text-center">
        <h1 className="text-2xl text-left font-semibold mb-2">
          You're paying,
        </h1>
        <p className="text-4xl font-semibold mt-[1.5rem] mb-2">450 Rupees</p>
        <hr />
        <div className="mt-4">
          <div className="flex justify-between text-lg">
            <span className="font-bold">Tax</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between text-lg mt-1">
            <span className="font-bold">Discount</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between text-lg mt-1">
            <span className="font-bold">Total</span>
            <span>450.00</span>
          </div>
        </div>
      </div>
      <button className="mt-[7rem] bg-[#0A8E8A] text-white py-2 px-4 rounded-lg hover:bg-[#086e6e] transition duration-200 text-2xl">
        <Link href={`/appointmentsubmit/${params.id}`}>Pay at clinic</Link>
      </button>
    </div>
  );
};

export default DoctorPayment;
