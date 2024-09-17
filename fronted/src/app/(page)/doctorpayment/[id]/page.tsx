"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/app/GlobalRedux/store";
import { getAllDoctor } from "@/app/GlobalRedux/slice/AuthSlice";

interface Doctor {
  _id: string;
  fees: {
    firstVisitFee: number;
    emergencyFee1: number;
  };
}

const DoctorPayment: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [doctor, setDoctor] = useState<Doctor | undefined>(undefined);
  const [feeToDisplay, setFeeToDisplay] = useState<number | undefined>(undefined);

  const fetchDoctorData = async () => {
    try {
      const response = await dispatch(getAllDoctor());
      const doctors = response?.payload?.data;

      if (doctors) {
        const foundDoctor = doctors.find((doc: Doctor) => doc._id === params.id);

        if (foundDoctor) {
          setDoctor(foundDoctor);
          updateFeeToDisplay(foundDoctor);
        }
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  const updateFeeToDisplay = (doctorData: Doctor) => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    // Check if it's after 10 PM or before 5 AM (emergency hours)
    const isEmergencyTime = currentHour >= 22 || currentHour < 5;

    // Determine which fee to display
    const fee = isEmergencyTime
      ? (doctorData.fees.emergencyFee1 !== undefined && doctorData.fees.emergencyFee1 !== 0
          ? doctorData.fees.emergencyFee1
          : doctorData.fees.firstVisitFee)
      : doctorData.fees.firstVisitFee;

    setFeeToDisplay(fee);
  };

  useEffect(() => {
    fetchDoctorData();

    // Set up polling interval
    const intervalId = setInterval(() => {
      fetchDoctorData();
    }, 30000); // Poll every 30 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [params.id]);

  // Calculate discount and total
  const discount = feeToDisplay ? Math.round(feeToDisplay * 0.3) : 0;
  const total = feeToDisplay ? feeToDisplay - discount : 0;

  if (!doctor) {
    return <div className="flex h-[100vh] items-center justify-center font-thin text-[3rem]">Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col items-center mt-[1.7rem]">
      <div className="bg-white pt-6 pb-10 px-7 border-[0.3rem] border-[#0A8E8A] w-[34rem] xs:w-[94%] text-center rounded-lg shadow-lg">
        <h1 className="text-2xl text-left font-semibold mb-2">You're paying,</h1>
        <p className="text-4xl font-semibold mt-[1.5rem] mb-2">
          Rs {feeToDisplay || 'N/A'}
        </p>
        <div className="bg-green-100 text-green-800 p-3 rounded-md mt-4 mb-6">
          <p className="font-bold">Special Offer!</p>
          <p>Get a 30% discount on your visit today!</p>
        </div>
        <hr className="border-t-2 border-gray-200" />
        <div className="mt-4">
          <div className="flex justify-between text-lg">
            <span className="font-bold">Original Fee</span>
            <span>Rs {feeToDisplay || 'N/A'}</span>
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