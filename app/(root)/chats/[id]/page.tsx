import MessageSection from "@/components/chats/MessageSection";
import UserListSection from "@/components/chats/UserListSection";
import React from "react";

const ChatSection = () => {
  return (
    <section className="w-full flex justify-center gap-5 ">
      <UserListSection />
      <MessageSection />
    </section>
  );
};

export default ChatSection;
