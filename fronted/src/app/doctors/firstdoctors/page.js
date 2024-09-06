"use client";

import Link from "next/link";
import { getAllDoctors } from "@/app/GlobalRedux/slice/DoctorSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Image from "next/image";
import ReviewComponent from "@/components/HomePage/ratings/page";
import { useParams } from "next/navigation";

const FirstDoctorsSection = ({ setData, filteredData }) => {
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();

  const getAllDoctor = async () => {
    try {
      const response = await dispatch(getAllDoctors());
      setData(response?.payload?.data.slice(0, 3));
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAllDoctor();
  }, []);

  return (
    <div className="flex items-center justify-center relative">
      <div className="grid grid-cols-1 gap-[2rem] xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center mx-[1rem] sm:mx-[2rem] md:mx-[3rem] my-[3rem]">
        {filteredData?.map((userData) => (
          <div
            className="flex flex-col sm:flex-row gap-[2rem] p-[1rem] shadow-md rounded-md"
            key={userData._id}
          >
            <div className="flex flex-col gap-[1rem] w-[16rem]">
              <h1 className="font-bold">
                Specialist:{" "}
                <span className="text-[blue]">{userData.specialist}</span>
              </h1>
              <p className="flex gap-[0.5rem]">
                Ratings: <ReviewComponent />
              </p>
              <p>Address: {userData.address}</p>
              <ul className="text-gray-600 list-none">
                <a className="list-none text-gray-600">
                  First Visit Fees:{" "}
                  <span className="text-teal-700">
                    {userData?.fees && userData?.fees?.firstVisitFee + "rs"}
                  </span>
                </a>
              </ul>
            </div>
            <div className="ml-auto flex flex-col items-end sm:items-start relative gap-[0.8rem] w-[45%] sm:w-auto">
              <div className="w-[6rem] h-[6rem] rounded-full overflow-hidden items-end ml-auto relative">
                <div className="border-4 rounded-full w-22 h-22 border-[#0A8E8A] flex text-center justify-center p-[0.2rem] mx-auto">
                  {userData?.avatar && (
                    <Image
                      src={userData?.avatar?.secure_url}
                      alt={"Doctor Avatar"}
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
                      userData?.status === false ? "" : "#54FC05"
                    }`,
                  }}
                ></div>
              </div>
              <h1 className="text-[rgb(17_164_160_/_99%)] font-bold items-end ml-auto">
                {userData.fullName}
              </h1>
              <button className="bg-[rgb(17_164_160_/_99%)] hover:bg-[rgba(17,164,159,0.89)] p-[0.3rem] text-white rounded-md">
                <Link href={`/appointment/${userData._id}`}>
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
