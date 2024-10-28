"use client";

import { getAllDoctor } from "@/app/GlobalRedux/slice/AuthSlice";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ReviewComponent from "@/components/HomePage/ratings/page";
import { AppDispatch } from "@/app/GlobalRedux/store";
import AOS from "aos";

interface Doctor {
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

const ShimmerUI = () => (
  <div className="animate-pulse mt-[5rem]">
    <div className="bg-white p-6 md:p-8 lg:p-12 rounded-lg shadow-lg mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="text-black space-y-4 w-full md:w-2/3">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="grid grid-cols-2 gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center mt-4 md:mt-0">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-20 mt-2"></div>
        </div>
      </div>
    </div>

    <section className="mb-16">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </section>

    <section className="mb-16">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </section>

    <section className="mb-16">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </section>

    <section className="mb-12">
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 p-4 rounded-lg shadow-lg flex-1 h-36"
          ></div>
        ))}
      </div>
    </section>

    <div className="text-center mt-8">
      <div className="inline-block h-10 w-32 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const DoctorPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);

  const fetchDoctor = async () => {
    try {
      if (params.id) {
        setLoading(true);
        const response = await dispatch(getAllDoctor());
        const doctors = response?.payload?.data;

        // Find the doctor with the matching ID
        const foundDoctor = doctors?.find(
          (doc: Doctor) => doc._id === params.id
        );
        setDoctor(foundDoctor);
      }
    } catch (error) {
      toast.error("Error fetching doctor data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();

    // Set up polling interval
    const intervalId = setInterval(() => {
      fetchDoctor();
    }, 5000); // Poll every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="h-8"></header>
        <main className="max-w-4xl mx-auto pb-4 px-4 md:px-6 lg:px-4 xl:px-8">
          <ShimmerUI />
        </main>
      </div>
    );
  }

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-[4rem]">
      <header className="h-8"></header>
      <main className="max-w-4xl mx-auto pb-4 px-4 md:px-6 lg:px-4 xl:px-8">
        <div className="bg-white p-6 xs:w-[82%] xs:mx-auto md:p-8 lg:p-8 rounded-lg shadow-lg mb-4 relative" data-aos="fade-out">
          <Link href={"/"}>
            <Image
              width={25}
              height={25}
              src="https://img.icons8.com/ios-glyphs/30/arrow.png"
              alt="reply-arrow"
              className="absolute left-2 top-2 cursor-pointer hover:invert-[0.4] active:rotate-[-200deg] rotate-180"
            />
          </Link>
          <div className="flex flex-col xs:flex-col-reverse xs:items-center sm:flex-col-reverse xs:gap-2 md:flex-row justify-between items-start sm:items-center sm:justify-center md:justify-between">
            <div className="text-black space-y-4">
              <p>Specialist: {doctor.specialist}</p>
              <div className="flex gap-[0.5rem]">
                Ratings: <ReviewComponent />
              </div>
              <p className="flex-1">
                Address: {(doctor.address && doctor.address.trim() + ",") || ""}{" "}
                {doctor.pincode}
              </p>
              <div className="grid grid-cols-2 gap-2 text-[0.9rem]">
                <a className="list-none text-gray-600">
                  Emergency Fee1:{" "}
                  <span className="text-teal-700">
                    {doctor.fees?.emergencyFee1}rs
                  </span>
                </a>
                <a className="list-none text-gray-600">
                  Emergency Fee2:{" "}
                  <span className="text-teal-700">
                    {doctor.fees?.emergencyFee2}rs
                  </span>
                </a>
                <a className="list-none text-gray-600">
                  First Visit Fees:{" "}
                  <span className="text-teal-700">
                    {doctor.fees?.firstVisitFee}rs
                  </span>
                </a>
                <a className="list-none text-gray-600">
                  Second Visit Fee:{" "}
                  <span className="text-teal-700">
                    {doctor.fees?.secondVisitFee}rs
                  </span>
                </a>
                <a className="list-none text-gray-600">
                  Visit Under 7 Days Fees:{" "}
                  <span className="text-teal-700">
                    {doctor.fees?.visitUnder7DaysFee}rs
                  </span>
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4 md:mt-0">
              <div className="relative w-24 h-24 rounded-full mb-2">
                <div
                  className={`${doctor.status === false
                      ? ""
                      : "border-4 rounded-full border-[#0A8E8A] w-[7rem] h-[7rem] flex items-center justify-center p-[0.2rem] mx-auto"
                    }`}
                >
                  {doctor.avatar && (
                    <Image
                      src={doctor.avatar.secure_url}
                      alt="Profile"
                      className="w-24 h-24 rounded-full"
                      width={100}
                      height={100}
                      priority
                    />
                  )}
                  <div
                    className={`absolute w-[0.7rem] animate-ping rounded-full right-0 -bottom-2 h-[0.7rem]`}
                    style={{
                      backgroundColor:
                        doctor.status === false ? "transparent" : "#54FC05",
                    }}
                  ></div>
                </div>
              </div>
              <h1 className="text-[rgb(17_164_160_/_99%)] font-bold mt-4 text-[1.3rem] xs:mt-3 sm:mt-1">
                {doctor.fullName}
              </h1>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4 text-black">About Doctor</h2>
          <p className="font-light mb-4 text-black">{doctor.description}</p>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4 text-black">Work Experience</h2>
          {/* Add work experience content here */}
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4 text-black">Awards</h2>
          {/* Add awards content here */}
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
            <Link href={`/appointment/${params.id}`}>Book Appointment</Link>
          </button>
        </div>
      </main>
    </div>
  );
};

export default DoctorPage;
