// components/AutoSlider.js
import { useRef } from 'react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

// Initialize Swiper modules
SwiperCore.use([Autoplay, Navigation]);

const AutoSlider = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="w-full mx-auto p-8 border border-gray-300 relative">
      <Swiper
        ref={swiperRef}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{ prevEl: '.prev-btn', nextEl: '.next-btn' }}
      >
        <SwiperSlide><div className="p-4 bg-gray-200">Slide 1</div></SwiperSlide>
        <SwiperSlide><div className="p-4 bg-gray-200">Slide 2</div></SwiperSlide>
        <SwiperSlide><div className="p-4 bg-gray-200">Slide 3</div></SwiperSlide>
      </Swiper>

      <button
        onClick={handlePrev}
        className="prev-btn absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        className="next-btn absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default AutoSlider;
