import Blogpost from '@/models/Blogpost'
import User from '@/models/User'
import dbConnect from '@/lib/dbConnect'

export async function POST(request) {
  await dbConnect()
  
  const postData = await request.json()
  const post = await Blogpost.create(postData)
  
  await User.findOneAndUpdate(
    { username: postData.author },
    { $push: { blogposts: post._id } }
  )
  
  return Response.json({ post })
}
