import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

const MessageSection = () => {
  return (
    <section className="text-white w-1/2 bg-gradient-to-b rounded-xl flex item-center py-5 overflow-hidden relative flex-col gap-5 shadow-sm">
      <div className="bgcolor absolute -z-20 top-0 w-full h-full bg-[#1389F6] mix-blend-overlay"></div>
      <div className="middlecontainer flex justify-center items-center relative searchcontainer ">
        <Search className="absolute left-2 " />
        <Input
          className="pl-10 rounded-full focus:bg-none outline-none border-none"
          placeholder="Search User"
          type="text"
          name="search"
        />
      </div>
      <h1>MessageSection</h1>
    </section>
  );
};

export default MessageSection;
