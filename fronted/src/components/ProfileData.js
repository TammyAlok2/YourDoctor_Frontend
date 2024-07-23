"use client";

const profileData = [
  {
    data1: "Specialist :",
    data2: "Time :",
    data3: "Address :",
    data4: "Fees :",
    userName: "Dr. XYZ",
  },
  {
    data1: "Specialist :",
    data2: "Time :",
    data3: "Address :",
    data4: "Fees :",
    userName: "Dr. XYZ",
  },
  {
    data1: "Specialist :",
    data2: "Time :",
    data3: "Address :",
    data4: "Fees :",
    userName: "Dr. XYZ",
  }
];

const ProfileData = () => {
  return (
    <div className="flex items-center justify-center">
        <div className="grid justify-center grid-cols-3 space-x-[2rem] mx-[2rem] max-[850px]:grid-cols-1 gap-[1rem] relative top-[3rem]">
    {
        profileData.map((userData, index)=>(
      <div className="flex gap-[2rem] p-[1rem] [box-shadow:0rem_0rem_1rem_0rem_gray]" key={index}>
        <div className="flex flex-col gap-[1rem]">
          <h1 className="font-bold">{userData.data1}</h1>
          <p>{userData.data2} </p>
          <p>{userData.data3}</p>
          <h2 className="font-bold mt-[1rem]">{userData.data4}</h2>
        </div>
        <div className="flex flex-col relative gap-[0.8rem]">
          <div className="w-[5rem] h-[5rem] rounded-full bg-[rgb(206_206_206_/_71%)]"></div>
          <h1 className="text-[rgb(17_164_160_/_99%)] font-bold">{userData.userName}</h1>
          <button className="bg-[rgb(17_164_160_/_99%)] p-[0.3rem] text-white rounded-md">
            Book Appointment
          </button>
        </div>
      </div>
        ))
    }
        </div>
    </div>
  );
};

export default ProfileData;
