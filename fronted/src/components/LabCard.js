"use client";

const labData = [
  {
    data1: "LAB 1",
  },
  {
    data1: "LAB 1",
  },
  {
    data1: "LAB 1"
  }
];

const LabCard = () => {
  return (
    <div className="relative max-[430px]:top-[3rem] max-[540px]:top-[5rem]">
        <div className="flex gap-[3rem] items-center justify-center my-[8rem] max-[850px]:flex-col">
    {
        labData.map((data, index)=>(
      <div className="w-[20rem] h-[11rem] [box-shadow:0rem_0rem_1rem_0rem_gray] flex items-center justify-center" key={index}>
        <h1>{data.data1}</h1>
      </div>
        ))
    }
        </div>
    </div>
  );
};

export default LabCard;
