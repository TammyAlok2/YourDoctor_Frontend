import React from 'react'
import UpdateUserMobile from './UpdateUserMobile'

const UpdateUserMobileData = () => {
  return (
    <div>
      <UpdateUserMobile />
    </div>
  )
}

export function generateMetadata() {
  return {
      title: "YourLab - Profile | Update Phone Number",
      description: "Update your phone number on YourLab for seamless communication and account security."
  }
}

export default UpdateUserMobileData
