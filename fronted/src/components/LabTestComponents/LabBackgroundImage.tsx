import Image from "next/image";

const LabBackgroundImage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[73%] h-[24rem] xs:h-[12rem] xs:w-[92%] relative">
        <Image
          src="https://slidesbase.com/wp-content/uploads/2015/11/medical-doctor-hospital-nurse-healthcare-powerpoint-ppt-template-presentation-Slide1-1.jpg"
          alt="cardImage"
          className="rounded-2xl object-cover h-[10rem]"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
    </div>
  );
};

export default LabBackgroundImage;
