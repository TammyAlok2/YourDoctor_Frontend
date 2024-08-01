'use client';
import Link from 'next/link'

export default function DoctorPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="h-16 "></header> 
      <main className="max-w-4xl mx-auto py-8 px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="bg-white p-6 md:p-8 lg:p-12 rounded-lg shadow-lg mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="text-black space-y-4">
              <p>Specialist:</p>
              <p>Time:</p>
              <p className="flex-1">Address:</p> 
              <p>Fees:</p>
            </div>
            <div className="flex flex-col items-center mt-4 md:mt-0">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
              <div className="text-teal-500">Dr. XYZ</div>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4 text-black">About Doctor</h2> 
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4 text-black">Work Experience</h2> 
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4 text-black">Awards</h2> 
        </section>

        <section className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="bg-white p-4 rounded-lg shadow-lg text-black flex-1 h-36">Review 1</div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-black flex-1 h-36">Review 2</div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-black flex-1 h-36">Review 3</div>
          </div>
        </section>

        <div className="text-center mt-8">
          <button className="bg-teal-500 text-white py-2 px-4 rounded"><Link href={"/doctor/appointment"}>Book Appointment</Link></button>
        </div>
      </main>
    </div>
  );
}
