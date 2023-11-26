import User from "@/models/UserModel";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  try {
    await db.connect();
    const user = await User.findOne({ email }).select("_id");
    await db.disconnect();
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(error);
  }
}
