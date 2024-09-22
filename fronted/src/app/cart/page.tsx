"use client";

import Link from "next/link";
import AppointmentData from "../../components/CartComponents/AppointmentCard";
import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { useRouter } from "next/navigation";
import { getAllAppointments } from "../GlobalRedux/slice/AuthSlice";

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

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [appointmentsData, setAppointmentsData] = useState<AppointmentsDetails[] | null>([]);
  console.log(appointmentsData);

  useEffect(() => {
   
    const appointments = async () => {
      const res = await dispatch(getAllAppointments());
      setAppointmentsData(res?.payload?.data);
    };

    appointments();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto">
        {/* Multiple Appointments */}
        {appointmentsData?.map((data: any, index: any) => (
          <div key={index}>
            <AppointmentData
              name={data?.patientName}
              date={data?.date}
              time={data?.time}
              patientId={data?._id}
              doctorId={data?.doctorId}
            />
          </div>
        ))}

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
