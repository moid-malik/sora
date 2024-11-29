import dbConnect from "@/lib/dbConnect";
import Blogpost from "@/models/Blogpost";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();
  const { blogId, content, userId } = await request.json();

  try {
    // First find the blogpost and populate existing comments
    const blogpost = await Blogpost.findById(blogId).populate('comments.author');
    
    // Add the new comment
    const newComment = {
      content,
      author: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    blogpost.comments.push(newComment);
    await blogpost.save();
    
    const populatedBlogpost = await Blogpost.findById(blogId)
      .populate('comments.author');
    const latestComment = populatedBlogpost.comments[populatedBlogpost.comments.length - 1];
    
    return NextResponse.json({ 
      success: true, 
      comment: latestComment 
    });
  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
