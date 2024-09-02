"use client";

import Link from "next/link";
import { getAllDoctors } from "@/app/GlobalRedux/slice/DoctorSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";

const ThirdDoctorSection = ({setData2, filteredThirdData}) => {
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();
  // const response = useSelector((state) => state?.doctor?.doctors);
  // console.log("doctor data : ", response);
  
  const getAllDoctor = async () => {
    try {
      const response = await dispatch(getAllDoctors());
      // console.log(response);
      setData2(response?.payload?.data.slice(3));
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getAllDoctor();
  }, []);

  
  
  // console.log("our data: ",filteredThirdData)
  
  return (
    <div className="flex items-center justify-center relative">
      <div className="grid grid-cols-1 gap-[2rem] xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center mx-[1rem] sm:mx-[2rem] md:mx-[3rem] my-[3rem]">
        {filteredThirdData?.map((userData) => (
          <div className="flex flex-col sm:flex-row gap-[2rem] p-[1rem] shadow-md rounded-md" key={userData._id}>
            <div className="flex flex-col gap-[1rem]">
              <h1 className="font-bold">Specialist: <span className="text-[blue]">{userData.specialist}</span></h1>
              <p>Time: {userData.data2}</p>
              <p>Address: {userData.address}</p>
              <ul className="text-gray-600 list-none">
                <a className="list-none text-gray-600">First Visit Fees: <span className="text-teal-700">{userData?.fees && userData?.fees?.firstVisitFee + "rs"}</span></a>
                </ul>
            </div>
            <div className="ml-auto flex flex-col items-end sm:items-start relative gap-[0.8rem] w-full sm:w-auto">
              <div className="w-[5rem] h-[5rem] rounded-full bg-[rgb(206_206_206_/_71%)] overflow-hidden">
                {userData?.avatar && (
                  <Image src={userData?.avatar?.secure_url} alt={"Doctor Avatar"} width={100} height={100} className="rounded-full object-cover"/>
                )}
              </div>
              <h1 className="text-[rgb(17_164_160_/_99%)] font-bold">{userData.fullName}</h1>
              <button className="bg-[rgb(17_164_160_/_99%)] hover:bg-[rgba(17,164,159,0.89)] p-[0.3rem] text-white rounded-md">
                <Link href={`/doctor/${userData._id}`}>Book Appointment</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default ThirdDoctorSection