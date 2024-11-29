import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blogpost from '@/models/Blogpost';
import User from '@/models/User';


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
        await User.findByIdAndUpdate(
            author,
            { $push: { blogposts: blogpost._id } },
            { new: true }
        );

        return NextResponse.json({ success: true, blogpost });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const blogposts = await Blogpost.find({});
        return NextResponse.json(blogposts);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}