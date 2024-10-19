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
        <div className="flex justify-between items-center mt-[3.1rem] space-x-4 w-[73%] mx-auto mb-6">
            {services.map((service) => (
                <div key={service.id} className="flex flex-col items-center">
                    <div className="relative w-[10rem] h-[7rem]">
                        <Image
                            src={service.image}
                            alt={service.label}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-gray-700">{service.label}</p>
                </div>
            ))}
        </div>
    );
};

export default UpperCardData;
