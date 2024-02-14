import { useSession } from "next-auth/react";
import React from "react";
import page from "../contacts/page";

const Chats = () => {
  const { data: session } = useSession();
  console.log(session);
  return <div></div>;
};

export default Chats;
