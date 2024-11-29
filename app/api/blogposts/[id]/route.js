import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blogpost from '@/models/Blogpost';
import User from '@/models/User'; 

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const blogpost = await Blogpost.findById(params.id).populate('author', 'username email profilePic');
        
        if (!blogpost) {
            return NextResponse.json({ success: false, error: 'Blogpost not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, blogpost });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const updates = await req.json();
        
        const blogpost = await Blogpost.findByIdAndUpdate(
            params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!blogpost) {
            return NextResponse.json({ success: false, error: 'Blogpost not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, blogpost });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const blogpost = await Blogpost.findByIdAndDelete(params.id);
        
        if (!blogpost) {
            return NextResponse.json({ success: false, error: 'Blogpost not found' }, { status: 404 });
        }
        await User.findByIdAndUpdate(
            blogpost.author,
            { $pull: { blogposts: blogpost._id } }
        );

        return NextResponse.json({ success: true, message: 'Blogpost deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
