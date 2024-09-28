import React from 'react'
import DoctorPayment from './DoctorPayment'

const DoctorPaymentData = () => {
  return (
    <div>
      <DoctorPayment />
    </div>
  )
}


export function generateMetadata(){
  return{
      title: "YourLab - Doctor Payment",
      description: "Pay your doctor's appointment fee securely. Get real-time updates on fees and discounts, including special offers on emergency and first-time visit fees."
  }
}


export default DoctorPaymentData
