import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Modern Web Development',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    date: 'Dec 20, 2023',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop',
    tags: ['Web Development', 'JavaScript', 'React'],
  },
  {
    id: 2,
    title: 'Getting Started with Next.js 13',
    excerpt:
      'Next.js has revolutionized the way we build React applications. Learn how to get started with the latest version.',
    author: {
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    date: 'Dec 22, 2023',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    tags: ['Next.js', 'React', 'Tutorial'],
  },
  {
    id: 3,
    title: 'Mastering CSS Grid Layout',
    excerpt:
      'CSS Grid has changed the game for web layouts. Discover how to create complex layouts with ease.',
    author: {
      name: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    date: 'Dec 25, 2023',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop',
    tags: ['CSS', 'Web Design', 'Layout'],
  },
  {
    id: 4,
    title: 'TypeScript Best Practices',
    excerpt:
      'Learn the best practices for writing clean and maintainable TypeScript code in your projects.',
    author: {
      name: 'Sarah Wilson',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    date: 'Dec 28, 2023',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
  },
  {
    id: 5,
    title: 'Building REST APIs with Node.js',
    excerpt:
      'A comprehensive guide to building scalable REST APIs using Node.js and Express.',
    author: {
      name: 'Alex Brown',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    date: 'Jan 2, 2024',
    readTime: '10 min read',
    image:
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&auto=format&fit=crop',
    tags: ['Node.js', 'API', 'Backend'],
  },
  {
    id: 6,
    title: 'Introduction to TailwindCSS',
    excerpt:
      'Learn how to build modern user interfaces quickly with TailwindCSS utility-first approach.',
    author: {
      name: 'Emily Davis',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
    date: 'Jan 5, 2024',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&auto=format&fit=crop',
    tags: ['CSS', 'TailwindCSS', 'Frontend'],
  },
];

export default function BlogsPage() {
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link href={`/blogs/${post.id}`} key={post.id}>
              <article className="flex flex-col group cursor-pointer">
                {/* Post Image */}
                <div className="relative aspect-[16/9] mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
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
                    {post.excerpt}
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
                        <span>{post.date}</span>
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
      </main>
    </div>
  );
}
