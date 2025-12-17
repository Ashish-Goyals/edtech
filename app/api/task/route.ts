import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/lib/models/Task";
import { ITask } from "@/lib/models/Task"; 
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const tasks = await Task.find() as ITask[];
    return NextResponse.json(tasks);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    const body = await req.json();

    const task = await Task.create({
      ...body,
      userId: decoded.id,
    });

    return NextResponse.json(task);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}
