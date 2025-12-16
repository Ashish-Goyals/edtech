import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { IUser } from '@/lib/models/User'; 

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const name = body.name as string;
    const email = body.email as string;
    const password = body.password as string;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const userExists = (await User.findOne({ email })) as IUser | null;
    if (userExists) {
      return NextResponse.json({ message: 'User exists' }, { status: 400 });
    }

    await User.create({ name, email, password });

    return NextResponse.json({ message: 'Registered successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
  }
}
