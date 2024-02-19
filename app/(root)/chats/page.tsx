"use client";
import React from "react";
import { useSession } from "next-auth/react";
const Chats = () => {
  const { data: session } = useSession();
  console.log(session);
  return <div></div>;
};

export default Chats;
