"use client";

import { getAllDoctor } from "@/app/GlobalRedux/slice/AuthSlice";
// import axios from "axios";
import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ReviewComponent from '@/components/HomePage/ratings/page'
// import { useEffect, useState } from "react";

const DoctorPage = () => {
  
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params.id)
  
  const [doctor, setDoctor] = useState(null);
  
  const fetchDoctors = async () =>{
    try {
      if(params.id){
        const response = await dispatch(getAllDoctor());
        const doctors = response?.payload?.data;

        // Find the doctor with the matching ID
        const foundDoctor = doctors?.find((doc) => doc._id === params.id);
        setDoctor(foundDoctor);
      }
    } catch (error) {
      toast.error("doctor data fetch error:", error)
    }
  }
useEffect(()=>{
  fetchDoctors()
},[])
console.log(doctor)
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="h-16 "></header>
      <main className="max-w-4xl mx-auto py-8 px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="bg-white p-6 md:p-8 lg:p-12 rounded-lg shadow-lg mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="text-black space-y-4">
              <p>Specialist: {doctor?.specialist}</p>
              <div className="flex gap-[0.5rem]">Ratings: <ReviewComponent /></div>
              <p className="flex-1">Address: {doctor?.address && doctor?.address.trim() + "," || ""} {doctor?.pincode}</p>
              <div className="grid grid-cols-2 gap-2 text-[0.9rem]">
                <a className="list-none text-gray-600">Emergency Fee1: <span className="text-teal-700">{doctor?.fees && doctor?.fees?.emergencyFee1 + "rs"}</span></a>
                <a className="list-none text-gray-600">Emergency Fee2: <span className="text-teal-700">{doctor?.fees && doctor?.fees?.emergencyFee2 + "rs"}</span></a>
                <a className="list-none text-gray-600">First Visit Fees: <span className="text-teal-700">{doctor?.fees && doctor?.fees?.firstVisitFee + "rs"}</span></a>
                <a className="list-none text-gray-600">Second Visit Fee: <span className="text-teal-700">{doctor?.fees && doctor?.fees?.secondVisitFee + "rs"}</span></a>
                <a className="list-none text-gray-600">Visit Under 7 Days Fees: <span className="text-teal-700">{doctor?.fees && doctor?.fees?.visitUnder7DaysFee + "rs"}</span></a>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4 md:mt-0">
              <div className="relative w-24 h-24 rounded-full mb-2">
              <div className={`${doctor ?.status === false ? "" : "border-4 rounded-full border-[#0A8E8A] w-[7rem] h-[7rem] flex items-center justify-center p-[0.2rem] mx-auto"}`}>
              {
                doctor?.avatar && <Image
                  src={doctor?.avatar?.secure_url}
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
                  width={100}
                  height={100}
                  priority
                />
              }
                <div className={`absolute w-[0.7rem] animate-ping rounded-full right-0 -bottom-2 h-[0.7rem]`} style={{backgroundColor: `${doctor?.status === false ? '' : '#54FC05'}`}}></div>
              </div>
              </div>
              <h1 className="text-[rgb(17_164_160_/_99%)] font-bold mt-2">{doctor?.fullName}</h1>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4 text-black">About Doctor</h2>
          <p className="font-light mb-4 text-black">{doctor?.description}</p>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4 text-black">Work Experience</h2>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4 text-black">Awards</h2>
        </section>

        <section className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="bg-white p-4 rounded-lg shadow-lg text-black flex-1 h-36">
              Review 1
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-black flex-1 h-36">
              Review 2
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-black flex-1 h-36">
              Review 3
            </div>
          </div>
        </section>

        <div className="text-center mt-8">
          <button className="bg-teal-500 text-white py-2 px-4 rounded">
          <Link href={`/appointment/${params.id}`}>
            Book Appointment
          </Link>
          </button>
        </div>
      </main>
    </div>
  );
};

export default DoctorPage;
