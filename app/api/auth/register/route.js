import {NextResponse} from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

export async function POST (req) {
  await connectDB ();
  const {name, email, password} = await req.json ();

  const userExists = await User.findOne ({email});
  if (userExists) {
    return NextResponse.json ({message: 'User exists'}, {status: 400});
  }

  await User.create ({name, email, password});

  return NextResponse.json ({message: 'Registered successfully'});
}
