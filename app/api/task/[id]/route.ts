import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/lib/models/Task";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { ITask } from "@/lib/models/Task";
import { IUser } from "@/lib/models/User";

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

interface Context {
  params: { id: string };
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await connectDB();

  try {
    const { id } = await context.params;
    const data = await req.json();

    const updated = (await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })) as ITask | null;

    if (!updated) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: Context) {
  await connectDB();

  try {
    const { id } = await context.params;

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    const dbUser = (await User.findById(decoded.id)) as IUser | null;
    if (!dbUser || dbUser.role !== "admin") {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}
