"use client"
import { useState } from 'react'
import { User, Circle } from 'lucide-react'

type ChatUser = {
  id: string
  name: string
  avatar: string
  status: 'online' | 'offline'
  lastMessage: string
  unreadCount: number
}

const users: ChatUser[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
    status: 'online',
    lastMessage: 'Hey, how are you doing?',
    unreadCount: 3,
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: '/placeholder.svg?height=40&width=40',
    status: 'offline',
    lastMessage: 'See you tomorrow!',
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Charlie Brown',
    avatar: '/placeholder.svg?height=40&width=40',
    status: 'online',
    lastMessage: 'Can you send me the report?',
    unreadCount: 1,
  },
  {
    id: '4',
    name: 'Diana Prince',
    avatar: '/placeholder.svg?height=40&width=40',
    status: 'offline',
    lastMessage: 'Thanks for your help!',
    unreadCount: 0,
  },
]

export default function UserList() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-3">
        <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li
            key={user.id}
            className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer ${
              selectedUser === user.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => setSelectedUser(user.id)}
          >
            <div className="relative flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={user.avatar}
                alt={user.name}
              />
              <span
                className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${
                  user.status === 'online' ? 'bg-green-400' : 'bg-gray-300'
                }`}
              />
            </div>
            <div className="ml-3 flex-1">
              <div className="flex items-baseline">
                <span className="text-sm font-medium text-gray-900">
                  {user.name}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  {user.status === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
            </div>
            {user.unreadCount > 0 && (
              <div className="ml-3 bg-blue-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                {user.unreadCount}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}