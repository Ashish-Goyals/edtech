import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task, { ITask } from "@/lib/models/Task";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: NextRequest, context: Context) {
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
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: Context) {
  await connectDB();

  try {
    const { id } = await context.params; 

    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
