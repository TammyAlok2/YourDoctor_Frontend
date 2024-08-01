import React from "react";

const AppointmentSec1 = () => {
  return (
    <div>
      <div className="2xl:w-[90rem] xl:w-[70rem] lg:w-[58rem] mx-auto flex my-[2rem] flex-col p-[2rem] [box-shadow:0_0.1rem_0.3rem_0.2rem_lightgray] md:w-[40rem] sm:w-[30rem] xs:w-[20rem]">
        <div className="flex items-center justify-center flex-col space-y-2">
            <div className="w-[7.5rem] h-[7.5rem] bg-[rgb(214_214_214)] rounded-full"></div>
            <h1 className="font-bold text-center text-[#61b1ae] text-[1.7rem]">Dr. XYZ</h1>
        </div>
        <div className="space-y-5 my-[2rem] mx-[2.5rem] xs:mx-[0.8rem]">
            <div className="space-y-3">
            <h1 className="font-semibold">Specialist: </h1>
            <h1 className="font-semibold">Address: </h1>
            </div>
            <h1 className="font-bold">Fees: </h1>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSec1;
