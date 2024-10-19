import Image from 'next/image';
import React, { useState } from 'react';

type FAQ = {
    question: string;
    answer: string;
};

const faqData: FAQ[] = [
    {
        question: "How often should I schedule a general health checkup?",
        answer: "It is recommended to have a general health checkup at least once a year to monitor your overall health and catch any potential issues early."
    },
    {
        question: "What should I expect during my first consultation?",
        answer: "During your first consultation, the doctor will review your medical history, perform a basic physical exam, and discuss any concerns or symptoms you may have. Based on this, further tests or treatments may be recommended."
    },
    {
        question: "Do I need to fast before my blood test?",
        answer: "Some blood tests, such as glucose or cholesterol tests, require fasting for 8-12 hours. Your doctor will inform you in advance if fasting is needed for your test."
    },
    {
        question: "How can I manage my chronic condition effectively?",
        answer: "Managing chronic conditions involves regular monitoring, following your doctor’s treatment plan, taking prescribed medications, maintaining a healthy lifestyle, and scheduling follow-up visits to ensure your condition is under control."
    },
    {
        question: "What services do you offer for preventative care?",
        answer: "We offer a wide range of preventative care services, including vaccinations, health screenings, lifestyle counseling, and routine checkups to help you stay healthy and prevent diseases."
    }
];

const FaqPage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className='relative bg-[rgb(251_251_251)]'>
        <h1 className='text-4xl text-center font-bold text-[#00224f] mb-3 pt-8'>FREQUENTLY ASKED QUESTION</h1>
        <p className='text-center text-[0.8rem] font-bold'>Have any question?</p>
            <div className="w-full max-w-3xl mx-auto p-6 relative">
                {faqData.map((faq, index) => (
                    <div key={index} className="mb-4">
                        <button
                            className="w-full flex justify-between items-center bg-white border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none transition-all"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className="text-lg font-medium">{faq.question}</span>
                            <span
                                className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : 'rotate-0'
                                    }`}
                            >
                                ▼
                            </span>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-500 ${activeIndex === index ? 'max-h-40' : 'max-h-0'
                                }`}
                        >
                            <p className="p-4 text-gray-600 w-full flex justify-between items-center bg-white mt-3 border border-gray-200 rounded-lg shadow-md hover:shadow-lg focus:outline-none transition-all">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FaqPage;
