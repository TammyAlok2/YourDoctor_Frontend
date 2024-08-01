const appointmentsubmitted = () => {
  return (
    <>
      <div>
        <div className="2xl:w-[90rem] xl:w-[70rem] lg:w-[58rem] mx-auto flex my-[2rem] flex-row-reverse justify-between p-[2rem] [box-shadow:0_0.1rem_0.3rem_0.2rem_lightgray] md:w-[40rem] sm:w-[30rem] xs:w-[20rem] xs:flex-col">
          <div className="flex items-center flex-col space-y-2">
            <div className="w-[7.5rem] h-[7.5rem] bg-[rgb(214_214_214)] rounded-full"></div>
            <h1 className="font-bold text-center text-[#61b1ae] text-[1.7rem]">
              Dr. XYZ
            </h1>
          </div>
          <div className="mx-[2.5rem] xs:mx-[0.8rem] xs:my-[1rem]">
            <div className="space-y-10">
              <h1 className="font-semibold">Specialist: </h1>
              <h1 className="">Specialist: </h1>
              <h1 className="">Address: </h1>
            </div>
            <h1 className="font-bold mt-[3.8rem]">Fees: </h1>
          </div>
        </div>
      </div>
      <form className="flex items-center justify-center flex-col h-[26vh] font-bold gap-[2rem]">
        <div>
          <h1 className="text-[1.3rem] text-center">
            Your Appointment Has successfully <br /> Booked
          </h1>
        </div>
      </form>
    </>
  );
};

export default appointmentsubmitted;
