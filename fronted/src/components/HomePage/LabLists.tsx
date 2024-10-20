import React from 'react';

// Mock lab data
const labData = [
  {
    id: 1,
    name: 'City Lab Diagnostics',
    address: '123 Main Street, Springfield',
  },
  {
    id: 2,
    name: 'HealthPlus Labs',
    address: '456 Oak Avenue, Greenfield',
  },
  {
    id: 3,
    name: 'Advanced Lab Solutions',
    address: '789 Pine Road, Riverdale',
  },
  {
    id: 4,
    name: 'Medilife Laboratory',
    address: '101 Birch Lane, Hilltown',
  },
];

const LabLists = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Lab Lists</h1>
        
        {/* Lab Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labData.map(lab => (
            <div key={lab.id} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-700">{lab.name}</h2>
              <p className="text-gray-600 mt-2">{lab.address}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabLists;
