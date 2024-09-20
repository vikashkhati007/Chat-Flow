import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, status, userid } = await req.json();

  // Corrected condition to check if any field is missing
  if (!email || !status || !userid) {
    return NextResponse.json({ error: "Check request Details Properly" }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        onlinestatus: status === "online", // Fix boolean logic for status
      },
    });


    const unreadMessages = await prisma.message.findMany({
      where: {
        receiverId: userid, // Using userid for messages
        seen: false, // Only fetch unseen messages
      },
      include: {
        sender: true, // Include sender details if needed
      },
    });

    if (user && unreadMessages) {
      const unreadChannelName = `user-message-${userid}`;
      await pusherServer.trigger(unreadChannelName, "unread-message", {
        user: unreadMessages, // Send unread messages
      });
    }
    
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { error: "An error occurred while updating user status." },
      { status: 500 }
    );
  }
}
