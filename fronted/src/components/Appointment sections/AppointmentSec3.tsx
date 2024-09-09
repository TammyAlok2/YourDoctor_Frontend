'use client';

import Link from 'next/link';
import { toast } from 'react-hot-toast';
import React from 'react';

interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  availableSlot: number;
}

interface AllSlot {
  slots: Slot[];
  date: string;
  doctorId: string;
}

interface AppointmentSec3Props {
  allSlot: AllSlot;
}

const AppointmentSec3: React.FC<AppointmentSec3Props> = ({ allSlot }) => {
  const convertTo12HourFormat = (time24: string) => {
    const [hour, minute] = time24.split(':');
    const hourInt = parseInt(hour);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const hour12 = hourInt % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  };

  const slots: Slot[] = allSlot?.slots || [];
  const todayDate = allSlot?.date ? new Date(allSlot.date) : new Date();
  const date = todayDate.toISOString().split('T')[0];
  const doctorId = allSlot?.doctorId || '';

  const morningSlots = slots.filter(slot => parseInt(slot.startTime.split(':')[0]) < 12);
  const eveningSlots = slots.filter(slot => parseInt(slot.startTime.split(':')[0]) >= 12);

  const isSlotRunning = (slot: Slot) => {
    const currentTime = new Date();
    const slotStartTime = new Date(`${todayDate.toISOString().split('T')[0]}T${slot.startTime}`);
    const slotEndTime = new Date(`${todayDate.toISOString().split('T')[0]}T${slot.endTime}`);
    return currentTime >= slotStartTime && currentTime <= slotEndTime;
  };

  const isSlotInPast = (slot: Slot) => {
    const currentTime = new Date();
    const slotEndTime = new Date(`${todayDate.toISOString().split('T')[0]}T${slot.endTime}`);
    return currentTime > slotEndTime;
  };

  // Check if the slot is within 30 minutes from the end time
  const isWithin30MinutesOfEnd = (slot: Slot) => {
    const currentTime = new Date();
    const slotEndTime = new Date(`${todayDate.toISOString().split('T')[0]}T${slot.endTime}`);
    
    // Get the time 30 minutes before the slot end time
    const timeBeforeEnd = new Date(slotEndTime.getTime() - 30 * 60 * 1000);
    
    return currentTime >= timeBeforeEnd && currentTime < slotEndTime;
  };

  const handleSlotClick = (e:any, slot: Slot) => {
    if (isSlotInPast(slot)) {
      e.preventDefault();
      toast.error('Cannot book an appointment for a past slot');
      return;
    }
    if (slot.availableSlot === 0) {
      e.preventDefault();
      toast.error('Appointment is full');
      return;
    }
    if (isWithin30MinutesOfEnd(slot)) {
      e.preventDefault();
      toast.error('Cannot book an appointment within 30 minutes of the slot ending');
      return;
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
                      todayDate: date,
                      slotId: slot._id,
                      doctorId: doctorId,
                    },
                  }}
                  key={index}
                  onClick={(e) => handleSlotClick(e, slot)}
                >
                  <div
                    className={`relative p-[0.5rem] border-gray-300 border-[0.1rem] rounded-md shadow-sm cursor-pointer ${
                      isSlotInPast(slot) || slot.availableSlot === 0
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'hover:bg-green-100'
                    }`}
                  >
                    {/* Show "Running" label and make sure it's above the slot */}
                    {isSlotRunning(slot) && (
                      <div className="absolute -top-4 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-bl-md rounded-tr-md">
                        Running
                      </div>
                    )}
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
                      slotId: slot._id,
                      doctorId: doctorId,
                    },
                  }}
                  key={index}
                  onClick={(e) => handleSlotClick(e, slot)}
                >
                  <div
                    className={`relative p-[0.5rem] w-[12rem] space-x-3 border-gray-300 border-[0.1rem] rounded-md shadow-sm cursor-pointer ${
                      isSlotInPast(slot) || slot.availableSlot === 0
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'hover:bg-green-100'
                    }`}
                  >
                    {/* Show "Running" label and make sure it's above the slot */}
                    {isSlotRunning(slot) && (
                      <div className="absolute -top-4 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-bl-md rounded-tr-md">
                        Running
                      </div>
                    )}
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
