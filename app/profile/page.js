'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PenSquare, Trash2 } from 'lucide-react'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [userBlogs, setUserBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
    fetchUserBlogs()
  }, [])

  const fetchUserBlogs = async () => {
    const userData = JSON.parse(localStorage.getItem('user'))
    try {
      const response = await fetch('/api/blogposts')
      const data = await response.json()
      const userBlogPosts = data.filter(blog => blog.author === userData.username)
      setUserBlogs(userBlogPosts)
    } catch (error) {
      console.error('Error fetching user blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }
  

  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(`/api/blogposts/${blogId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchUserBlogs()
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 bg-card rounded-lg p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-muted rounded-full p-8">
              <span className="text-4xl font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{user?.username}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Blogs</h2>
            <Button asChild>
              <Link href="/profile/create-blog" className="flex items-center gap-2">
                <PenSquare size={18} />
                Write a Blog
              </Link>
            </Button>
          </div>

          {userBlogs.length === 0 ? (
            <div className="text-center py-16 bg-muted/30 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
              <p className="text-muted-foreground mb-6">Share your thoughts with the world by creating your first blog post</p>
              <Button asChild>
                <Link href="/profile/create-blog">Create Your First Blog</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {userBlogs.map((blog) => (
                <article key={blog._id} className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative w-full md:w-48 h-48">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="text-sm text-muted-foreground">
                        Published on {new Date(blog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <h2 className="text-2xl font-bold">{blog.title}</h2>
                      <p className="text-muted-foreground line-clamp-2">{blog.description}</p>
                      <div className="flex gap-4">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/profile/edit-blog/${blog._id}`}>
                            <PenSquare size={16} className="mr-2" />
                            Edit
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/blogpost/${blog.slug}`}>
                           View blog →
                           </Link>
                           </Button>
                        <Button 
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
