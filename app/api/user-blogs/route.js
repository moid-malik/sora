import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blogpost from '@/models/Blogpost';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    try {
        await dbConnect();
        const userBlogs = await Blogpost.find({ author: userId })
            .sort({ createdAt: -1 });
        
        return NextResponse.json(userBlogs);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}
