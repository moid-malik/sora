import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Blogpost from "@/models/Blogpost";
import Image from "next/image";

async function TopBlogs() {
  await dbConnect();
  const blogs = await Blogpost.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            Latest Blogs
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Check out our most recent blog posts
          </p>
        </div>
        <div className="flex flex-col gap-4 flex-wrap justify-center">
          {blogs.map((blog) => (
            <article 
            key={blog._id} 
            className="group relative bg-card hover:bg-accent/5 rounded-2xl p-4 sm:p-6 transition-all duration-300 border shadow-sm hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="relative w-full sm:w-48 h-48 rounded-xl overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="space-y-3 sm:space-y-4 flex-1">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <time dateTime={blog.date}>
                    {new Date(blog.date).toLocaleDateString('en-GB', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </time>
                  <span>•</span>
                  <span>{blog.author}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {blog.title.length > 23 ? `${blog.title.slice(0, 23)}...` : blog.title}
                </h2>

                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {blog.description}
                </p>

                <Link 
                  href={`/blogpost/${blog.slug}`} 
                  className={buttonVariants({ 
                    variant: "ghost", 
                    className: "group-hover:translate-x-1 transition-all duration-300 -ml-4 text-primary mt-2" 
                  })}
                >
                  Read more →
                </Link>
              </div>
            </div>
          </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopBlogs;
