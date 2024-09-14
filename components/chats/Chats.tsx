import React from "react";
import { getSession } from "@/lib/auth";
import { getAllUsers } from "@/actions/getAllUsers";
import ChatSection from "../ChatSection";
const Chats = async () => {
  const session: any = await getSession();

  const users = await getAllUsers(session?.user?.email);
  return (
    <section className="w-full flex gap-5 h-screen ">
      <ChatSection users={users} />
    </section>
  );
};

export default Chats;
