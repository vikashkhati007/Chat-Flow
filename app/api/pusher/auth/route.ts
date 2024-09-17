// app/api/pusher/auth/route.ts

import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';

export async function POST(req: Request) {
  try {
    const { socket_id, channel_name } = await req.json();
    console.log(socket_id, channel_name);

    // Validate input
    if (!socket_id || !channel_name) {
      console.error('Invalid input:', { socket_id, channel_name });
      return NextResponse.json({ error: 'Missing socket_id or channel_name' }, { status: 400 });
    }

    // Authenticate the user for the given channel
    const auth = pusherServer.authenticateUser(socket_id, channel_name);

    // Respond with the authentication data
    return NextResponse.json(auth);
  } catch (error) {
    console.error('Pusher Auth Error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
