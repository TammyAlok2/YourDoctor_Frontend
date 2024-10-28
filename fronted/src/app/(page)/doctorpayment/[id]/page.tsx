import React from 'react'
import DoctorPayment from './DoctorPayment'

const DoctorPaymentData = () => {
  return (
    <div>
      <DoctorPayment />
    </div>
  )
}


export function generateMetadata() {
  const keywords = [
    "doctor payment",
    "pay doctor's fees",
    "medical fees payment",
    "secure doctor payment",
    "appointment payment online",
    "doctor fee discounts",
    "emergency fee payment",
    "first-time visit fee",
    "online doctor payment",
    "YourLab doctor payment",
    "YourLab medical payments"
  ].join(", ");
  return {
    title: "Doctor Payment - YourLab",
    description: "Pay your doctor's appointment fee securely. Get real-time updates on fees and discounts, including special offers on emergency and first-time visit fees.",
    keywords,
    robots: "index, follow",
    openGraph: {
      title: "Doctor Payment - YourLab",
      description: "Pay your doctor's appointment fee securely. Get real-time updates on fees and discounts, including special offers on emergency and first-time visit fees.",
      type: "website",
      siteName: "YourLab",
    },
  }
}


export default DoctorPaymentData
