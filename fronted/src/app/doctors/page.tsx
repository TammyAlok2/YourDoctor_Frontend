import React from 'react'
import Doctors from './Doctors'

const DoctorsData = () => {
  return (
    <div>
      <Doctors />
    </div>
  )
}

export async function generateMetadata() {
  const res = await fetch("http://localhost:5000/api/v1/doctor/allDoctors");
  const result = await res.json();
  const dynamicData = result?.data.map((data:any)=>{
    const {specialist} = data;
    return `${specialist}`;
  })
  // console.log(dynamicData)
  return {
    title: "Doctors - YourLab",
    description: "Discover qualified doctors on YourLab. Browse through our comprehensive listings to find healthcare professionals that match your needs. Schedule appointments and view profiles easily.",
    keywords: `${dynamicData}`,
    robots: "index, follow", // Ensures the page is indexed and links are followed by search engines
    openGraph: {
      title: "Doctors - YourLab",
      description: "Search through YourLab's comprehensive database to find doctors and healthcare specialists. Book your appointment online with ease.",
      type: "website",
      url: "https://www.yourlab.com/doctors",
    },
  }
}

export default DoctorsData
