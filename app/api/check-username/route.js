import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    await dbConnect();
    const existingUser = await User.findOne({ username: username.toLowerCase() });

    if (existingUser) {
        return NextResponse.json(
            { available: false, message: "Username is already taken" }, 
            { status: 200 }
        );
    }

    return NextResponse.json(
        { available: true, message: "Username is available" }, 
        { status: 200 }
    );
}
