'use client'
import { useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="font-extrabold text-3xl text-gray-950 font-bold mb-4 text-center">Hi, Welcome Back! 👋</h1>
        <form>
          <div className="mb-4">
            <label className="font-bold mb-2 text-gray-950">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full p-2 border rounded-lg text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <label className="font-bold mb-2 text-gray-950">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Your Password"
              className="w-full p-2 border rounded-lg pr-10 text-black"  
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 mt-3"
            >
              <img 
                src={showPassword ? "/eye-open-icon.png" : "/eye-closed-icon.png"} 
               
                width="20" 
                height="20" 
              />
            </button>
          </div>
          <div className="flex justify-end mb-4">
            <a href="/forget" className="text-red-600 text-sm">Forgot Password?</a>
          </div>
          <button className="w-full p-2 bg-teal-600 text-white rounded-lg mb-6">Login</button>
          <div className="text-center text-gray-500 mb-6">
            _____________or With_____________
          </div>
          <button className="w-full p-2 bg-white text-gray-500 border rounded-lg flex items-center justify-center mb-6 relative">
            <img src="/google-logo.png" alt="Google Logo" className="mr-4" width="20" height="20" />
            Login with Google
          </button>
          <div className="text-center">
                        <Link href={"/signup"}className="text-black">Don’t have an account? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
