import React from 'react'
import ProfileSettings from './Profile'

const Profile = () => {
  return (
    <div>
      <ProfileSettings />
    </div>
  )
}

export function generateMetadata() {
  return {
      title: "YourLab - Profile",
      description: "Access and manage your profile on YourLab. Update your information and check test history."
  }
}

export default Profile
