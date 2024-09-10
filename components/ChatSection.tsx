import React from "react";
import MessageSection from "./chats/MessageSection";
import UserListSection from "./chats/UserListSection";
const ChatSection = () => {
  return (
    <section className="w-full flex gap-5 h-screen ">
      <UserListSection />
    </section>
  );
};

export default ChatSection;
