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
    title: "Profile - YourLab",
    description: "Access and manage your profile on YourLab. Update your information and check test history.",
    keywords: "YourLab, profile, account settings, user profile, test history", // Relevant keywords for SEO
    robots: "index, follow", // Instructions for search engine crawlers
    openGraph: {
      title: "Profile - YourLab",
      description: "Manage your personal profile and medical history at YourLab. Stay updated with your test results.",
      type: "website",
      url: "https://www.yourlab.com/profile", // URL of the page
      siteName: "YourLab",
    },
  }
}

export default Profile
