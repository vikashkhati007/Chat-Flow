import Image from "next/image";
import React from "react";

const NoiseInput = ({
  onChange,
  value,
  placeholder,
  type,
  color,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: React.HTMLInputTypeAttribute;
  placeholder: React.HTMLInputTypeAttribute;
  type: React.HTMLInputTypeAttribute;
  color: string;
}) => {
  return (
    <>
      <div className="overflow-hidden w-[320px] h-[40px] rounded-md relative">
        <div
          className={`bg-gradient-to-r from-${color}-500 via-${color}-600 to-${color}-700 absolute left-0 w-5 h-5 blur-lg z-20 `}
        />
        <input
          placeholder={placeholder}
          className="bg-transparent absolute min-w-full min-h-full z-10 outline-none px-10 text-background text-sm placeholder:text-[#FCFBFB] placeholder:text-opacity-45 placeholder:tracking-wide"
          onChange={onChange}
          value={value}
          type={type}
        />
        <Image
          className="opacity-15"
          src={"/noise.svg"}
          width={500}
          height={500}
          alt="noise"
        />
      </div>
    </>
  );
};

export default NoiseInput;
