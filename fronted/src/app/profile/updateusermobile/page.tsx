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
    title: "Update Phone Number - YourLab",
    description: "Update your phone number on YourLab for seamless communication and account security.",
    keywords: "YourLab, update phone number, account security, profile settings, mobile update", // Relevant keywords for SEO
    robots: "index, follow", // Instructions for search engine crawlers
    openGraph: {
      title: "Update Phone Number - YourLab",
      description: "Ensure secure communication by updating your phone number on YourLab.",
      type: "website",
      url: "https://yourlab.com/profile/updateusermobile", // URL of the page
      siteName: "YourLab",
    },
  }
}

export default UpdateUserMobileData
