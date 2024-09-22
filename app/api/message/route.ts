import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request, res: Response) {
  // Ensure the request body is parsed correctly
  const { senderId, receiverId, content } = await req.json();

  // Validate input
  if (!senderId || !receiverId || !content) {
    return NextResponse.json(
      {
        error:
          "Invalid input. Please provide senderId, receiverId, and content.",
      },
      { status: 400 }
    );
  }

  try {
    // Create a new message in the database
    const message = await prisma.message.create({
      data: {
        sender: {
          connect: {
            id: senderId,
          },
        },
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        content: content,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
    
    if (message) {
      const channelName = `${[senderId, receiverId].sort().join('-')}`;

      await pusherServer.trigger(channelName, 'new-message', {
        message: message // The message payload
      });
     
    }
    // Pusher event to notify the client that a message has been sent
    // Respond with the created message
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "An error occurred while sending the message." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: Request, res: Response) {
  const url = new URL(req.url);
  const currentUserId = url.searchParams.get("currentUserId");
  const otherUserId = url.searchParams.get("otherUserId");

  // Validate input
  if (!currentUserId || !otherUserId) {
    return NextResponse.json(
      { error: "Invalid input. Please provide currentUserId and otherUserId." },
      { status: 400 }
    );
  }

  try {
    await prisma.message.updateMany({
      where: {
        senderId: otherUserId, // Only update the other user's messages
        receiverId: currentUserId, // Ensuring it's received by current user
        seen: false, // Only update if not already seen
      },
      data: {
        seen: true, // Set seen to true
      },
    });
    // Fetch messages exchanged between the two users
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: currentUserId,
            receiverId: otherUserId,
          },
          {
            senderId: otherUserId,
            receiverId: currentUserId,
          },
        ],
      },
      orderBy: {
        createdAt: "asc", // Order messages by creation date
      },
    });

    // Respond with the messages
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json("Failed to fetch messages", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
