import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      onlinestatus: true,
    },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const channelName = `user-status-${email}`;

  await pusherServer.trigger(channelName, 'online-status', {
    user: user // The message payload
  });
  return NextResponse.json(user, { status: 200 });
}
