import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import {generateToken} from '@/lib/auth';

export async function POST (req) {
  await connectDB ();
  const {email, password} = await req.json ();

  const user = await User.findOne ({email});
  if (!user || !await bcrypt.compare (password, user.password)) {
    return NextResponse.json ({message: 'Invalid credentials'}, {status: 401});
  }

  const token = generateToken (user);

  const res = NextResponse.json ({message: 'Login success'});
  res.cookies.set ('token', token, {
    httpOnly: true,
    secure: true,
  });

  return res;
}
