"use client";

import Link from "next/link";
import AppointmentData from "../../components/CartComponents/AppointmentCard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../GlobalRedux/store"; // Import AppDispatch type from your store
import { allAppointments } from "../GlobalRedux/slice/AuthSlice";
import { useEffect, useState } from "react";

interface AppointmentDataType {
  patientName: string;
  date: string;
  time: string;
  patientId: string;
  doctorId: string;
}

const Cart: React.FC = () => {
  const [appointmentData, setAppointmentData] = useState<AppointmentDataType[]>([]); // Ensure state is an array
  const dispatch: AppDispatch = useDispatch();

  const fetchAllAppointments = async () => {
    try {
      const response = await dispatch(allAppointments()); // Dispatch action to get appointments
      console.log(response.payload);

      if (response.payload && Array.isArray(response.payload.data)) {
        setAppointmentData(response.payload.data); // Ensure payload contains data array
      } else {
        console.log("No appointment data found");
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  useEffect(() => {
    fetchAllAppointments(); // Trigger fetching on component mount
  },[]); // Only run on first render (add the empty array dependency)

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto">
        {/* Multiple Appointments */}
        {appointmentData.length > 0 ? (
          appointmentData.map((data, index) => (
            <div key={index}>
              <AppointmentData
                name={data.patientName}
                date={data.date}
                time={data.time}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No appointments found.</p>
        )}

        {/* Back to Home Button */}
        <div className="flex justify-center mt-10">
          <Link href="/">
            <div className="bg-[#0A8E8A] text-white py-3 px-6 rounded-lg">
              Back to Home
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
