import React from 'react'
import DoctorPage from './Doctor'

const DoctorPageData = () => {
  return (
    <div>
      <DoctorPage />
    </div>
  )
}

export function generateMetadata() {
  return {
    title: "Doctor - YourLab",
    description: "Access comprehensive information about doctors at YourLab. Explore their qualifications, specialties, patient reviews and more details to make informed healthcare decisions.",
    keywords: "Child Specialist, Medicine, Dentists, cardiologists, dermatologists, orthopedic doctors, pediatricians, family medicine, general practitioners, specialists, mental health professionals, endocrinologists, gynecologists, urologists, gastroenterologists, healthcare providers, YourLab doctors, medical specialists",
    robots: "index, follow",
    openGraph: {
      title: "Doctor - YourLab",
      description: "Access comprehensive information about doctors at YourLab. Explore their qualifications, specialties, patient reviews and more details to make informed healthcare decisions.",
      type: "website",
      siteName: "YourLab",
    },
  }
}

export default DoctorPageData
