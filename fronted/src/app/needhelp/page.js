'use client';

// components/Form.js
import React, { useState } from 'react';

export default function NeedHelp() {
    const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState({ name: '', mobile: '' });

  const validate = () => {
    let nameError = '';
    let mobileError = '';

    if (name.trim() === '') {
      nameError = 'Name is required';
    }

    if (mobile.trim() === '') {
      mobileError = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobile)) {
      mobileError = 'Mobile number must be 10 digits';
    }

    if (nameError || mobileError) {
      setErrors({ name: nameError, mobile: mobileError });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      // Clear errors and proceed with form submission logic
      setErrors({ name: '', mobile: '' });
      alert('Form submitted successfully');
      // Reset form fields
      setName('');
      setMobile('');
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="mobile" className="block text-gray-700 font-bold mb-2">
              Mobile No.
            </label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.mobile ? 'border-red-500' : ''
              }`}
              placeholder="Enter your mobile number"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
