import React from 'react'
import UpdateUserName from './UpdateUserName'

const UpdateUserNameData = () => {
  return (
    <div>
      <UpdateUserName />
    </div>
  )
}

export function generateMetadata() {
  return {
      title: "YourLab - Profile | Update Profile Name",
      description: "Change your profile name on YourLab to keep your account personalized and up-to-date."
  }
}

export default UpdateUserNameData
