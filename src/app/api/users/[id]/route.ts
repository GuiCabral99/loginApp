import User from "@/models/UserModel";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.connect();
    const user = await User.findById(params.id);
    await db.disconnect();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name, email, password } = await req.json();
  try {
    await db.connect();
    const newUser = User.findByIdAndUpdate(
      params.id,
      { name, email, password },
      { new: true }
    );
    await db.disconnect();
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.connect();
    await User.findByIdAndDelete(params.id);
    await db.disconnect();
    return NextResponse.json({ msg: "User deleted" });
  } catch (error) {
    return NextResponse.json(error);
  }
}
