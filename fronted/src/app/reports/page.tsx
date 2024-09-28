import React from 'react'

const Reports:React.FC = () => {
  return (
    <div className='flex items-center justify-center h-[22rem] font-bold text-3xl'>
      <h1>Coming soon</h1>
    </div>
  )
}

export function generateMetadata() {
  return {
      title: "YourLab - Reports",
      description: "Access your lab reports securely through YourLab."
  }
}

export default Reports
