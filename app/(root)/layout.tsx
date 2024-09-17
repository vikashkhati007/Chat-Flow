import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/chats/Sidebar";
import Providers from "@/Provider";
import { getSession } from "@/lib/auth";
import ProgressBarComponent from "@/components/ProgressBar";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Chat-Flow",
  description:
    "ChatFlow is a real-time messaging platform designed to facilitate seamless communication between users. With its intuitive interface and responsive design, ChatFlow enables users to engage in dynamic conversations effortlessly. Whether you're connecting with friends, collaborating with colleagues, or engaging with an online community.",
  keywords: [
    "chat",
    "messaging",
    "real-time",
    "communication",
    "chatflow",
    "chat-flow",
    "chat flow",
  ],
};

export default async function RootLayout({ children }: any) {
  const session = await getSession();
  return (
    <html lang="en">
      <Providers session={session}>
        <body className={cn("bg-[#00072B] flex", poppins.className)}>
          <ProgressBarComponent>
            <Sidebar />
            {children}
          </ProgressBarComponent>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
