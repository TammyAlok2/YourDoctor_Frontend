'use client';
import { useState } from 'react';


export default function Forget() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="font-extrabold text-3xl text-gray-950 font-bold mb-6 text-center">Forget Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 text-black">
            <label className="font-bold mb-2 text-gray-950">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full p-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-teal-600 text-white rounded-lg mb-4">Submit</button>
         
        </form>
      </div>
    </div>
  );
}
