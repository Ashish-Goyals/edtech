import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/lib/models/Task";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await connectDB();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

export async function POST(req) {
  await connectDB();
  const token = req.cookies.get("token")?.value;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const body = await req.json();
  const task = await Task.create({
    ...body,
    userId: user.id,
  });

  return NextResponse.json(task);
}
