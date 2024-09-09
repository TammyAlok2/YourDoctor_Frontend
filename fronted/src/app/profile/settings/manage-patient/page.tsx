import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ManagePatient:React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md">
        <div className="p-4 flex flex-col gap-3">
        <Link href={"/profile/settings"}><h1 className="block w-full mt-6 p-3 text-center pr-5 bg-gradient-to-r from-[#0CEDE6] text-white rounded-xl to-[#0A8E8A]">Manage Patient</h1></Link>
          <a className="relative w-full p-3 pl-[3rem] pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500 flex">
            Patient 01
            <Image width="30" height="30" className='absolute right-2 bottom-[0.7rem]' src="https://img.icons8.com/ios-glyphs/30/chevron-right.png" alt="chevron-right"/>
          </a>
          <a className="flex relative w-full p-3 pl-[3rem] pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500">
            Patient 02
            <Image width="30" height="30" className='absolute right-2 bottom-[0.7rem]' src="https://img.icons8.com/ios-glyphs/30/chevron-right.png" alt="chevron-right"/>
          </a>
          <a className="flex relative w-full p-3 pl-[3rem] pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500">
            Patient 03
            <Image width="30" height="30" className='absolute right-2 bottom-[0.7rem]' src="https://img.icons8.com/ios-glyphs/30/chevron-right.png" alt="chevron-right"/>
          </a>
          <a className="flex relative w-full p-3 pl-[3rem] pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500">
            Patient 04
            <Image width="30" height="30" className='absolute right-2 bottom-[0.7rem]' src="https://img.icons8.com/ios-glyphs/30/chevron-right.png" alt="chevron-right"/>
          </a>
        </div>
        <div className="p-4 text-center">
          <Link href="/" className="bg-teal-500 text-white py-2 px-4 rounded">
              BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ManagePatient;