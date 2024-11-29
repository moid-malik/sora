'use client'
import { Input } from '@/components/ui/Input'
import { useRouter } from 'next/navigation'


export default function UploadPage() {
  const router = useRouter()
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  async function handleSubmit(formData) {
    const blogData = {
      title: formData.get('title'),
      description: formData.get('description'),
      slug: formData.get('title').toLowerCase().replace(/\s+/g, '-'),
      date: new Date().toLocaleDateString('en-US'),
      author: formData.get('author'),
      image: formData.get('image'),
      content: formData.get('content')
    }

    const response = await fetch('/api/postblog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    })

    if (response.ok) {
      router.push('/blog')
    }
  }

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Create New Blog Post</h1>
        
        <form action={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input 
              type="text" 
              name="title"
              className="w-full p-2 border rounded-md "
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Input 
              type="text" 
              name="description"
              className="w-full p-2 border rounded-md "
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <Input 
              type="text" 
              name="author"
              readonly='true'
              value={loggedInUser ? loggedInUser.username : 'guest user'}
              className="w-full p-2 border rounded-md "
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <Input 
              type="url" 
              name="image"
              className="w-full p-2 border rounded-md "
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
            <textarea 
              name="content"
              rows="15"
              className="w-full p-2 border rounded-md  font-mono"
              required
            ></textarea>
          </div>

          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Create Post
          </button>
        </form>
      </div>
    </main>
  )
}
