import React from "react";

import MessageSection from "./chats/MessageSection";
import UserListSection from "./chats/UserListSection";

const ChatSection = () => {
  return (
    <section className="w-full flex justify-center gap-5 ">
      <UserListSection />
      <MessageSection />
    </section>
  );
};

export default ChatSection;
