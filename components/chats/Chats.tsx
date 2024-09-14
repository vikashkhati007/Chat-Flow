import React from "react";
import { getSession } from "@/lib/auth";
import { getAllUsers } from "@/actions/getAllUsers";
import ChatSection from "../ChatSection";
import { getUsersWhoSentMessage } from "@/actions/chats";
const Chats = async () => {
  const session: any = await getSession();
  const users = await getAllUsers(session?.user?.email);
  const chatsuser = await getUsersWhoSentMessage(session?.user?.id);
  return (
    <section className="w-full flex gap-5 h-screen ">
      <ChatSection users={users} chatsusers={chatsuser}/>
    </section>
  );
};

export default Chats;
