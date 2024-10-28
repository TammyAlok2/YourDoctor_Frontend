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
      title: "Update Profile Name - YourLab",
      description: "Change your profile name on YourLab to keep your account personalized and up-to-date.",
      keywords: "YourLab, update profile name, account personalization, profile settings, user profile", // Relevant keywords for SEO
      robots: "index, follow", // Instructions for search engine crawlers
      openGraph: {
          title: "Update Profile Name - YourLab",
          description: "Personalize your account by updating your profile name on YourLab.",
          type: "website",
          url: "https://yourlab.com/profile/updateusername", // URL of the page
          siteName: "YourLab",
      },
  }
}

export default UpdateUserNameData
