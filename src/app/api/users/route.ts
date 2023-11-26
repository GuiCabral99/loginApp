import User from "@/models/UserModel";
import db from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await db.connect();
    const users = await User.find({});
    await db.disconnect();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.connect();
    const user = await User.create({ name, email, password: hashedPassword });
    await db.disconnect();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}
