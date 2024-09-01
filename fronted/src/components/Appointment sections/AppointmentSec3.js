
const AppointmentSec3 = () => {
  return (
      <div className="w-[50rem] mx-auto flex flex-col gap-[3rem] my-6 md:w-[40rem] sm:w-[30rem] xs:w-[20rem]">
        <div className="flex space-x-10 items-center xs:flex-col xs:gap-[1rem] xs:justify-center xs:space-x-0">
            <h1>Morning</h1>
            <div className="flex space-x-10 items-center">
            <h1 className="p-[0.5rem] border-gray-300 border-[0.1rem]">8:00AM to 9:30AM</h1>
            <h1 className="p-[0.5rem] border-gray-300 border-[0.1rem]">10:00 to 12:00PM</h1>
            </div>
        </div>
        <div className="h-[0.2rem] bg-violet-200"></div>
        <div className="flex space-x-10 items-center xs:flex-col xs:gap-[1rem] xs:justify-center xs:space-x-0">
            <h1>Evening</h1>
            <div className="flex space-x-10 items-center">
            <h1 className="p-[0.5rem] border-gray-300 border-[0.1rem]">2:00PM to 4:00PM</h1>
            <h1 className="p-[0.5rem] border-gray-300 border-[0.1rem]">4:30PM to 7:30PM</h1>
            </div>
        </div>
      </div>
  )
}

export default AppointmentSec3
