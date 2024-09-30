import React from 'react'
import Doctors from './Doctors'

const DoctorsData = () => {
  return (
    <div>
      <Doctors />
    </div>
  )
}

export function generateMetadata() {
  return {
    title: "Doctors - YourLab",
    description: "Discover qualified doctors on YourLab. Browse through our comprehensive listings to find healthcare professionals that match your needs. Schedule appointments and view profiles easily.",
    keywords: "cardiologists, Child Specialist, Medicine, Dentists, dermatologists, orthopedic doctors, pediatricians, family medicine, general practitioners, specialists, mental health professionals, endocrinologists, gynecologists, urologists, gastroenterologists, healthcare providers, YourLab doctors, medical specialists",
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
