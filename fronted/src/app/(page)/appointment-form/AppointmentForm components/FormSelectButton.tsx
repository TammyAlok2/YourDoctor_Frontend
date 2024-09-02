"use client";

import Image from "next/image";
import { useState } from "react";

interface FormSelectButtonProps {
  first: string;
  second: string;
  onSelect: (value: string) => void; // Add this line
}

const FormSelectedButton: React.FC<FormSelectButtonProps> = ({
  first,
  second,
  onSelect, // Add this line
}) => {
  const [selectval, setSelectVal] = useState<string>("SELECT");
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleicon, setToggleIcon] = useState<string>(
    "https://img.icons8.com/windows/32/circled-chevron-down.png"
  );

  const handleToggle = () => {
    setToggle((prev) => !prev);
    setToggleIcon(
      toggle === false
        ? "https://img.icons8.com/ios/50/circled-chevron-up.png"
        : "https://img.icons8.com/windows/32/circled-chevron-down.png"
    );
  };

  const handleSelect = (value: string) => {
    setSelectVal(value);
    setToggle(false);
    onSelect(value); // Call the callback function with the selected value
  };

  return (
    <div>
      <div
        onClick={handleToggle}
        className="cursor-pointer flex gap-[0.5rem] border-[0.1rem] border-black rounded-lg p-[0.1rem]"
      >
        <h1>{selectval}</h1>
        <Image width={22} height={20} src={toggleicon} alt="Toggle Icon" />
      </div>
      {toggle && (
        <div className="cursor-pointer absolute border-[0.1rem] border-black rounded-lg mt-[0.3rem] transition-[3s]">
          <div
            onClick={() => handleSelect(first)}
            className="p-[0.2rem] m-0 box-content rounded-lg hover:bg-[#a56a72]"
          >
            {first}
          </div>
          <div
            onClick={() => handleSelect(second)}
            className="p-[0.2rem] m-0 box-content rounded-lg hover:bg-[#54d6bc]"
          >
            {second}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSelectedButton;
