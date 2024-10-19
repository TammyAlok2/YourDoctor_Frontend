'use client'

import Image from 'next/image';
import { FC } from 'react';
import { useEffect, useState } from 'react';

const ScrollUpButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll the page to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Add event listener for scrolling
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 bg-white shadow-xl active:w-[3.5rem] rounded-full hover:shadow-inner transition z-10 ${
        isVisible ? 'block' : 'hidden'
      }`}
    >
      <Image className='drop-shadow-[1px_1px_4px_black]' width="70" height="70" src="https://img.icons8.com/external-others-pike-picture/50/40C057/external-Scroll-Up-scroll-others-pike-picture.png" alt="external-Scroll-Up-scroll-others-pike-picture" objectFit='cover' quality={100} priority={true}/>
    </button>
  );
};

export default ScrollUpButton;
