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
      title: "YourLab - Doctor",
      description: "Access comprehensive information about doctors at YourLab. Explore their qualifications, specialties, patient reviews and more details to make informed healthcare decisions."
  }
}

export default DoctorPageData
