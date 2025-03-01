import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import connectDB from '@/app/config/database';
import Blog from '@/app/models/Blog';
import { convertToSerializedObject } from '@/app/utils/convertToObject';
import User from '@/app/models/User';
import defaultAvatar from '@/app/assets/image/profile.png';

// Calculate read time based on content length
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default async function BlogsPage() {
  // Connect to database
  await connectDB();

  // Fetch blog posts with creator information
  const blogs = await Blog.find({})
    .sort({ createdAt: -1 })
    .populate('creator')
    .lean();

  // Serialize blog data for the client
  const serializedBlogs = blogs.map((blog) => {
    const serialized = convertToSerializedObject(blog);

    // Calculate read time
    serialized.readTime = calculateReadTime(blog.content);

    // Format date
    const date = new Date(blog.createdAt);
    serialized.formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    // Format the creator/author information
    serialized.author = {
      name: blog.creator?.name || 'Anonymous',
      avatar: blog.creator?.image || defaultAvatar,
    };

    return serialized;
  });

  return (
    <div className="min-h-screen px-20 pt-20 md:px-0 md:pt-10 bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Latest Posts
          </h1>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {serializedBlogs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {serializedBlogs.map((post) => (
              <Link href={`/blogs/${post._id}`} key={post._id}>
                <article className="flex flex-col group cursor-pointer">
                  {/* Post Image */}
                  <div className="relative aspect-[16/9] mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={
                        post.image ||
                        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop'
                      }
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>

                  {/* Post Content */}
                  <div className="flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-2 dark:text-gray-400">
                      {post.content.substring(0, 150)}...
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {post.author.name}
                        </p>
                        <div className="flex text-xs text-gray-500 dark:text-gray-400">
                          <span>{post.formattedDate}</span>
                          <span className="mx-1">·</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-4">
              No blog posts yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">
              Check back later for new content or be the first to create a post!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
