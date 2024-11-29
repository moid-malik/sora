import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        await dbConnect();
        const { username, email, password, profilePic } = await req.json();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            profilePic
        });

        return NextResponse.json({ 
            success: true, 
            user: {
                username: user.username,
                email: user.email,
                profilePic: user.profilePic
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET(req) {
    try {
        await dbConnect();
        const users = await User.find({}).select('-password').populate('blogposts');
        return NextResponse.json({ success: true, users });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
