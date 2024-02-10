import Image from "next/image";
import React from "react";

const NoiseInput = ({
  onChange,
  value,
  placeholder,
  type,
  name,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: React.HTMLInputTypeAttribute;
  placeholder: React.HTMLInputTypeAttribute;
  type: React.HTMLInputTypeAttribute;
  name: React.HTMLInputTypeAttribute;
}) => {
  return (
    <>
      <div className="overflow-hidden w-[320px] h-[40px] rounded-md relative">
        <input
          placeholder={placeholder}
          className="bg-transparent absolute min-w-full min-h-full z-10 outline-none px-10 text-background text-sm placeholder:text-[#FCFBFB] placeholder:text-opacity-45 placeholder:tracking-wide"
          onChange={onChange}
          value={value}
          type={type}
          name={name}
          autoComplete="off"
          autoCorrect="off"
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
