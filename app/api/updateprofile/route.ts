import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){
    const { id, name, email, avatarUrl } = await req.json();
    console.log(id, name, email, avatarUrl);
    if (!id || !name || !email ) {
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
                id: id,
            },
            data: {
                name: name,
                email: email,
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