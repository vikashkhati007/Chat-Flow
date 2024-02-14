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
    signOut({ callbackUrl: "/" });
  };
  console.log;

  return (
    <header className="w-full px-10 py-2">
      <nav className="w-full border-opacity-25 rounded-[20px] flex justify-between items-center text-white px-5 bg-blend-overlay border-2 border-blue-500  p-2">
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
              className="border-2 border-blue-500 rounded-full"
              src={"/user.jpeg"}
              width={50}
              height={50}
              alt="profile"
            />
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default TopBar;
