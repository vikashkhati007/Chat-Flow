import Image from "next/image";
import React from "react";
import Message from "./Message";

const UsersList = () => {
  return (
    <section className="flex gap-3 bg-gradient-to-b from-[#1323F6]/50 to-[#0085FF]/20 border border-white border-opacity-20 px-5 py-2 rounded-[20px] ">
      <Image
        className="rounded-full border border-white border-opacity-50"
        src={"/user.jpeg"}
        width={70}
        height={70}
        alt="profile"
      />
      <div className="messagecontainer p-2">
        <h1 className="text-xl font-semibold">Vikash Khati</h1>
        <Message text="Hello" />
      </div>
    </section>
  );
};

export default UsersList;
