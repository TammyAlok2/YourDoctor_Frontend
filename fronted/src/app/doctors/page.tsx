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
      title: "YourLab - Doctors",
      description: "Discover qualified doctors on YourLab. Browse through our comprehensive listings to find healthcare professionals that match your needs. Schedule appointments and view profiles easily."
  }
}

export default DoctorsData
