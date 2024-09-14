export interface NewUserProps {
  data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}

export type User = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
};

export type Conversation = {
  id: number;
  name: string;
  avatar: string;
  time: string;
  unread?: boolean;
  email: string;
};

export interface UserProfile {
  id: number;
  name: string;
  profileImage: string;
}

export type Message = {
  id: number
  sender: 'user' | 'other'
  content: string
  time: string
  senderId: string
  receiverId: string
  createdAt: string
}


export interface SessionProps {
  user:{
    email: string;
    id: string;
    image: string;
    name: string;
  }
}