import Link from 'next/link';
import { toast } from 'react-hot-toast';

const AppointmentSec3 = ({ allSlot }) => {
  const convertTo12HourFormat = (time24) => {
    const [hour, minute] = time24.split(':');
    const hourInt = parseInt(hour);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const hour12 = hourInt % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  };

  // Ensure allSlot and slots are defined, if not, default to an empty array
// Ensure allSlot and slots are defined, if not, default to an empty array
const slots = allSlot?.slots || [];
  
// Fix: Ensure todayDate is always a valid date string
const todayDate = allSlot?.date ? new Date(allSlot.date) : new Date();
const date = todayDate.toISOString().split('T')[0];

const doctorId = allSlot?.doctorId || '';

  const morningSlots = slots.filter(slot => parseInt(slot.startTime.split(':')[0]) < 12);
  const eveningSlots = slots.filter(slot => parseInt(slot.startTime.split(':')[0]) >= 12);

  const handleSlotClick = (e, slot) => {
    if (slot.availableSlot === 0) {
      e.preventDefault(); // Prevent the default link behavior
      toast.error('Appointment is full');
    }
  };

  return (
    <div className="w-[50rem] mx-auto flex flex-col gap-[3rem] my-6 md:w-[40rem] sm:w-[30rem] xs:w-[20rem]">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-10 items-center xs:flex-col xs:gap-[1rem] xs:justify-center xs:space-x-0">
          <h1 className="text-xl">Morning</h1>
          <div className="flex flex-wrap gap-4">
            {morningSlots.length > 0 ? (
              morningSlots.map((slot, index) => (
                <Link
                  href={{
                    pathname: '/appointment-form',
                    query: {
                      todayDate:date,
                      slotId:slot._id,
                      doctorId:doctorId

                    },
                  }}
                  key={index}
                  onClick={(e) => handleSlotClick(e, slot)}
                >
                  <div
                    className={`p-[0.5rem] border-gray-300 border-[0.1rem] rounded-md shadow-sm cursor-pointer ${
                      slot.availableSlot === 0 ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-green-100'
                    }`}
                  >
                    {convertTo12HourFormat(slot.startTime)} to {convertTo12HourFormat(slot.endTime)}
                    <p className="text-xs text-gray-600 mt-1">Available slots: {slot.availableSlot}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No morning slots available</p>
            )}
          </div>
        </div>
        <div className="h-[0.2rem] bg-violet-200"></div>
        <div className="flex space-x-10 items-center xs:flex-col xs:gap-[1rem] xs:justify-center xs:space-x-0">
          <h1 className="text-xl">Evening</h1>
          <div className="grid grid-cols-2 gap-4 xs:grid-cols-2">
            {eveningSlots.length > 0 ? (
              eveningSlots.map((slot, index) => (
                <Link
                  href={{
                    pathname: '/appointment-form',
                    query: {
                      todayDate: date,
                      slotId:slot._id,
                    doctorId:doctorId
                    },

                  }}
                  key={index}
                  onClick={(e) => handleSlotClick(e, slot)}
                >
                  <div
                    className={`p-[0.5rem] w-[12rem] space-x-3 border-gray-300 border-[0.1rem] rounded-md shadow-sm cursor-pointer ${
                      slot.availableSlot === 0 ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-green-100'
                    }`}
                  >
                    {convertTo12HourFormat(slot.startTime)} to {convertTo12HourFormat(slot.endTime)}
                    <p className="text-xs text-gray-600 mt-1">Available slots: {slot.availableSlot}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No evening slots available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSec3;