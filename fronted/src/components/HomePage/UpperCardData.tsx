import layout from '@/app/layout';
import Image from 'next/image';
const UpperCardData = () => {
    const services = [
        {
            id: 1,
            label: 'Book Appointment',
            image: '/uppercardimg1.png', // Add relevant image path
        },
        {
            id: 2,
            label: 'Consult a Specialist',
            image: '/uppercardimg2.png',
        },
        {
            id: 3,
            label: 'Health Packages',
            image: '/uppercardimg3.png',
        },
        {
            id: 4,
            label: 'Mental Health Support',
            image: '/uppercardimg4.png',
        },
        {
            id: 5,
            label: 'Wellness Plans',
            image: '/uppercardimg5.png',
        },
    ];

    return (
        <div className="flex flex-wrap justify-center items-center mt-12 space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-10 w-[90%] md:w-[80%] lg:w-[73%] mx-auto mb-6">
            {services.map((service) => (
                <div key={service.id} className="flex flex-col items-center mb-6 w-[45%] sm:w-[30%] md:w-[20%] lg:w-[15%]">
                    <div className="relative w-[8rem] h-[6rem] md:w-[10rem] md:h-[7rem]">
                        <Image
                            src={service.image}
                            alt={service.label}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <p className="mt-4 text-base sm:text-lg font-semibold text-gray-700 text-center">{service.label}</p>
                </div>
            ))}
        </div>
    );
};

export default UpperCardData;
