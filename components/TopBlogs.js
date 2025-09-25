import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Blogpost from "@/models/Blogpost";
import Image from "next/image";

async function TopBlogs() {
  await dbConnect();
  const blogs = await Blogpost.find({})
    .sort({ createdAt: -1 })
    .limit(2)
    .lean();

  return (
    <section className="py-8 sm:py-12 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200">
            Latest Blogs
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-500 dark:text-gray-300">
            Check out our most recent blog posts
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article 
              key={blog._id} 
              className="group flex flex-col bg-card hover:bg-accent/5 rounded-2xl p-4 transition-all duration-300 border shadow-sm hover:shadow-md h-full"
            >
              <div className="flex flex-col gap-4">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
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

                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                    {blog.description}
                  </p>

                  <Link 
                    href={`/blogpost/${blog.slug}`} 
                    className={buttonVariants({ 
                      variant: "ghost", 
                      className: "group-hover:translate-x-1 transition-all duration-300 -ml-4 text-primary mt-auto" 
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
