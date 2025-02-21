import { RocketIcon } from 'lucide-react';
import Image from 'next/image';
export default async function BlogsPage() {
  return (
    // <section className="min-h-screen flex items-center justify-center px-4 sm:px-8">
    //   <div className="w-full max-w-2xl mx-auto">
    //     <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 px-8 py-14 rounded-2xl shadow-lg transform hover:scale-[1.01] transition-all duration-300">
    //       <div className="flex justify-center mb-8">
    //         <RocketIcon className="text-blue-600 dark:text-blue-400 h-16 w-16 animate-pulse" />
    //       </div>
    //       <div className="space-y-6 text-center">
    //         <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl">
    //           Coming Soon! 🚀
    //         </h1>
    //         <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
    //           We&apos;re working hard to bring you an amazing blogging
    //           experience. Stay tuned for exciting content about web development,
    //           technology, and more!
    //         </p>
    //         <div className="pt-4">
    //           <div className="inline-flex items-center space-x-2 bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full font-semibold">
    //             <span>Launching Soon</span>
    //             <div className="flex space-x-1">
    //               <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
    //               <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce [animation-delay:-0.2s]" />
    //               <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce [animation-delay:-0.1s]" />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <article className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-16">
          {/* Author Info */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 relative">
              <Image
                src="/author-avatar.jpg"
                alt="Author"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-base">John Doe</h3>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span>Dec 20, 2023</span>
                    <span className="mx-2">·</span>
                    <span>5 min read</span>
                  </div>
                </div>
                <button className="px-4 py-1.5 rounded-full text-sm bg-green-600 text-white hover:bg-green-700 transition-colors">
                  Follow
                </button>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-8">
            Understanding Modern Web Development
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['Web Development', 'JavaScript', 'React'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-12">
            <Image
              src="/blog-featured.jpg"
              alt="Featured Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Article Content */}
        <div className="prose lg:prose-xl dark:prose-invert max-w-none">
          <p className="text-xl leading-relaxed mb-8 font-serif">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <h2 className="font-serif">The Evolution of Web Development</h2>
          <p className="font-serif">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>

          {/* Code Snippet */}
          <pre className="p-4 rounded-lg my-6 overflow-x-auto bg-gray-100 dark:bg-gray-800">
            <code className="text-sm font-mono">
              {`const greeting = () => {
console.log("Hello, World!");
}`}
            </code>
          </pre>

          {/* Article Image */}
          <div className="relative w-full aspect-[16/9] my-12">
            <Image
              src="/article-image.jpg"
              alt="Article Image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Engagement Section */}
        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 px-4 md:px-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                <span className="text-2xl">👏</span>
                <span className="text-sm">2.5K</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                <span className="text-2xl">💬</span>
                <span className="text-sm">125</span>
              </button>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                🔖
              </button>
              <button className="text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                📤
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
