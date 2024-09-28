import React from 'react'
import AppointmentSubmitted from './AppointmentSubmitted'

const AppointmentSubmittedData = () => {
  return (
    <div>
      <AppointmentSubmitted />
    </div>
  )
}

export function generateMetadata(){
  return{
      title: "YourLab - Appointment Submission and Doctor Details",
      description: "Handles the submission of an appointment and the display of a doctor's details."
  }
}

export default AppointmentSubmittedData
