'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BsArrowRight } from "react-icons/bs";
import AOS from "aos";
import { title } from 'process';
import { date } from 'yup';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  category: string;
  userName: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Checkups for Better Health',
    description: 'Regular checkups help in early detection of illnesses and ensure timely treatment.',
    imageUrl: '/blogimg1.png',
    date: 'July 22, 2021',
    category: 'Health',
    userName: 'John Doe', // Added user name
  },
  {
    id: 2,
    title: 'How to Maintain a Healthy Lifestyle',
    description: 'Maintaining a healthy lifestyle can prevent chronic diseases and promote longevity.',
    imageUrl: '/blogimg2.png',
    date: 'August 14, 2022',
    category: 'Lifestyle',
    userName: 'Jane Smith', // Added user name
  },
  {
    id: 3,
    title: 'Understanding Mental Health',
    description: 'Mental health is just as important as physical health. Learn how to take care of it.',
    imageUrl: '/blogimg3.png',
    date: 'September 7, 2023',
    category: 'Mental Health',
    userName: 'Michael Johnson', // Added user name
  },
  {
    id: 4,
    title: 'Benefits of a Balanced Diet',
    description: 'A balanced diet provides essential nutrients that help the body function effectively.',
    imageUrl: '/blogimg4.png',
    date: 'June 18, 2021',
    category: 'Nutrition',
    userName: 'Emily Davis', // Added user name
  },
  {
    id: 5,
    title: 'Managing Stress for Better Health',
    description: 'Effective stress management techniques can improve both mental and physical well-being.',
    imageUrl: '/blogimg5.png',
    date: 'May 9, 2022',
    category: 'Stress Management',
    userName: 'Robert Miller', // Added user name
  },
  {
    id: 6,
    title: 'The Role of Sleep in Health',
    description: 'Proper sleep is essential for recovery, mood regulation, and overall health.',
    imageUrl: '/blogimg6.png',
    date: 'March 12, 2023',
    category: 'Sleep Health',
    userName: 'Laura Wilson', // Added user name
  },
];


const categoryColors: Record<string, string> = {
  'Health': 'bg-[#FE5948]',
  'Lifestyle': 'bg-[#39cabb]',
  'Mental Health': 'bg-[#ffcc00]',
  'Nutrition': 'bg-[#8a2be2]',
  'Stress Management': 'bg-[#20b2aa]',
  'Sleep Health': 'bg-[#ff6347]',
};


const BlogSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState<number | null | string>(null);

  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 2000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <div className="w-[80%] mx-auto p-8">
      <h4 className='text-[rgb(125,125,125)] text-center mb-2 font-bold'>News & Article</h4>
      <h2 className="text-4xl text-center mb-8 text-[#00224f] font-bold">Stay Update With <span className='text-[rgb(17_164_160_/_99%)]'>YOURLab</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div className='shadow-lg rounded-lg overflow-hidden' onMouseEnter={() => setIsButtonHovered(post.id)}
            onMouseLeave={() => setIsButtonHovered(null)}>
            <div
              key={post.id}
              className="relative bg-white border overflow-hidden group"
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Section */}
              <Image
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 -z-10"
                width={200} // Set appropriate width
                height={200} // Set appropriate height
                quality={100} // Enhance quality
                priority={true} // Preload image if it's above the fold
              />
              <span
                className={`absolute z-10 mt-[-4.7rem] text-white left-3 bottom-3 py-[.2rem] px-[.8rem] rounded-md ${categoryColors[post.category]}`}
              >
                {post.category}
              </span>
              {/* Sliding "Hello" Page */}
              <div
                className={`absolute inset-0 bg-[#45c0b6] bg-opacity-50 flex items-center justify-center text-white text-2xl font-bold transition-all duration-500 transform ${hoveredCard === post.id
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-full opacity-0'
                  }`}
              >
                Hello
              </div>

            </div>
            {/* Blog Title and Description */}
            <div className="p-4 flex flex-col gap-[.7rem]">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <div className='flex justify-between items-center border-b-[.1rem] border-gray-200 mb-1 pb-4'>
                <div className='flex items-center justify-center gap-2 text-[#2d2929]'>
                  <Image width={30} height={30} src='/randomuserimg.png' alt='user-image' className='rounded-full' />
                  <p className="text-sm text-gray-500 mb-2">{post.userName}</p>
                </div>
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              </div>
              <p className="text-gray-600 text-[0.9rem]">{post.description}</p>
            </div>

            <div className={`transition-all duration-500 ease-in-out transform ${isButtonHovered === post.id ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} flex items-center mb-[1rem] opacity-100`}>
              {isButtonHovered === post.id ? (
                <div className='flex items-center mb-[1rem] ml-[1rem]'>
                  <button className='py-[0.5rem] px-[1rem] font-bold rounded-full border-[0.1rem] border-gray-300 relative flex items-center justify-center hover-animation overflow-hidden hover:text-white'><span className='w-[0rem] h-[0rem] bg-[#3ad0c4] rounded-full absolute -z-10 transition-all duration-500 ease-in-out'></span>More details</button>
                </div>
              ) : (
                <div className='flex items-center justify-center mb-[1rem] mx-auto'>
                  <button className='py-[.7rem] px-[.7rem] font-bold rounded-full relative flex items-center justify-center hover-animation overflow-hidden bg-[#39cabb20] hover:text-white'><BsArrowRight className='text-[1.2rem] text-[#39cabb]' /></button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;