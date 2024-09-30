import React from 'react'
import Reset from './Reset'

// Define the type for the params object
interface Params {
  params: {
    resetToken: string;
  };
}

const ResetPageData = () => {
  return (
    <div>
      <Reset />
    </div>
  )
}

export function generateMetadata({ params }: Params) {
  const { resetToken } = params;
  return {
    title: `Reset Password - Token: ${resetToken} | YourLab`,
    description: `Reset your password securely with the token: ${resetToken}. Create a new password for your account.`,
    keywords: "reset password, change password, YourLab",
    robots: "index, follow",
    openGraph: {
      title: `Reset Password - Token: ${resetToken} | YourLab`,
      description: `Reset your password securely with the token: ${resetToken}. Create a new password for your account.`,
      type: "website",
      siteName: "YourLab",
    },
  }
}

export default ResetPageData
