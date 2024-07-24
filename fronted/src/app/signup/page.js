'use client'
import { useState } from 'react';
import Link from 'next/link'; 

export default function signup() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="font-extrabold text-3xl text-gray-950 font-bold mb-4 text-center">Create an Account</h1>
        <form>
          <div className="mb-6 text-black">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full p-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 text-black">
            <input
              type="tel"
              placeholder="Enter Your Phone Number"
              className="w-full p-2 border rounded-lg"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-6 relative text-black">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Your Password"
              className="w-full p-2 border rounded-lg pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 mt-1"
            >
              <img
                src={showPassword ? "/eye-open-icon.png" : "/eye-closed-icon.png"}
                alt="Toggle Password Visibility"
                width="20"
                height="20"
              />
            </button>
          </div>
          <button className="w-full p-2 bg-teal-600 text-white rounded-lg mb-9">Sign up</button>
          <div className="text-center text-gray-500 mb-6">
            _____________or With_____________
          </div>
          <button className="w-full p-2 bg-white text-gray-500 border rounded-lg flex items-center justify-center mb-8">

            
            
              <img src="/google-logo.png" alt="Google Logo" width="20" height="20" className="mr-2" />
            
            <span className="mx-auto">Sign up with Google</span>
          </button>
          <div className="text-center">
            <span className="text-black">Already have an account? </span>
              <Link href="/" className="text-blue-800">Log In</Link>
               </div>
        </form>
      </div>
    </div>
  );
}
