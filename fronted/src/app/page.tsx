"use client"
import React from 'react'
import HomeCard from '@/components/HomeCard'
import CardInfo from '@/components/CardInfo'
import ProfileData from '@/components/ProfileData'
import LabCard from '@/components/LabCard'

const page = () => {
  return (
    <div>
      <HomeCard  />
      <ProfileData />
      <CardInfo />
      <LabCard />
    </div>
  )
}

export default page
