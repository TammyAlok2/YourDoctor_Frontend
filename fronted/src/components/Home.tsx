'use client';

import HomeCard from '@/components/HomePage/HomeCard'
import CardInfo from '@/components/HomePage/CardInfo'
import ProfileData from '@/components/HomePage/ProfileData'
import { useState } from 'react';
// import LabCard from '@/components/HomePage/LabCard'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <HomeCard setSearchTerm={setSearchTerm}/>
      <div className='my-[3rem]'>
      <ProfileData searchTerm={searchTerm}/>
      </div>
      <div className='my-[3rem]'>
      <CardInfo />
      </div>
      {/* <LabCard /> */}
    </div>
  )
}

export default Home
