import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Settings:React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="p-4 flex flex-col gap-3">
        <Link href={"/profile"}><h1 className="block w-full mt-6 p-3 text-center pr-5 bg-gradient-to-r from-[#0CEDE6] text-white rounded-xl to-[#0A8E8A]">Settings</h1></Link>
          <Link href="settings/manage-patient" className="relative flex w-full p-3 pl-[3rem] pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500">
              Manage Patient
              <Image width="30" height="30" className='absolute right-2 bottom-[0.7rem]' src="https://img.icons8.com/ios-glyphs/30/chevron-right.png" alt="chevron-right"/>
          </Link>
          <Link href="/updatepassword" className="relative flex w-full p-3 pl-[3rem] pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500">
            Change password
            <Image width="30" height="30" className='absolute right-2 bottom-[0.7rem]' src="https://img.icons8.com/ios-glyphs/30/chevron-right.png" alt="chevron-right"/>
          </Link>
          <a className="relative flex w-full p-3 pl-[3rem] pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500">
            Notification setting
            <Image width="30" height="30" className='absolute right-2 bottom-[0.7rem]' src="https://img.icons8.com/ios-glyphs/30/chevron-right.png" alt="chevron-right"/>
          </a>
          <Link href="settings/patient-history" className="relative flex w-full p-3 pl-[3rem] pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500">
            Patient History
            <Image width="30" height="30" className='absolute right-2 bottom-[0.7rem]' src="https://img.icons8.com/ios-glyphs/30/chevron-right.png" alt="chevron-right"/>
          </Link>
          <a className="relative flex w-full p-3 pl-[3rem] pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500">
            Legal
            <Image width="30" height="30" className='absolute right-2 bottom-[0.7rem]' src="https://img.icons8.com/ios-glyphs/30/chevron-right.png" alt="chevron-right"/>
          </a>
          <a className="relative flex w-full p-3 pl-[3rem] pr-10 text-gray-700 border rounded-xl focus:outline-none border-teal-500">
            Feedback
            <Image width="30" height="30" className='absolute right-2 bottom-[0.7rem]' src="https://img.icons8.com/ios-glyphs/30/chevron-right.png" alt="chevron-right"/>
          </a>
        </div>
      </div>
    </div>
  );
}

export function generateMetadata() {
  return {
      title: "YourLab - Profile Setting",
      description: "Manage your profile settings on YourLab effortlessly. Update your personal information, privacy preferences, and account security settings to enhance your experience."
  }
}

export default Settings;