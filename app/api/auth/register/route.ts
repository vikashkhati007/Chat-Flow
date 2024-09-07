import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response("User already exists", {
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to create a new user", {
      status: 500,
    });
  }
};
