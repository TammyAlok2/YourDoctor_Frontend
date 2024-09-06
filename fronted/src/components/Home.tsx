import HomeCard from '@/components/HomePage/HomeCard'
import CardInfo from '@/components/HomePage/CardInfo'
import ProfileData from '@/components/HomePage/ProfileData'
// import LabCard from '@/components/HomePage/LabCard'

const Home = () => {
  return (
    <div>
      <HomeCard  />
      <div className='my-[3rem]'>
      <ProfileData />
      </div>
      <div className='my-[3rem]'>
      <CardInfo />
      </div>
      {/* <LabCard /> */}
    </div>
  )
}

export default Home
