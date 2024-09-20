import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, status, userid } = await req.json();
  console.log(email, status);

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      onlinestatus: status === "online" ? true : false,
    },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (user) {
    const channelName = `user-status-${userid}`;
    await pusherServer.trigger(channelName, "online-status", {
      user: user, // The message payload
    });
  }

  if (userid) {
    const unreadMessages = await prisma.message.findMany({
      where: {
        receiverId: userid,  // Tumhari user ID yahan
        seen: false,         // Sirf wo messages jo ab tak seen nahi hue
      },
      include: {
        sender: true,        // Sender ka details agar chahiye ho toh
      },
    });
    if (unreadMessages) {
      const unreadChannelName = `user-message-${userid}`;
      await pusherServer.trigger(unreadChannelName, "unread-message", {
        user: unreadMessages, // The message payload
      });
    }
  }

  return NextResponse.json(user, { status: 200 });
}
