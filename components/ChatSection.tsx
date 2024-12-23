"use client";
import React, { useEffect, useRef, useState } from "react";
import { Search, Paperclip, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { Conversation, Message, UserProfile } from "@/types/types";
import { timeAgo } from "@/lib/time";
import { CircleCheck, CheckCircle, Dot } from "lucide-react";
import { pusherClient } from "@/lib/pusher";

export default function ChatSection(users: any, chatsusers: any) {
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(users[1]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input
  const pathname = usePathname();
  const [onlineStatus, setOnlineStatus] = useState<any>(false);
  const session: any = useSession();
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<any>([]);

  // handle offline we need to update the user status and unread messages


  useEffect(() => {
    const updateUserStatus = async (status: 'online' | 'offline') => {
      if (!session?.data?.user?.email || !session?.data?.user?.id) return

      try {
        const res = await fetch('/api/userstatus', {
          method: 'POST',
          body: JSON.stringify({
            email: session.data.user.email,
            userid: session.data.user.id,
            status,
          }),
          headers: { 'Content-Type': 'application/json' },
        })

        if (res.ok) {
          setOnlineStatus(status === 'online')
          if (status === 'online') {
            subscribeToUnreadMessages()
          } else {
            unsubscribeFromUnreadMessages()
          }
        } else {
          console.error('Failed to update user status')
        }
      } catch (error) {
        console.error('Error updating user status:', error)
      }
    }

    const subscribeToUnreadMessages = () => {
      const unreadChannelName = `user-message-${session.data.user.id}`
      const unreadChannel = pusherClient.subscribe(unreadChannelName)
      unreadChannel.bind('unread-message', (data: { unreadmessage: any[] }) => {
        setUnreadMessages(data.unreadmessage)
      })
    }

    const unsubscribeFromUnreadMessages = () => {
      const unreadChannelName = `user-message-${session.data.user.id}`
      pusherClient.unsubscribe(unreadChannelName)
    }

    const handleVisibilityChange = () => {
      const newStatus = document.visibilityState === 'visible' ? 'online' : 'offline'
      updateUserStatus(newStatus)
    }
    const newStatus = document.visibilityState === 'visible' ? 'online' : 'offline'

    console.log('session', newStatus) 

    const intervalId = setInterval(() => {
      if (!document.hidden) {
        updateUserStatus('online')
      }
    }, 60000) // Update every minute when the tab is visible

    document.addEventListener('visibilitychange', handleVisibilityChange)
    updateUserStatus('online') // Set initial status

    return () => {
      clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      updateUserStatus('offline')
      unsubscribeFromUnreadMessages()
    }
  }, [session])


  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
    //user status update
  }, [messages]);

  useEffect(() => {
    if (activeConversation?.id) {
      const fetchMessages = async (
        currentUserId: string,
        otherUserId: string
      ) => {
        setMessages([]);
        setLoading(true);
        setError(null); // Reset error state
        try {
          const url = `/api/message/?currentUserId=${currentUserId}&otherUserId=${otherUserId}`;
          const response = await fetch(url, { method: "GET" });

          if (!response.ok) {
            throw new Error("Failed to fetch messages");
          }

          const messages = await response.json();
          setMessages(messages);

          const channelName = `${[currentUserId, otherUserId]
            .sort()
            .join("-")}`;
          const channel = pusherClient.subscribe(channelName);

          channel.bind("new-message", function (data: any) {
            setMessages((prevMessages) => [...prevMessages, data.message]);
          });
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
    const response = await fetch(
      `/api/message/`,
      {
        method: "POST",
        body: JSON.stringify({
          senderId: session?.data?.user?.id,
          receiverId: activeConversation?.id,
          content: formdata.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const res = await response.json();
      setContent("");
      console.log("Message sent successfully");
    }
  };

  // Filtered users based on searchTerm
  const filteredUsers =
    pathname === "/guests"
      ? users.users.filter((u: UserProfile) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : users.chatsusers.filter((u: UserProfile) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <section className="flex h-screen bg-gray-100 w-full">
      <div className="w-1/3 bg-white border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search users..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-5rem)]">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u: UserProfile) => (
              <div
                key={u.id}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                  activeConversation?.id === u.id ? "bg-blue-50" : ""
                }`}
                // @ts-ignore
                onClick={() => setActiveConversation(u)}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={u.profileImage} alt={u.name} />
                    <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      u.onlinestatus ? "bg-green-500" : "bg-gray-400"
                    } transition-colors duration-300 ease-in-out`}
                    aria-label={u.onlinestatus ? "Online" : "Offline"}
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{u.name}</h3>
                    {unreadMessages.filter(
                      (message: any) => message.senderId === u.id
                    ).length > 0 && (
                      <div className="relative">
                        <span className="bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center absolute top-0 right-0 transform translate-x-2 -translate-y-2 shadow-lg">
                          {
                            unreadMessages.filter(
                              (message: any) => message.senderId === u.id
                            ).length
                          }
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500">No users available</div>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            <div className="p-4 border-b bg-white flex items-center">
              <div className="relative flex items-center">
                <Avatar className="h-12 w-12 rounded-full border border-gray-300 bg-white">
                  <AvatarImage
                    // @ts-ignore
                    src={activeConversation.profileImage}
                    alt={activeConversation.name}
                    className="object-cover rounded-full"
                  />
                  <AvatarFallback className="text-xl font-bold">
                    {activeConversation.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    activeConversation.onlinestatus
                      ? "bg-green-500"
                      : "bg-gray-400"
                  } transition-colors duration-300 ease-in-out`}
                  aria-label={
                    activeConversation.onlinestatus ? "Online" : "Offline"
                  }
                />
              </div>
              <div className="ml-4">
                <h2 className="font-semibold">{activeConversation.name}</h2>
                <span className="text-sm text-blue-600">
                  {activeConversation.onlinestatus ? "online" : "offline"}
                </span>
              </div>
            </div>
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              ref={messageContainerRef}
            >
              {loading && <div>Loading messages...</div>}
              {error && <div className="text-red-500">{error}</div>}
              {messages.map((message) => (
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
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs mt-1 opacity-75">
                        {timeAgo(message.createdAt)}
                      </p>
                      {/* Seen/Not Seen indicator */}
                      {message.senderId === session?.data?.user?.id && (
                        <p className="text-xs mt-1">
                          {
                            // @ts-ignore
                            message.seen ? (
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                            ) : (
                              <CircleCheck className="w-4 h-4 opacity-50" />
                            )
                          }
                        </p>
                      )}
                    </div>
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
