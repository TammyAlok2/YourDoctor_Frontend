import HomeCard from '@/components/HomePage/HomeCard'
import CardInfo from '@/components/HomePage/CardInfo'
import ProfileData from '@/components/HomePage/ProfileData'
import LabCard from '@/components/HomePage/LabCard'

const Home = () => {
  return (
    <div>
      <HomeCard  />
      <ProfileData />
      <CardInfo />
      <LabCard />
    </div>
  )
}

export default Home
