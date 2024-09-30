import React from 'react'
import AppointmentSubmitted from './AppointmentSubmitted'

const AppointmentSubmittedData = () => {
  return (
    <div>
      <AppointmentSubmitted />
    </div>
  )
}

export function generateMetadata() {
  return {
    title: "Appointment Submission - YourLab",
    description: "Handles the submission of an appointment and the display of a doctor's details.",
    keywords: "appointment, book doctor, Child Specialist, Medicine, Dentists, cardiologists, dermatologists, orthopedic doctors, pediatricians, family medicine, general practitioners, specialists, mental health professionals, endocrinologists, gynecologists, urologists, gastroenterologists, healthcare providers, YourLab doctors, medical specialists, medical consultation",
    robots: "index, follow",
    openGraph: {
      title: "Appointment Submission and Doctor Details - YourLab",
      description: "Handles the submission of an appointment and the display of a doctor's details.",
      type: "website",
      siteName: "YourLab Medical",
    },
  }
}

export default AppointmentSubmittedData
