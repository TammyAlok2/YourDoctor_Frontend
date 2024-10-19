'use client';

import Image from 'next/image';
import { FC, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

const Supporters: FC = () => {
    const services = [
        {
            id: 1,
            upperimage:'/supporterhoverimg1.png',
            icon: '/supporterimg1.png',
            title: 'Appointment With',
            subtitle: 'Nearest Clinic',
            highlight: 'Nearest Clinic',
            lowerimage:'/supporterhoverimg2.png',
        },
        {
            id: 2,
            upperimage:'/supporterhoverimg3.png',
            icon: '/supporterimg2.png',
            title: 'Live Chat With',
            subtitle: 'Doctor',
            highlight: 'Doctor',
            lowerimage:'/supporterhoverimg4.png',
        },
        {
            id: 3,
            upperimage:'/supporterhoverimg5.png',
            icon: '/supporterimg3.png',
            title: 'Appointment With',
            subtitle: 'Top Departments',
            highlight: 'Departments',
            lowerimage:'/supporterhoverimg6.png',
        },
        {
            id: 4,
            upperimage:'/supporterhoverimg7.png',
            icon: '/supporterimg4.png',
            title: '24/7 Active Support',
            subtitle: 'Help Support',
            highlight: 'Help Support',
            lowerimage:'/supporterhoverimg8.png',
        },
    ];

    const [isButtonHovered, setIsButtonHovered] = useState<number | null>(null);
    const [buttonHoverDirect, setButtonHoverDirect] = useState<number | null>(null); // Track direct button hover

    return (
        <div className="container mx-auto py-12 px-6 gap-[1.5rem] flex justify-center">
            {services.map((service) => (
                <div
                    key={service.id}
                    onMouseEnter={() => setIsButtonHovered(service.id)}
                    onMouseLeave={() => setIsButtonHovered(null)}
                    className='w-[15%] shadow-lg relative'
                >
                    <div
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isButtonHovered === service.id ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {isButtonHovered === service.id && <Image width="150" height="150" src={service.upperimage} alt="hovereffect" priority={true} className={`absolute left-0 top-0 transition-all duration-500 ease-in-out hover:scale-205`} />}
                    </div>
                    <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center overflow-hidden">
                        <img src={service.icon} alt={service.title} className="w-16 h-16 mb-4" />
                        <p className="text-xs text-gray-500">{service.title}</p>
                        <h3 className="text-lg font-bold">{service.highlight}</h3>

                        {/* Button */}
                        <div
                            className={`transition-all duration-500 ease-in-out transform z-10 ${isButtonHovered === service.id
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-3 opacity-0'
                                } flex items-center opacity-100`}
                        >
                            {isButtonHovered === service.id ? (
                                <div className="flex items-center justify-center">
                                    <button
                                        className={`py-[0.5rem] mt-3 px-[0.7rem] text-[0.9rem] font-semibold rounded-full border-[0.1rem] border-gray-300 relative flex items-center justify-center overflow-hidden transition-all hover-animation hover:text-white`}
                                        onMouseEnter={() => setButtonHoverDirect(service.id)}
                                        onMouseLeave={() => setButtonHoverDirect(null)}
                                        style={{ transitionDelay: buttonHoverDirect === null ? '0.1s' : '0s' }}
                                    >
                                        {
                                            buttonHoverDirect === service.id
                                                ? (<span className='w-[0rem] h-[0rem] text-white text-[0.9rem] rounded-full absolute -z-10 transition-all duration-1000 ease-in-out'></span>) // If hovering directly over button
                                                : (<span className='w-[0rem] h-[0rem] bg-[#39CABB] text-white text-[0.9rem] rounded-full absolute -z-10 transition-all duration-1000 ease-in-out'></span>) // Background black after 0.1 seconds
                                        }
                                        <span className='w-[0rem] h-[0rem] bg-[#39CABB] text-white rounded-full absolute -z-10 transition-all duration-1000 ease-in-out'></span>
                                        More details
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center mx-auto">
                                    <button className="py-[.7rem] px-[.7rem] font-bold rounded-full relative flex items-center justify-center overflow-hidden bg-[#39cabb20] hover:black">
                                        <BsArrowRight className="text-[1.2rem] text-[#39cabb]" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='relative h-[1.5rem]'>
                    {isButtonHovered === service.id && <Image width="150" height="150" src={service.lowerimage} alt="hovereffect" priority={true} className='absolute right-0 bottom-0 transition-transform duration-300 hover:scale-205' />}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Supporters;
