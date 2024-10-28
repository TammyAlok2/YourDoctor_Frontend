import React from 'react'
import Reset from './UpdatePassword';

const UpdatePasswordData = () => {
  return (
    <div>
      <Reset />
    </div>
  )
}

export function generateMetadata() {

  return {
    title: "Update Password - YourLab",
    description: "Reset your YourLab account password securely. Follow the steps to recover access to your account with ease.",

    keywords: [
      "forgot password",
      "password reset",
      "recover account",
      "account recovery",
      "YourLab password reset",
      "reset password securely",
      "forgot YourLab password",
      "YourLab account recovery"
    ].join(", "),

    robots: "index, follow",
    openGraph: {
      title: "Update Password - YourLab",
      description: "Easily reset your YourLab password and regain access to your account with secure steps.",
      type: "website",
      url: "https://www.yourlab.com/updatepassword", // URL of the page
      siteName: "YourLab",
    },
  };
}


export default UpdatePasswordData
