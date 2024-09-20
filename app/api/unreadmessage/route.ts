import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: NextRequest, res: NextResponse) {
  const { receiver_user_id} = await req.json();

  try {
    const sendersWithUnreadMessages = await prisma.user.findMany({
        where: {
          messagesSent: {
            some: {
              receiverId: receiver_user_id,  // Yahan tumhari user ID hogi
              seen: false,  // Sirf un messages ko fetch karega jo ab tak seen nahi hue hain
            }
          }
        },
        include: {
          messagesSent: {
            where: {
              receiverId: receiver_user_id, // Yahan tumhari user ID hogi
              seen: false, // Unread messages filter
            },
          },
        },
      });
      
    if (!sendersWithUnreadMessages) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(sendersWithUnreadMessages, { status: 200 });
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching unread messages." },
      { status: 500 }
    );
  }
}
