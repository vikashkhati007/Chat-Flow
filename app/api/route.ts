import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

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

    // Log the success message
    console.log(
      `Message sent from ${message.sender.name} to ${message.receiver.name}: ${message.content}`
    );

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
  const { currentUserId, otherUserId } = await req.json();

  // Validate input
  if (!currentUserId || !otherUserId) {
    return NextResponse.json(
      { error: "Invalid input. Please provide currentUserId and otherUserId." },
      { status: 400 }
    );
  }

  try {
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
