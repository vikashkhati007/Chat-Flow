"use client";
import React, { useEffect, useState } from "react";
import { Search, Paperclip, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import { useSession } from "next-auth/react";

type Conversation = {
  id: number;
  name: string;
  avatar: string;
  time: string;
  unread?: boolean;
};

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Craig Dias",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "2 min",
  },
  {
    id: 2,
    name: "Monica, SM",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "2 min",
  },
  {
    id: 3,
    name: "Marley Vaccaro",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "5 min",
    unread: true,
  },
  {
    id: 4,
    name: "Kierra Lipshutz",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "10 min",
    unread: true,
  },
  {
    id: 5,
    name: "Ann Kenter",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "12 min",
  },
  {
    id: 6,
    name: "Charlie Baptista",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "28 min",
  },
  {
    id: 7,
    name: "Chance Botosh",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "30 min",
  },
];

export default function ChatSection() {
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(conversations[1]);
  const session = useSession();

  return (
    <section className="flex h-screen bg-gray-100 w-full">
      <div className="w-1/3 bg-white border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 w-full"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-5rem)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                activeConversation?.id === conversation.id ? "bg-blue-50" : ""
              }`}
              onClick={() => setActiveConversation(conversation)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={conversation.avatar}
                  alt={conversation.name}
                />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{conversation.name}</h3>
                </div>
              </div>
              {conversation.unread && (
                <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            <div className="p-4 border-b bg-white flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={activeConversation.avatar}
                  alt={activeConversation.name}
                />
                <AvatarFallback>
                  {activeConversation.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <h2 className="font-semibold">{activeConversation.name}</h2>
                <span className="text-sm text-blue-600">VIP</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </section>
  );
}
