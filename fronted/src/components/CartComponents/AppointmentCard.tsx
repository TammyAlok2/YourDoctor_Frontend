"use client";
import Link from "next/link";
import { FC } from "react";

interface AppointmentCardProps {
  name: string;
  date: string;
  time: string;
  patientId: string;
  doctorId: string;
}

const AppointmentCard: FC<AppointmentCardProps> = ({
  name,
  date,
  time,
  patientId,
  doctorId,
}) => {

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-stretch border border-teal-500 rounded-lg my-4 w-full max-w-[1068px] mx-auto">
        <div className="mx-auto text-center md:text-left my-[1rem] w-[28rem] xs:w-[16rem]">
          <h3 className="font-bold text-lg md:text-xl">Appointment booked</h3>
          <p className="text-gray-600 font-semibold">{name}</p>
          <div className="flex flex-col md:flex-row lg:gap-[7.6rem] xs:gap-[1.6rem]">
            <p className="text-gray-500 text-sm md:text-base">{date}</p>
            <p className="text-gray-500 text-sm md:text-base">{time}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center md:items-end border-t md:border-t-0 md:border-l-[0.1rem] border-[#747474] w-full md:w-auto mt-4 xs:mt-0 sm:pr-0 sm:pb-3 md:pb-0 md:mr-3 md:mt-0 pt-4 md:pt-0 pl-0 md:pl-4 pr-5 xs:pr-0">
          <Link
            href={{
              pathname: "/appointmentdetails",
              query: {
                todayDate: date,
                patientId: patientId,
                doctorId: doctorId,
              },
            }}
            className="bg-[#0A8E8A] text-white py-2 px-6 rounded-lg text-sm my-auto xs:mb-3"
          >
            <button data-aos="fade-in">View details</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AppointmentCard;
