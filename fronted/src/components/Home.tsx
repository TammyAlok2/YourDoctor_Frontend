"use client";

import HomeCard from "@/components/HomePage/HomeCard";
// import CardInfo from "@/components/HomePage/CardInfo";
import ProfileData from "@/components/HomePage/ProfileData";
import { useState } from "react";
// import LabCard from "./HomePage/LabCard";
import DownloadApp from "./HomePage/DownLoadApp";
import BlogSection from "./HomePage/BlogSection";
import UpperCardData from "./HomePage/UpperCardData";
import Supporters from "./HomePage/Supporter";
import { ReviewPage } from "./HomePage/ReviewPage";
import FaqPage from "./HomePage/FAQ";
import AppointmentProcess from "./HomePage/AppointmentProcess";
import LabLists from "./HomePage/LabLists";
// import Testimonials from "./HomePage/Testimonials";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <DownloadApp />
      <HomeCard setSearchTerm={setSearchTerm} />
      <UpperCardData />
      <div className="my-[3rem]">
        <ProfileData searchTerm={searchTerm} />
      </div>
      {/* <div className="my-[3rem]">
        <CardInfo />
      </div> */}
      <AppointmentProcess />
      <div>
        <BlogSection />
      </div>
      {/* <div>
        <Testimonials />
        </div> */}
      <div>
        <LabLists />
      </div>
      <div>
        <ReviewPage />
      </div>
      <div>
        <Supporters />
      </div>
      <div>
        <FaqPage />
      </div>
      {/* <LabCard /> */}
    </div>
  );
};

export default Home;
