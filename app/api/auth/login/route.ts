import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { generateToken } from '@/lib/auth';
import { IUser } from '@/lib/models/User';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const email = body.email as string;
    const password = body.password as string;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = (await User.findOne({ email })) as IUser | null;

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken(user);

    const res = NextResponse.json({ message: 'Login success' });
    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 7 * 24 * 60 * 60, 
    });

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
  }
}
