"use client";

import Link from "next/link";
import AppointmentData from "../../components/CartComponents/AppointmentCard";

interface AppointmentDataType {
  name: string;
  date: string;
  time: string;
}

const appointmentData:AppointmentDataType[] = [
  {
    name: "Alok Tamrakar",
    date: "08-09-24",
    time: "morning 08am-10am",
  },
  {
    name: "Alok Tamrakar",
    date: "08-09-24",
    time: "morning 08am-10am",
  },
  {
    name: "Alok Tamrakar",
    date: "08-09-24",
    time: "morning 08am-10am",
  },
  {
    name: "Alok Tamrakar",
    date: "08-09-24",
    time: "morning 08am-10am",
  },
];

const Cart: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto">
        {/* Multiple Appointments */}
        {appointmentData?.map((data, index) => (
          <div key={index}>
            <AppointmentData
              name={data.name}
              date={data.date}
              time={data.time}
            />
          </div>
        ))}

        {/* Back to Home Button */}
        <div className="flex justify-center mt-10">
          <Link href="/">
            <div className="bg-[#0A8E8A] text-white py-3 px-6 rounded-lg">
              Back to Home
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
