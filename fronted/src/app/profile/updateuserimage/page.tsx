import React from 'react'
import UpdateUserImage from './UpdateUserImage'

const UpdateUserImageData = () => {
  return (
    <div>
      <UpdateUserImage />
    </div>
  )
}

export function generateMetadata() {
  return {
      title: "YourLab - Profile | Update Profile Picture",
      description: "Update your profile picture on YourLab to personalize your account."
  }
}

export default UpdateUserImageData
