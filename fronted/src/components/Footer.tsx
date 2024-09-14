'use client';

import Image from 'next/image';
import Link from 'next/link';

const Footer:React.FC = () => {
    return (
      <footer className="bg-gradient-to-b from-teal-500 to-teal-700 text-white py-10 px-[3rem]">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-[1.5rem]">Company</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><Link href="#" className="text-[1.2rem] hover:underline">About Us</Link></li>
              <li><Link href="#" className="text-[1.2rem] hover:underline">Careers</Link></li>
              <li><Link href="#" className="text-[1.2rem] hover:underline">Blog</Link></li>
              <li><Link href="#" className="text-[1.2rem] hover:underline">Partner with Yourlab</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[1.5rem]">Support</h3>
            <ul className="list-disc list-inside space-y-2">
              <li className='list-block'><Link href="#" className="text-[1.2rem] hover:underline">Account</Link></li>
              <li><Link href="#" className="text-[1.2rem] hover:underline">Legal</Link></li>
              <li><Link href="#" className="text-[1.2rem] hover:underline">Contact</Link></li>
              <li><Link href="#" className="text-[1.2rem] hover:underline">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-[1.2rem] hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[1.5rem]">Follow us on</h3>
            <div className='flex gap-3 items-center'>
            <Link href="https://www.instagram.com/yourlab_in/">
            <Image width="33" height="33" src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="instagram-new--v1" className="hover:brightness-[0.7] active:w-[2rem]"/>
            </Link>
            <Link href="https://www.youtube.com/@YourLab-v4f" target="_blank" rel="noopener noreferrer">
            <Image width="35" height="35" src="https://img.icons8.com/color/48/youtube-play.png" alt="youtube-play" className="hover:brightness-[0.7] active:w-[2rem]"/>
            </Link>
            <Link href="https://www.linkedin.com/company/yourlab-in/">
            <Image width="33" height="33" src="https://img.icons8.com/color/48/linkedin.png" alt="linkedin" className="hover:brightness-[0.7] active:w-[2rem]"/>
            </Link>
            {/* Add social media links here */}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 opacity-50"></div>
      </footer>
    );
  };
  
  export default Footer;
  