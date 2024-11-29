'use client'
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

function Blog() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
    if (!userCookie) {
      setUser(false)
    }
    if (userCookie) {
      const userData = userCookie.split('=')[1];
      setUser(JSON.parse(decodeURIComponent(userData)));
    }
  
    const fetchBlogs = async () => {
      try {
          const response = await fetch('/api/blogposts')
          if (!response.ok) {
              throw new Error('Failed to fetch blogs')
          }
          const data = await response.json()
          setBlogs(data)
      } catch (error) {
          console.error('Error fetching blogs:', error)
      } finally {
          setIsLoading(false)
      }
    }
  
    fetchBlogs()
  }, [])

  const filteredBlogs = Array.isArray(blogs) ? (
    searchTerm.trim() === '' 
      ? blogs 
      : blogs.filter(blog => 
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
  ) : [];

  if (isLoading) {
    return <div className="container mx-auto py-12 px-4 text-center">Loading blogs...</div>
  } 
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Input
          type="search"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md mx-auto"
        />

{filteredBlogs.map((blog) => (
  <article key={blog._id} className="border rounded-lg p-6 hover:shadow-lg transition">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="relative w-full md:w-48 h-48">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          {new Date(blog.date).toLocaleDateString()} • {blog.author}
        </div>
        <h2 className="text-2xl font-bold">{blog.title}</h2>
        <p className="text-muted-foreground">{blog.description}</p>
        <Link href={`/blogpost/${blog.slug}`} className={buttonVariants({ variant: "link" })}>
          Read more →
        </Link>
      </div>
    </div>
  </article>
))}
      </div>
    </div>
  )
}

export default Blog
