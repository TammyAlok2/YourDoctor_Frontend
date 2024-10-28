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
      title: "Update Profile Picture - YourLab",
      description: "Update your profile picture on YourLab to personalize your account.",
      keywords: "YourLab, profile picture, update image, account settings, user profile", // Relevant keywords for SEO
      robots: "index, follow", // Instructions for search engine crawlers
      openGraph: {
          title: "Update Profile Picture - YourLab",
          description: "Personalize your account by updating your profile picture on YourLab. Easy and secure process.",
          type: "website",
          url: "https://yourlab.com/profile/updateuserimage", // URL of the page
          siteName: "YourLab",
      },
  }
}

export default UpdateUserImageData
