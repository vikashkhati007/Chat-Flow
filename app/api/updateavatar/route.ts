import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){
    const { email, avatarUrl } = await req.json();
    console.log( avatarUrl);
    if (!email || !avatarUrl) {
        return NextResponse.json(
            {
                error: "Invalid input. Please provide id, name, email, and password.",
            },
            { status: 400 }
        );
    }

    try {
        const user = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                profileImage: avatarUrl,
            },
        });

        console.log("User updated:", user);

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { error: "An error occurred while updating the user." },
            { status: 500 }
        );
    }
}