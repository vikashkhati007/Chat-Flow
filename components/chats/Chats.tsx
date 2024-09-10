"use client"
import React, { useState } from 'react'
import { Search, Paperclip, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


type Conversation = {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread?: boolean
}

type Message = {
  id: number
  sender: 'user' | 'other'
  content: string
  time: string
}

const conversations: Conversation[] = [
  { id: 1, name: "Craig Dias", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Craig is typing...", time: "2 min" },
  { id: 2, name: "Monica, SM", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Thank you so much! 😊", time: "2 min" },
  { id: 3, name: "Marley Vaccaro", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Sent a post", time: "5 min", unread: true },
  { id: 4, name: "Kierra Lipshutz", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Good luck!", time: "10 min", unread: true },
  { id: 5, name: "Ann Kenter", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Thank you", time: "12 min" },
  { id: 6, name: "Charlie Baptista", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "This was so cool", time: "28 min" },
  { id: 7, name: "Chance Botosh", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Hello, Chance. Please check...", time: "30 min" },
]

const messages: Message[] = [
  { id: 1, sender: 'other', content: "Hello! My pillow is a little rough. Can you change me?", time: "10:30 AM" },
  { id: 2, sender: 'user', content: "Yes, of course, we will change you today", time: "10:32 AM" },
  { id: 3, sender: 'other', content: "Hello, I want to book a spa service", time: "10:35 AM" },
  { id: 4, sender: 'user', content: "Tomorrow 9:30 is free. It's okay?", time: "10:37 AM" },
  { id: 5, sender: 'other', content: "That's perfect. 😊", time: "10:38 AM" },
  { id: 6, sender: 'user', content: "You are registered with the therapist Leo. At 9:30 Am.", time: "10:40 AM" },
  { id: 7, sender: 'other', content: "Thank you so much 😊", time: "10:41 AM" },
]

export default function ChatSection() {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(conversations[1])
  const [newMessage, setNewMessage] = useState('')



  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // In a real app, you'd send this message to your backend
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

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
                activeConversation?.id === conversation.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setActiveConversation(conversation)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.avatar} alt={conversation.name} />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{conversation.name}</h3>
                  <span className="text-sm text-gray-500">{conversation.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
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
                <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <h2 className="font-semibold">{activeConversation.name}</h2>
                <span className="text-sm text-blue-600">VIP</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-75">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex items-center">
              <Input
                type="text"
                placeholder="Type here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
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
  )
}