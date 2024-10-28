"use client";

import Link from "next/link";
import AppointmentData from "../../components/CartComponents/AppointmentCard";
import { Suspense, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllAppointments, getAllDoctor } from "../GlobalRedux/slice/AuthSlice";
import AOS from "aos";
// import { isArray } from "util";
// import { Doctor } from "../(page)/appointmentdetails/appointmentDetailContent/AppointmentDetailContent";
// import { get } from "http";

// import { generateMetadata } from './metadata';

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

interface Doctor {
  _id: string;
  joinStatus: boolean;
}

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const [appointmentsData, setAppointmentsData] = useState<AppointmentsDetails[] | null>([]);
  const [doctorData, setDoctorData] = useState<Doctor | null>(null);
  console.log(appointmentsData);

  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);

  useEffect(() => {

    const appointments = async () => {
      const res = await dispatch(getAllAppointments());
      setAppointmentsData(res?.payload?.data);
    };

    appointments();
  }, [dispatch]);

  useEffect(() => {
    const getDoctorViaAppointment = async () => {
      const res = await dispatch(getAllDoctor());
      setDoctorData(res?.payload?.data);
    };
    getDoctorViaAppointment();
  }, [dispatch]);
   console.log(doctorData)

  // Match doctorId for each appointment and doctor
  const getDoctorForAppointment = (doctorId: string) => {
    const doctor = Array.isArray(doctorData) ? doctorData.find((doctor: Doctor) => doctor._id === doctorId) : null;
    return doctor
  };

  return (
    <>
      <div className="min-h-screen py-10 mt-[5rem]">
        <div className="container mx-auto">
          <Suspense fallback={<div>Loading appointments...</div>}>
          {/* Multiple Appointments */}
          {appointmentsData?.map((data: any, index: any) => {
            const doctorForAppointment = getDoctorForAppointment(data.doctorId || "");
            // console.log(doctorForAppointment.joinStatus)
            return (
              <div key={index} data-aos="fade-left">
                {doctorForAppointment && <AppointmentData
                  name={data?.patientName}
                  date={data?.date}
                  time={data?.time}
                  patientId={data?._id}
                  doctorId={data?.doctorId}
                />}
              </div>
            )
          })}
          </Suspense>
          {/* Back to Home Button */}
          <div className="flex justify-center mt-10" data-aos="fade-in">
            <Link href="/">
              <div className="bg-[#0A8E8A] text-white py-3 px-6 rounded-lg">
                Back to Home
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

