import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/prisma/db"
import { pusherServer } from "@/lib/pusher"

export async function POST(req: NextRequest) {
  const { email, status, userid } = await req.json()

  if (!email || !status || !userid) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { onlinestatus: status === "online" },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (status === "online") {
      const unreadMessages = await prisma.message.findMany({
        where: {
          receiverId: userid,
          seen: false,
        },
        include: {
          sender: true,
        },
      })

      const unreadChannelName = `user-message-${userid}`
      await pusherServer.trigger(unreadChannelName, "unread-message", {
        unreadmessage: unreadMessages,
      })
    } else {
      // Handle offline status
      // You might want to clear any active sessions or perform other offline-related tasks
      console.log(`User ${userid} is now offline`)
    }

    // Notify other users about the status change
    await pusherServer.trigger("user-status", "status-update", {
      userId: userid,
      status: status,
    })

    return NextResponse.json({ status: "success", user }, { status: 200 })
  } catch (error) {
    console.error("Error updating user status:", error)
    return NextResponse.json(
      { error: "An error occurred while updating user status." },
      { status: 500 }
    )
  }
}