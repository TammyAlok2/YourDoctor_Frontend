import Image from "next/image";

// components/AppointmentProcess.tsx
const AppointmentProcess = () => {
    return (
        <div className="bg-[rgb(243_235_251)] py-16 relative">
  {/* Background Images */}
  <Image className="hidden lg:block absolute bottom-0 left-0" width="300" height="300" src="/appointprocessimg1.png" alt="background-image" />
  <Image className="hidden lg:block absolute top-0 right-0" width="300" height="300" src="/appointprocessimg2.png" alt="background-image" />

  {/* Title Section */}
  <div className="text-center mb-12">
    <p className="text-teal-400 uppercase tracking-widest font-bold mb-2">Process</p>
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00224f]">Appointment Process</h2>
  </div>

  {/* Process Steps */}
  <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8">
    {/* Step 1 */}
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-[18.5vw] relative hover-animation1">
      <div className="flex justify-center items-center bg-teal-500 rounded-full w-12 h-12 mb-4 text-white font-bold text-md absolute transform -translate-x-1/2 shadow-lg z-1 right-2">01</div>
      <Image className="relative mb-6" width="100" height="100" src="/appointprocessimg3.png" alt="background-image" />
      <h3 className="text-lg md:text-xl font-semibold mb-4">Search for the Providers</h3>
      <p className="text-gray-500 text-sm md:text-base">
        Use the website’s search function to find healthcare providers in your area that meet your needs.
      </p>
      <span className="w-[6rem] h-[0.2rem] bg-[#3ad0c4] rounded-full bottom-0 absolute transition-all duration-500 ease-in-out right-10"></span>
    </div>

    {/* Step 2 */}
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-[18.5vw] relative hover-animation1">
      <div className="flex justify-center items-center bg-teal-500 rounded-full w-12 h-12 mb-4 text-white font-bold text-md absolute transform -translate-x-1/2 shadow-lg z-1 right-2">02</div>
      <Image className="relative mb-6" width="100" height="100" src="/appointprocessimg4.png" alt="background-image" />
      <h3 className="text-lg md:text-xl font-semibold mb-4">Schedule for an Appointment</h3>
      <p className="text-gray-500 text-sm md:text-base">
        Our doctors directory allows you to schedule appointments with the providers listed on the site.
      </p>
      <span className="w-[6rem] h-[0.2rem] bg-[#FE5948] rounded-full bottom-0 absolute transition-all duration-500 ease-in-out right-10"></span>
    </div>

    {/* Step 3 */}
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-[18.5vw] relative hover-animation1">
      <div className="flex justify-center items-center bg-teal-500 rounded-full w-12 h-12 mb-4 text-white font-bold text-md absolute transform -translate-x-1/2 shadow-lg z-1 right-2">03</div>
      <Image className="relative mb-6" width="100" height="100" src="/appointprocessimg5.png" alt="background-image" />
      <h3 className="text-lg md:text-xl font-semibold mb-4">Confirm your Appointment</h3>
      <p className="text-gray-500 text-sm md:text-base">
        Make sure to confirm your appointment with the provider’s office or clinic via phone or email.
      </p>
      <span className="w-[6rem] h-[0.2rem] bg-[rgb(58_200_208)] rounded-full bottom-0 absolute transition-all duration-500 ease-in-out right-10"></span>
    </div>
  </div>
</div>

    );
};

export default AppointmentProcess;
