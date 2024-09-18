// Server-side: For triggering events
import PusherServer from "pusher";

// Pusher Server (Backend) configuration
export const pusherServer = new PusherServer({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!, // Publicly exposed in front-end (okay for appId)
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,  // Publicly exposed in front-end (okay for key)
  secret: process.env.PUSHER_SECRET!,            // Secret key for backend (ensure it's correct)
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!, 
});

import Pusher from "pusher-js";

export const pusherClient = new Pusher(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  }
);

