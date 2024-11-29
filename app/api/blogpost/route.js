import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blogpost from '@/models/Blogpost';

export async function GET(req) {
    try {
        await dbConnect();
        const blogposts = await Blogpost.find({}).populate('author', 'username','email');
        return NextResponse.json({ success: true, blogposts });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const { title, description, slug, author, image, content } = await req.json();

        const blogpost = await Blogpost.create({
            title,
            description,
            slug,
            author,
            image,
            content
        });

        return NextResponse.json({ success: true, blogpost });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
