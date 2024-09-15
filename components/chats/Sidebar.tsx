"use client";
import React, { useState } from "react";
import { Users, MessageSquare, LayoutDashboard, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Dashboard from "../Dashboard";

type NavItem = {
  icon: React.ElementType;
  label: string;
  count?: number | string;
  pathName: string;
};

const navItems: NavItem[] = [
  {
    icon: MessageSquare,
    label: "Chat",
    count: 5,
    pathName: "/chats",
  },
  { icon: Users, label: "Guests", count: 84, pathName: "/guests" },
];

const NavItem: React.FC<
  NavItem & { isActive: boolean; onClick: () => void }
> = ({ icon: Icon, label, count, isActive, pathName, onClick }) => (
  <li>
    <Link
      href={pathName}
      onClick={onClick} // Move onClick to Link
      className={`flex items-center px-4 py-3 text-sm font-medium ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon className="h-5 w-5 mr-3" />
      <span className="flex-grow">{label}</span>
      {/* {count !== undefined && (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            isActive ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-600"
          }`}
        >
          {count}
        </span>
      )} */}
    </Link>
  </li>
);

export default function Sidebar() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string>(pathname);
  const user = useSession();
  const fullname: string = user.data?.user.name ?? 'loading';

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col">
      <div className="p-4">
        <Image src={"/logo.png"} width={40} height={40} alt="logo" />
      </div>
      <nav className="flex-grow">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              isActive={activeItem === item.pathName}
              onClick={() => setActiveItem(item.pathName)} // Update active item
            />
          ))}
        </ul>
      </nav>
      <div className="w-full">
        <Dashboard/>
      </div>
      <div className="p-4 border-t flex items-center gap-2 relative ">
        <Avatar>
          <AvatarImage
          // @ts-ignore
            src={user.data?.user.profileImage}
            alt={user.data?.user.name!}
          />
          <AvatarFallback>{fullname.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm text-gray-800">
            {fullname}
          </p>
          <p className="text-xs text-gray-500">Welcome</p>
        </div>
        <div className="signout absolute right-2 cursor-pointer ">
        <LogOutIcon width={20} onClick={() => signOut({ callbackUrl: '/' })}/>
        </div>
      </div>
    </div>
  );
}
