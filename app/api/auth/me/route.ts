import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import { IUser } from "@/lib/models/User";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ user: null });

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & { id: string };

    const user = (await User.findById(decoded.id)
      .select("-password")) as IUser | null;

    if (!user) return NextResponse.json({ user: null });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
