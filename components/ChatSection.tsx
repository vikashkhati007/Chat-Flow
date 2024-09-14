"use client";
import React, { useState } from "react";
import { Search, Paperclip, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { Conversation, Message, UserProfile } from "@/types/types";
const messages: Message[] = [
  {
    id: 1,
    sender: "other",
    content: "Hello! My pillow is a little rough. Can you change me?",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "user",
    content: "Yes, of course, we will change you today",
    time: "10:32 AM",
  },
  {
    id: 3,
    sender: "other",
    content: "Hello, I want to book a spa service",
    time: "10:35 AM",
  },
  {
    id: 4,
    sender: "user",
    content: "Tomorrow 9:30 is free. It's okay?",
    time: "10:37 AM",
  },
  { id: 5, sender: "other", content: "That's perfect. 😊", time: "10:38 AM" },
  {
    id: 6,
    sender: "user",
    content: "You are registered with the therapist Leo. At 9:30 Am.",
    time: "10:40 AM",
  },
  { id: 7, sender: "other", content: "Thank you so much 😊", time: "10:41 AM" },
];

export default function ChatSection(users: any) {
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(users[1]);

  const pathname = usePathname();
  const session = useSession();

  const handleSendMessage = async (formdata: FormData) => {
    const message = await fetch("http://localhost:3000/api/", {
      method: "POST",
      body: JSON.stringify({
        senderId: session?.data?.user?.id,
        receiverId: activeConversation?.id,
        content: formdata.get("message"),
      }),
    });
    console.log(message);
  };

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
          {pathname === "/guests"
            ? users.users.map((u: UserProfile | any) => (
                <div
                  key={u.id}
                  className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                    activeConversation?.id === u.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setActiveConversation(u)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={u.profileImage} alt={u.name} />
                    <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{u.name}</h3>
                    </div>
                  </div>
                  {u.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                  )}
                </div>
              ))
            : null}
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
                <h2 className="font-semibold">{activeConversation.email}</h2>
                <span className="text-sm text-blue-600">VIP</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-75">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <form
              action={handleSendMessage}
              className="p-4 bg-white border-t flex items-center"
            >
              <Input
                type="text"
                placeholder="Type here..."
                name="message"
                className="flex-1 mr-2"
              />
              <Button type="submit" size="icon" className="mr-2">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
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
