import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/Provider";
import TopBar from "@/components/TopBar";

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

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={cn("bg-[#00072B]", poppins.className)}>
        <Provider>
          <TopBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
