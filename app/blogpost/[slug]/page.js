import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import dbConnect from '@/lib/dbConnect';
import Blogpost from '@/models/Blogpost';
import { notFound } from "next/navigation";
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers';
import OnThisPage from "@/components/onthispage";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { serializeData } from '@/lib/utils';
import Comments from '@/components/Comments';
import User from '@/models/User';
export default async function Page({ params }) {
    const cookieStore = cookies();
    const user = cookieStore.get('user');
    await dbConnect();
    
    const blogpost = await Blogpost.findOne({ slug: params.slug })
  .populate({
    path: 'comments.author',
    model: User
  })
  .lean();

      const serializedBlogpost = serializeData(blogpost);

       

    if (!blogpost) {
        notFound();
        return;
    }

    const processor = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeDocument, { title: '👋🌍' })
        .use(rehypeFormat)
        .use(rehypeStringify)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)
        .use(rehypePrettyCode, {
            theme: "github-dark",
            transformers: [
                transformerCopyButton({
                    visibility: 'always',
                    feedbackDuration: 3_000,
                }),
            ],
        });

    const htmlContent = (await processor.process(blogpost.content)).toString();

    return (
        user ? (
            <div className="max-w-6xl mx-auto p-4">
                <h1  className="text-4xl font-bold mb-4 lg:max-w-[46vw]">{blogpost.title}</h1>
                <p className="text-base mb-2 border-l-4 lg:max-w-[45vw] border-gray-500 pl-4 italic">&quot;{blogpost.description}&quot;</p>
                <div className="flex gap-2">
                    <p className="text-sm text-gray-500 mb-4 italic">By {blogpost.author}</p>
                    <p className="text-sm text-gray-500 mb-4">{new Date(blogpost.date).toLocaleDateString()}</p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="prose dark:prose-invert"></div>
                <OnThisPage htmlContent={htmlContent} />
                <Comments 
    blogId={serializedBlogpost._id} 
    comments={serializedBlogpost.comments}
    currentUser={JSON.parse(user.value)}
/>
            </div>
        ) : (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Welcome to Sora
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Join our community to access insightful articles and development experiences
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <Button variant="default" size="lg" className="w-full sm:w-auto">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Create account</Button>
            </Link>
          </div>
        </div>
      </div>
        )
    );
}
