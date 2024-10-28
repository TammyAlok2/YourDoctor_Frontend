'use client'

import { useState,useEffect } from 'react';
import { Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getAllDoctors } from '@/app/GlobalRedux/slice/DoctorSlice';
import { createReview } from '@/app/GlobalRedux/slice/AuthSlice';
import { AppDispatch } from '@/app/GlobalRedux/store';
import Link from 'next/link';


interface Doctor {
    _id: string;
    avatar:
    {
        secure_url :string;
    };
    fullName: string;
  
  }

const DoctorReview = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [doctor, setDoctor] = useState<Doctor | undefined>(undefined);
  console.log(doctor)

  const params = useParams()
  
  const doctorId = params.id as string;
console.log(doctorId)

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the review

    const data = {
        name : "Alok Tamrakar",
        comment: review,
        rating : rating,
    }

    const response = await dispatch(createReview([doctorId,data]))
    if(response?.payload?.success){
        setRating(0),
        setReview('')

    }
    console.log(response)


    setShowSuccess(true);
  };

  const dispatch = useDispatch<AppDispatch>();

  const fetchDoctorData = async () => {
    try {
      const response = await dispatch(getAllDoctors(null));
      const doctors = response?.payload?.data;

      if (doctors) {
        const foundDoctor = doctors.find((doc: Doctor) => doc._id === doctorId);

        if (foundDoctor) {
          setDoctor(foundDoctor);
        
        }
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };
  useEffect(()=>{
    fetchDoctorData()
  },[])


  return (
    <div className="max-w-3xl mx-auto mt-20 p-4">
      {!showSuccess ? (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className=" text-center mb-6">
            <div className="text-2xl font-medium  text-center align-center m-10 justify-center">
              Write a Review
            </div>
          </div>
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full bg-red-50 mb-6">
              <img
                src={doctor?.avatar?.secure_url}
                alt="Doctor profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            
            <h2 className="text-xl text-center mb-6">
              How was your experience with {doctor?.fullName}?
            </h2>
            
            <div className="flex gap-3 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transform transition-transform hover:scale-110"
                >
                  <Star
                    size={40}
                    className={`${
                      star <= (hoverRating || rating)
                        ? 'fill-red-500 text-red-500'
                        : 'fill-none text-gray-300'
                    } transition-colors duration-200`}
                  />
                </button>
              ))}
            </div>
            
            <form onSubmit={handleSubmit} className="w-full max-w-2xl">
              <div className="mb-6">
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write Your Review"
                  className="w-full p-4 border rounded-lg resize-none min-h-[150px] text-lg"
                />
              </div>
              
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={() => setRating(0)}
                  className="flex-1 py-3 px-6 rounded-lg border text-gray-600 text-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex-1 py-3 px-6 rounded-lg bg-red-500 text-white text-lg hover:bg-red-600 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="w-24 h-24 bg-red-500 rounded-full mx-auto flex items-center justify-center animate-bounce">
              <Star className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h3 className="text-3xl font-medium mb-4">Review Successful!</h3>
          <p className="text-gray-600 mb-8 text-xl">
            Your review has been successfully submitted, thank you very much!
          </p>
          <Link href = '/'>


          
          <button
            onClick={() => setShowSuccess(false)}
            className="w-full max-w-md mx-auto py-4 px-6 rounded-lg bg-red-500 text-white text-xl hover:bg-red-600 transition-colors"
          >
            OK
          </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DoctorReview;