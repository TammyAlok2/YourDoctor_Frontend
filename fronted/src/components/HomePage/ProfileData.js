// "use client";

// import Link from "next/link";
// import { getAllDoctors } from "@/app/GlobalRedux/slice/DoctorSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// const ProfileData = () => {
//   const [data, setData] = useState([]);
//   const dispatch = useDispatch();
//   // const response = useSelector((state) => state?.doctor?.doctors);
//   // console.log("doctor data : ", response);

//   const getAllDoctor = async () => {
//     try {
//       const response = await dispatch(getAllDoctors());
//       // console.log(response);
//       setData(response?.payload?.data?.slice(0, 3));
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getAllDoctor();
//   }, []);

//   // console.log("our data: ",data)

//   return (
//     <div className="flex items-center justify-center relative">
//       <div className="grid grid-cols-3 justify-center mx-[2rem] gap-[1rem] my-[3rem] xs:flex-col sm:flex-col lg:flex-row">
//         {data?.map((userData) => (
//           <div
//             className="flex gap-[2rem] p-[1rem] shadow-md rounded-md"
//             key={userData._id}
//           >
//             <div className="flex flex-col gap-[1rem]">
//               <h1 className="font-bold w-[15rem]">
//                 Specialist :{" "}
//                 <span className="text-[blue]">{userData.specialist}</span>
//               </h1>
//               <p>Time : {userData.data2} </p>
//               <p>Address : {userData.address}</p>
//               <details>
//                 <summary className="font-bold">Fees: </summary>
//                 <summary className="ml-[1.4rem] list-none text-gray-600">
//                   emergencyFee1:{" "}
//                   <span className="text-teal-700">
//                     {userData?.fees && userData?.fees?.emergencyFee1 + "rs"}
//                   </span>
//                 </summary>
//                 <summary className="ml-[1.4rem] list-none text-gray-600">
//                   emergencyFee1:{" "}
//                   <span className="text-teal-700">
//                     {userData?.fees && userData?.fees?.emergencyFee2 + "rs"}
//                   </span>
//                 </summary>
//                 <summary className="ml-[1.4rem] list-none text-gray-600">
//                   emergencyFee1:{" "}
//                   <span className="text-teal-700">
//                     {userData?.fees && userData?.fees?.firstVisitFee + "rs"}
//                   </span>
//                 </summary>
//                 <summary className="ml-[1.4rem] list-none text-gray-600">
//                   emergencyFee1:{" "}
//                   <span className="text-teal-700">
//                     {userData?.fees && userData?.fees?.secondVisitFee + "rs"}
//                   </span>
//                 </summary>
//                 <summary className="ml-[1.4rem] list-none text-gray-600">
//                   emergencyFee1:{" "}
//                   <span className="text-teal-700">
//                     {userData?.fees &&
//                       userData?.fees?.visitUnder7DaysFee + "rs"}
//                   </span>
//                 </summary>
//               </details>
//             </div>
//             <div className="flex flex-col relative gap-[0.8rem] w-[10rem]">
//               <div className="w-[5rem] h-[5rem] rounded-full bg-[rgb(206_206_206_/_71%)]">
//                 {userData?.avatar && (
//                   <Image
//                     src={userData?.avatar?.secure_url}
//                     alt={"image"}
//                     width={100}
//                     height={100}
//                     className="rounded-full"
//                   />
//                 )}
//               </div>
//               <h1 className="text-[rgb(17_164_160_/_99%)] font-bold">
//                 {userData.fullName}
//               </h1>
//               <button className="bg-[rgb(17_164_160_/_99%)] hover:bg-[rgba(17,164,159,0.89)] p-[0.3rem] text-white rounded-md">
//                 <Link href={`/doctor/${userData._id}`}>Book Appointment</Link>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProfileData;

"use client";

import Link from "next/link";
import { getAllDoctors } from "@/app/GlobalRedux/slice/DoctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import ReviewComponent from './ratings/page'

const ProfileData = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getAllDoctor = async () => {
    try {
      const response = await dispatch(getAllDoctors());
      setData(response?.payload?.data?.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDoctor();
  }, []);

  return (
    <div className="flex items-center justify-center relative">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mx-4 my-6 ">
        {data?.map((userData) => (
          <div
            className="flex flex-col sm:flex-row gap-4 p-4 shadow-md rounded-md"
            key={userData._id}
          >
            <div className="flex flex-col gap-4">
              <h1 className="font-bold">
                Specialist:{" "}
                <span className="text-blue-600">{userData.specialist}</span>
              </h1>
              <p>Address: {userData.address}</p>
                <ul className="text-gray-600 list-none">
                <a className="list-none text-gray-600">First Visit Fees: <span className="text-teal-700">{userData?.fees && userData?.fees?.firstVisitFee + "rs"}</span></a>
                </ul>
            </div>
            <div className="ml-auto flex flex-col items-end sm:items-center gap-2 w-full sm:w-auto">
              <div className="w-20 h-20 rounded-full bg-gray-300">
                {userData?.avatar && (
                  <Image
                    src={userData?.avatar?.secure_url}
                    alt={"image"}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                )}
              </div>
              <h1 className="text-teal-600 font-bold text-center sm:text-left">
                {userData.fullName}
              </h1>
              <button className="bg-teal-600 hover:bg-teal-500 p-2 text-white rounded-md">
                <Link href={`/doctor/${userData._id}`}>Book Appointment</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileData;
