import { prisma } from "@/prisma/db";

export const getUsersWhoSentMessage = async (userId: string) =>{
  const res = await prisma.user.findMany({
    where: {
      messagesSent: {
        some: {
          receiverId: userId,
        },
      },
    },
    distinct: ['id'],
  });
  return res;
}
    