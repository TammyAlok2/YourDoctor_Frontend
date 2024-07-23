import { FaAward } from "react-icons/fa6";
import { FaFileMedicalAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

const CardInfo = () => {
  return (
    <div className="relative top-[8rem]">
      <div className="flex items-center justify-center gap-[3rem] h-[34vh] max-[750px]:flex-col">
        <div className="flex gap-[1rem] items-center">
          <div className="bg-[rgba(241,239,219,0.7)] rounded-2xl p-[1.3rem]">
            <FaAward className="text-[rgb(255_135_0_/_87%)] [filter:drop-shadow(.1rem_.2rem_.1rem_gray)] text-[2rem]" />
          </div>
          <div>
            <p className="text-gray-800">In house labs</p>
            <h1 className="font-bold">NABL certified</h1>
          </div>
        </div>
        <div className="flex gap-[1rem] items-center">
          <div className="bg-[rgba(241,239,219,0.7)] rounded-2xl p-[1.3rem]">
            <FaFileMedicalAlt className="text-[rgb(255_135_0_/_87%)] [filter:drop-shadow(.1rem_.2rem_.1rem_gray)] text-[2rem]" />
          </div>
          <div>
            <p className="text-gray-800">60 mins collections</p>
            <h1 className="font-bold">6AM - 10PM</h1>
          </div>
        </div>
        <div className="flex gap-[1rem] items-center">
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
