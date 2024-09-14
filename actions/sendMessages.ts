import { prisma } from "@/prisma/db";

interface SendMessageInput {
    senderId: string;
    receiverId: string;
    content: string;
}

export const sendMessage = async (senderId: any, receiverId:any, content:any )  => {
    try {
      // Create a new message entry
      const message = await prisma.message.create({
        data: {
          sender: {
            connect: { id: senderId }, // Connect the sender user
          },
          receiver: {
            connect: { id: receiverId }, // Connect the receiver user
          },
          content: content, // Message content
        },
      });
  
      console.log('Message sent successfully:', message);
      return message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error; // Rethrow the error for further handling
    }
  }