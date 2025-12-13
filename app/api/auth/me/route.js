import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

export async function GET (req) {
	await connectDB ();
	try {
		const cookie = req.cookies.get ('token');
		const token = cookie?.value;
		if (!token) return NextResponse.json ({ user: null });

		const decoded = jwt.verify (token, process.env.JWT_SECRET);
		const user = await User.findById (decoded.id).select ('-password');
		if (!user) return NextResponse.json ({ user: null });

		return NextResponse.json ({ user });
	} catch (e) {
		return NextResponse.json ({ user: null }, { status: 401 });
	}
}
