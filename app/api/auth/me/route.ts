import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { IUser } from '@/lib/models/User';

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const cookie = req.cookies.get('token');
    const token = cookie?.value;

    if (!token) return NextResponse.json({ user: null });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    const user = (await User.findById(decoded.id).select('-password')) as IUser | null;

    if (!user) return NextResponse.json({ user: null });

    return NextResponse.json({ user });
  } catch (error: unknown) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
