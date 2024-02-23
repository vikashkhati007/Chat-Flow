"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TopBar = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    signOut({ callbackUrl: "/login" });
  };
  console.log;

  return (
    <header className="w-full py-2">
      <nav className="w-full flex justify-between items-center text-white px-10 bg-blend-overlay p-2 border-b border-white border-opacity-10">
        <Link
          href={"/chats"}
          className="titlecontaienr flex justify-start items-center gap-2"
        >
          <Image src={"/chat.png"} width={50} height={50} alt="logo" />
          <h1 className="text-xl font-semibold">Chat Flow</h1>
        </Link>
        <ul className="menu flex gap-5 justify-center items-center font-semibold">
          <LogOut onClick={handleLogout} />
          <Link href={"/chats"}>
            <li className={pathname === "/chats" ? "text-blue-500" : ""}>
              Chats
            </li>
          </Link>
          <Link href={"/contacts"}>
            <li className={pathname === "/contacts" ? "text-blue-500" : ""}>
              Contact
            </li>
          </Link>
          <Link href={"/profile"}>
            <Image
              className="rounded-full border-2 border-opacity-20 border-white  "
              src={"/user.jpeg"}
              width={40}
              height={40}
              alt="profile"
            />
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default TopBar;
