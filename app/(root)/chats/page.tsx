"use client";
import React from "react";
import { useSession } from "next-auth/react";
import TopBar from "@/components/TopBar";

const Page = () => {
  const { data: session } = useSession();
  return <div></div>;
};

export default Page;
