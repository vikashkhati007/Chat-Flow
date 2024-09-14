"use client";
import React, { useEffect, useState } from "react";
import { Search, Paperclip, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { Conversation, Message, UserProfile } from "@/types/types";

export default function ChatSection(users: any) {
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(users[1]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const session: any = useSession();

  useEffect(() => {
    if (activeConversation?.id) {
      const fetchMessages = async (
        currentUserId: string,
        otherUserId: string
      ) => {
        setLoading(true);
        setError(null); // Reset error state

        try {
          const url = `http://localhost:3000/api/?currentUserId=${currentUserId}&otherUserId=${otherUserId}`;
          const response = await fetch(url, {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch messages");
          }

          const messages = await response.json();
          setMessages(messages);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchMessages(session?.data?.user?.id, activeConversation?.id.toString());
    }
  }, [activeConversation?.id, session?.data?.user?.id]);

  const handleSendMessage = async (formdata: FormData) => {
    const response = await fetch("http://localhost:3000/api/", {
      method: "POST",
      body: JSON.stringify({
        senderId: session?.data?.user?.id,
        receiverId: activeConversation?.id,
        content: formdata.get("message"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setContent("");
      const message: Message = await response.json();
      setMessages((prevMessages) => [...prevMessages, message]);
    }
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
                <span className="text-sm text-blue-600">VIP</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loading && <div>Loading messages...</div>}
              {error && <div className="text-red-500">{error}</div>}
              {loading
                ? null
                : messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === session?.data?.user?.id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.senderId === session?.data?.user?.id
                            ? "bg-gray-200 text-gray-800"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs mt-1 opacity-75">
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(new FormData(e.currentTarget));
              }}
              className="p-4 bg-white border-t flex items-center"
            >
              <Input
                type="text"
                placeholder="Type here..."
                name="message"
                className="flex-1 mr-2"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
