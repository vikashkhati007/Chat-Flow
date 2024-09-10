import { prisma } from "@/prisma/db";


export const getAllUsers = async (email: string) => {
const users = await prisma.user.findMany({
    where: {
      email: {
        not: email, // Exclude the user with this email
      },
    },
  });
  return users;
}