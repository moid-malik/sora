'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateBlog() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = JSON.parse(localStorage.getItem('user'))
    
    const baseSlug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    
    const uniqueSlug = `${baseSlug}-${Date.now()}`
    
    try {
      const response = await fetch('/api/postblog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          author: userData.username,
          slug: uniqueSlug,
          date: new Date().toISOString(),
        }),
      })
  
      if (response.ok) {
        router.push('/profile')
      }
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }
  
  
  

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Blog</h1>
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
          <Button type="submit">Create Blog</Button>
        </form>
      </div>
    </div>
  )
}
