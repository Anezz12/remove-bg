import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import connectDB from '@/app/config/database';
import Blog from '@/app/models/Blog';
import { convertToSerializedObject } from '@/app/utils/convertToObject';
import defaultAvatar from '@/app/assets/image/profile.png';

// Calculate read time based on content length
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default async function BlogPostPage({ params }) {
  await connectDB();

  // Fetch the blog post by ID
  const blog = await Blog.findById(params.slug).populate('creator').lean();

  if (!blog) {
    return notFound();
  }

  // Serialize the blog data
  const post = convertToSerializedObject(blog);

  // Calculate read time
  const readTime = calculateReadTime(post.content);

  // Format date
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Get author info
  const author = {
    name: blog.creator?.name || 'Anonymous',
    image: blog.creator?.image || defaultAvatar,
  };

  return (
    <article className="min-h-screen ">
      {/* Hero Section with Gradient Overlay */}
      <div className="relative h-[60vh] bg-gradient-to-b from-black/60 to-black/20">
        <Image
          src={post.image || defaultImage}
          alt={post.title}
          fill
          className="object-cover -z-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />

        {/* Hero Content */}
        <div className="relative h-full max-w-4xl mx-auto px-4 flex flex-col justify-end pb-16">
          <div className="text-white space-y-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-white/10 backdrop-blur-sm hover:bg-white/20 cursor-pointer transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Author Section */}
        <div className="flex items-center space-x-4 -mt-8 mb-12 relative z-10">
          <div className="p-1 bg-white dark:bg-gray-900 rounded-full">
            <Image
              src={author.image}
              alt={author.name}
              width={56}
              height={56}
              className="rounded-full border-2 border-white dark:border-gray-800"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {author.name}
                </h3>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span>{formattedDate}</span>
                  <span className="mx-2">·</span>
                  <span>{readTime}</span>
                </div>
              </div>
              <button className="px-6 py-2 rounded-full text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors shadow-sm">
                Follow
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none mb-24">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  await connectDB();

  const blogs = await Blog.find({}).lean();

  return blogs.map((blog) => ({
    slug: blog._id.toString(),
  }));
}
