import React from "react";

const Message = ({ text }: any) => {
  return (
    <div className="flex justify-center items-center">
      <div className="messagetextcontainer bg-gradient-to-b from-transparent to-[#1323F6]/50 border border-white border-opacity-15 bg-opacity-20 px-5 rounded-[20px]">
        {text}
      </div>
    </div>
  );
};

export default Message;
