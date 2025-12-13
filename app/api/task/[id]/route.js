import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/lib/models/Task";
import jwt from "jsonwebtoken";
import User from "@/lib/models/User";

export async function PUT(req, context) {
  await connectDB();

  const { params } = context;
  const { id } = await params;

  const data = await req.json();

  const updated = await Task.findByIdAndUpdate(id, data, {
    new: true,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req, context) {
  await connectDB();

  const { params } = context;
  const { id } = await params; 

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const dbUser = await User.findById(decoded.id);
  if (!dbUser || dbUser.role !== "admin") {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  await Task.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted successfully" });
}

