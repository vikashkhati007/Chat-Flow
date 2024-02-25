import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import Chats from "./Chats";

const MessageSection = () => {
  return (
    <section className="text-white w-1/2 bg-gradient-to-b rounded-xl flex item-center py-5 overflow-hidden relative flex-col gap-5 shadow-sm items-center">
      <div className="bgcolor absolute -z-20 top-0 w-full h-full bg-[#1389F6] mix-blend-overlay"></div>
      <div className="middlecontainer flex items-center relative searchcontainer w-[90%]">
        <Search className="absolute left-2 " />
        <Input
          className="pl-10  rounded-full focus:bg-none outline-none border-none"
          placeholder="Search User"
          type="text"
          name="search"
        />
      </div>
      <div className="chatssection">
        <Chats />
      </div>
    </section>
  );
};

export default MessageSection;
