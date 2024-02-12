"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Please log in to view this page.</div>;
  }

  console.log(data);
  return <div></div>;
};

export default Page;
