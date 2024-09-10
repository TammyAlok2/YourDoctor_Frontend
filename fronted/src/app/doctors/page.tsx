'use client';

import Link from 'next/link';
import { getAllDoctors } from '@/app/GlobalRedux/slice/DoctorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ReviewComponent from '@/components/HomePage/ratings/page';
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';

// Define the shape of the doctor data
interface Doctor {
  _id: string;
  specialist: string;
  address: string;
  pincode: string;
  fees?: { firstVisitFee?: number };
  avatar?: { secure_url: string };
  status?: boolean;
  fullName: string;
}

const FirstDoctorsSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  const isBrowser = typeof window !== 'undefined'; // Check if the code is running in the browser

  const fetchDoctors = async () => {
    try {
      // Step 1: Try to get doctor data from localStorage (only if on the client-side)
      if (isBrowser) {
        const storedDoctors = localStorage.getItem('doctors');

        if (storedDoctors) {
          const parsedDoctors: Doctor[] = JSON.parse(storedDoctors);
          setDoctorData(parsedDoctors); // Use the locally stored data
          return;
        }
      }

      // Step 2: If no data in localStorage, fetch it using the dispatcher
      const response = await dispatch(getAllDoctors({}));
      const doctorsData = response?.payload?.data;
      setDoctorData(doctorsData); // Use the fetched data

      if (isBrowser) {
        // Step 3: Store the fetched data in localStorage for future use
        localStorage.setItem('doctors', JSON.stringify(doctorsData));
      }
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchDoctors();

    // Optionally set up polling if needed
    // const intervalId = setInterval(() => fetchDoctors(), 30000); // 30 seconds
    // return () => clearInterval(intervalId);
  }, [dispatch, isBrowser]);

  return (
    <div className="flex items-center justify-center relative">
      <div className="grid grid-cols-1 gap-[2rem] xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center mx-[1rem] sm:mx-[2rem] md:mx-[3rem] my-[3rem]">
        {doctorData.map((doctor) => (
          <div
            className="flex flex-col sm:flex-row gap-[2rem] p-[1rem] shadow-md rounded-md"
            key={doctor._id}
          >
            <div className="flex flex-col gap-[1rem] w-[16rem]">
              <h1 className="font-bold">
                Specialist:{" "}
                <span className="text-[blue]">{doctor.specialist}</span>
              </h1>
              <p className="flex gap-[0.5rem]">
                Ratings: <ReviewComponent />
              </p>
              <p>Address: {doctor.address}</p>
              <p>Pincode: {doctor.pincode}</p>
              <ul className="text-gray-600 list-none">
                <li>
                  Fees:{" "}
                  <span className="text-teal-700">
                    {doctor.fees?.firstVisitFee ? `${doctor.fees.firstVisitFee} rs` : 'N/A'}
                  </span>
                </li>
              </ul>
            </div>
            <div className="ml-auto flex flex-col items-end sm:items-start relative gap-[0.8rem] w-[45%] xs:w-[100%] sm:w-auto">
              <div className="w-[6rem] h-[6rem] rounded-full overflow-hidden items-end ml-auto relative">
                <div
                  className={`${
                    doctor.status === false
                      ? ''
                      : 'border-4 rounded-full w-22 h-22 border-[#0A8E8A] flex text-center justify-center p-[0.2rem] mx-auto'
                  }`}
                >
                  {doctor.avatar && (
                    <Image
                      src={doctor.avatar.secure_url || '/placeholder.png'}
                      alt={'Doctor Avatar'}
                      width={100}
                      height={100}
                      className="rounded-full object-cover"
                    />
                  )}
                </div>
                <div
                  className={`absolute right-2 w-[0.8rem] animate-ping rounded-full bottom-3 h-[0.8rem]`}
                  style={{
                    backgroundColor: `${
                      doctor.status === false ? '' : '#54FC05'
                    }`,
                  }}
                ></div>
              </div>
              <h1 className="text-[rgb(17_164_160_/_99%)] font-bold items-end ml-auto">
                {doctor.fullName}
              </h1>
              <button className="bg-[rgb(17_164_160_/_99%)] hover:bg-[rgba(17,164,159,0.89)] p-[0.3rem] text-white rounded-md">
                <Link href={`/appointment/${doctor._id}`}>
                  Book Appointment
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstDoctorsSection;
