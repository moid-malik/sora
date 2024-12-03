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
      setIsLoading(false)
      return
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

  if (isLoading) {
    return <div className="container mx-auto py-12 px-4 text-center">Loading blogs...</div>
  }

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Please Login to View Blogs</h1>
        <p className="mb-8 text-muted-foreground">You need to be logged in to access the blog content.</p>
        <div className="space-x-4">
          <Link href="/login" className={buttonVariants({ variant: "default" })}>
            Login
          </Link>
          <Link href="/register" className={buttonVariants({ variant: "outline" })}>
            Register
          </Link>
        </div>
      </div>
    )
  }

  const filteredBlogs = Array.isArray(blogs) ? (
    searchTerm.trim() === '' 
      ? blogs 
      : blogs.filter(blog => 
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
  ) : [];

  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto py-8 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <Input
            type="search"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md mx-auto"
          />

          {filteredBlogs.map((blog) => (
            <article key={blog._id} className="border rounded-lg p-4 sm:p-6 hover:shadow-lg transition">
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                <div className="relative w-full md:w-48 h-48 shrink-0">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {new Date(blog.date).toLocaleDateString()} • {blog.author}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold break-words">
                    {blog.title.length > 94 ? `${blog.title.substring(0, 94)}...` : blog.title}
                  </h2>
                  <p className="text-muted-foreground break-words">
                    {blog.description.length > 130 ? `${blog.description.substring(0, 130)}...` : blog.description}
                  </p>
                  <Link href={`/blogpost/${blog.slug}`} className={buttonVariants({ variant: "link" })}>
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
