'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EditBlog({ params }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
  })

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`/api/blogposts/${params.id}`)
        const data = await response.json()
        if (data.success) {
          const { title, description, content, image } = data.blogpost
          setFormData({
            title,
            description,
            content,
            image
          })
        }
      } catch (error) {
        console.error('Error fetching blog data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogData()
  }, [params.id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/blogposts/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/profile')
      }
    } catch (error) {
      console.error('Error updating blog:', error)
    }
  }

  if (isLoading) {
    return <div className="container mx-auto py-12 px-4 text-center">Loading blog data...</div>
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Content</label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
              className="min-h-[200px]"
            />
          </div>
          <div>
            <label className="block mb-2">Image URL</label>
            <Input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              required
            />
          </div>
          <Button type="submit">Update Blog</Button>
        </form>
      </div>
    </div>
  )
}
