import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import TopBar from "@/components/TopBar";
import NextAuthProvider from "@/components/NextProvider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={cn("bg-[#00072B]", poppins.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TopBar />
            {children}
          </ThemeProvider>
        </body>
      </NextAuthProvider>
    </html>
  );
}
