import Image from 'next/image';

export default async function BlogsPage() {
  return (
    <article className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section with Gradient Overlay */}
      <div className="relative h-[60vh] bg-gradient-to-b from-black/60 to-black/20">
        <Image
          src="/blog-featured.jpg"
          alt="Featured Image"
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
              {['Web Development', 'JavaScript', 'React'].map((tag) => (
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
              Understanding Modern Web Development
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Author Section */}
        <div className="flex items-center space-x-4 -mt-8 mb-12 relative z-10">
          <div className="p-1 bg-white dark:bg-gray-900 rounded-full">
            <Image
              src="/author-avatar.jpg"
              alt="Author"
              width={56}
              height={56}
              className="rounded-full border-2 border-white dark:border-gray-800"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  John Doe
                </h3>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span>Dec 20, 2023</span>
                  <span className="mx-2">·</span>
                  <span>5 min read</span>
                </div>
              </div>
              <button className="px-6 py-2 rounded-full text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors shadow-sm">
                Follow
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none">
          <p className="text-xl leading-relaxed mb-8 font-serif text-gray-800 dark:text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <h2 className="font-serif text-3xl mt-12 mb-6 text-gray-900 dark:text-white">
            The Evolution of Web Development
          </h2>

          <p className="font-serif text-gray-700 dark:text-gray-300">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>

          {/* Code Snippet */}
          <pre className="my-8 p-4 rounded-xl bg-gray-900 dark:bg-black overflow-x-auto">
            <code className="text-sm font-mono text-gray-200">
              {`const greeting = () => {
  console.log("Hello, World!");
}`}
            </code>
          </pre>

          {/* Article Image */}
          <figure className="my-12">
            <div className="relative aspect-[16/9]">
              <Image
                src="/article-image.jpg"
                alt="Article Image"
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <figcaption className="mt-3 text-sm text-center text-gray-600 dark:text-gray-400">
              Caption for the image goes here
            </figcaption>
          </figure>
        </div>

        {/* Engagement Section */}
        <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 hover:scale-105 transition-transform">
                <span className="text-2xl">👏</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  2.5K
                </span>
              </button>
              <button className="flex items-center space-x-2 hover:scale-105 transition-transform">
                <span className="text-2xl">💬</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  125
                </span>
              </button>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-2xl hover:scale-105 transition-transform">
                🔖
              </button>
              <button className="text-2xl hover:scale-105 transition-transform">
                📤
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
