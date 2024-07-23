import { FaAward } from "react-icons/fa6";
import { FaFileMedicalAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

const CardInfo = () => {
  return (
    <div className="my-[3rem] lg:mx-auto lg:w-[50rem] lg:my-[2rem] xs:w-[20rem] xs:mx-auto md:mx-auto md:w-[50rem] md:my-[0]">
      <div className="flex xs:mx-10 xs:justify-center h-[34vh] xs:flex-col xs:mb-[1rem] lg:h-[7vh]">
        <div className="flex gap-[1rem] items-center xs:mb-[1rem] sm:mr-[1rem] sm:ml-[1rem]">
          <div className="bg-[rgba(241,239,219,0.7)] rounded-2xl p-[1.3rem]">
            <FaAward className="text-[rgb(255_135_0_/_87%)] [filter:drop-shadow(.1rem_.2rem_.1rem_gray)] text-[2rem]" />
          </div>
          <div>
            <p className="text-gray-800">In house labs</p>
            <h1 className="font-bold">NABL certified</h1>
          </div>
        </div>
        <div className="flex gap-[1rem] items-center xs:mb-[1rem] sm:mr-[1rem]">
          <div className="bg-[rgba(241,239,219,0.7)] rounded-2xl p-[1.3rem]">
            <FaFileMedicalAlt className="text-[rgb(255_135_0_/_87%)] [filter:drop-shadow(.1rem_.2rem_.1rem_gray)] text-[2rem]" />
          </div>
          <div>
            <p className="text-gray-800">60 mins collections</p>
            <h1 className="font-bold">6AM - 10PM</h1>
          </div>
        </div>
        <div className="flex gap-[1rem] items-center xs:mb-[1rem] sm:mr-[1rem]">
          <div className="bg-[rgba(241,239,219,0.7)] rounded-2xl p-[1.3rem]">
            <FaClock className="text-[rgb(255,136,0)] [filter:drop-shadow(.1rem_.2rem_.1rem_gray)] text-[2rem]" />
          </div>
          <div>
            <p className="text-gray-800">Reports In</p>
            <h1 className="font-bold">6 hours</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
