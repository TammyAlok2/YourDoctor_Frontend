'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDoctors } from '@/app/GlobalRedux/slice/DoctorSlice';

const DoctorList = () => {
  const dispatch = useDispatch();
 
  const doctors = localStorage.getItem('doctors')
  // const filteredDoctors = doctors.filter((data)=>console.log(data.fullName))
  const [pincode, setPincode] = useState('');
  
  // const filteredDoctors = doctors?.find((doctor) => doctor.pincode === pincode);
  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);
  
  console.log(doctors)

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Enter Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        className="border-2 border-gray-300 p-2 rounded-md mb-4"
      />
      {/* {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="border p-4 rounded-md shadow-md mb-4">
            <h2 className="text-xl font-bold">{doctor.name}</h2>
            <p>{doctor.specialization}</p>
            <p>{doctor.address}</p>
            <p>Pincode: {doctor.pincode}</p>
          </div>
        ))
      ) : (
        <p>No doctors found for this pincode.</p>
      )} */}
    </div>
  );
};

export default DoctorList;
