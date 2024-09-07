import React from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import UsersList from "./UsersList";
import { getSession } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const UserListSection = async () => {
  const session = await getSession();
   console.log(session);
  return (
    <section className="text-white w-[337px] bg-gradient-to-b rounded-xl flex justify-center py-5 overflow-hidden relative flex-col gap-5 items-center shadow-sm">
      <div className="bgcolor absolute -z-20 top-0 w-full h-full bg-[#1389F6] mix-blend-overlay"></div>
      <div className="uppercontainer">
        <h1 className={cn(`text-2xl font-semibold`, inter.className)}>
          USERS LIST
        </h1>
      </div>
      <div className="middlecontainer flex justify-start items-center relative searchcontainer ">
        <Search className="absolute left-2 " />
        <Input
          className="pl-10 rounded-full focus:bg-none outline-none border-none"
          placeholder="Search User"
          type="text"
          name="search"
        />
      </div>
      <div className="bottomcontainer flex flex-col justify-center items-center gap-2">
        <UsersList />
      </div>
    </section>
  );
};

export default UserListSection;
