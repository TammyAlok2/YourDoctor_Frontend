'use client';

import React, { useEffect, useState } from 'react';

// Mock lab data
const labData = [
  {
    id: 1,
    name: 'City Lab Diagnostics',
    address: '123 Main Street, Springfield',
    image: '/labimg1.png'
  },
  {
    id: 2,
    name: 'HealthPlus Labs',
    address: '456 Oak Avenue, Greenfield',
    image: '/labimg2.png'
  },
  {
    id: 3,
    name: 'Advanced Lab Solutions',
    address: '789 Pine Road, Riverdale',
    image: '/labimg3.png'
  },
];

const LabLists = () => {
  const [current, setCurrent] = useState(0);
  const length = labData.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 4000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [current]);

  if (!Array.isArray(labData) || labData.length <= 0) {
    return null;
  }
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Lab Lists</h1>

        {/* Lab Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labData.map(lab => (
            <div key={lab.id} className="bg-white rounded-lg shadow-lg p-6">
              <img
                src={lab.image}
                alt={`${lab.name} logo`}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
              <div className='flex flex-col items-center justify-center'>
                <h2 className="text-2xl font-semibold text-gray-700">{lab.name}</h2>
                <p className="text-gray-600 mt-2">{lab.address}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabLists;
