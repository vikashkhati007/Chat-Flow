import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const GET = authOptions(function GET(req) {
  if (req.auth) return NextResponse.json(req.auth);
  return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
});