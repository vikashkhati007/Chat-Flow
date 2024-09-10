import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const NoiseInput = ({
  onChange,
  value,
  placeholder,
  type,
  name,
  val,
  className,
}: {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: unknown;
  placeholder: React.HTMLInputTypeAttribute;
  type?: React.HTMLInputTypeAttribute;
  name?: React.HTMLInputTypeAttribute;
  val?: any;
  className?: React.HTMLInputTypeAttribute;
}) => {
  return (
    <>
      <div className="overflow-hidden w-[320px] h-[40px] rounded-md relative">
        <input
          defaultValue=""
          {...val}
          placeholder={placeholder}
          className={cn(
            `bg-transparent absolute min-w-full min-h-full z-10 outline-none px-10 text-background text-sm placeholder:text-[#FCFBFB] placeholder:text-opacity-45 placeholder:tracking-wide`,
            className
          )}
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
