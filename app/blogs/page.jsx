import { RocketIcon } from 'lucide-react';

export default async function BlogsPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 px-8 py-14 rounded-2xl shadow-lg transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex justify-center mb-8">
            <RocketIcon className="text-blue-600 dark:text-blue-400 h-16 w-16 animate-pulse" />
          </div>
          <div className="space-y-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl">
              Coming Soon! 🚀
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              We&apos;re working hard to bring you an amazing blogging
              experience. Stay tuned for exciting content about web development,
              technology, and more!
            </p>
            <div className="pt-4">
              <div className="inline-flex items-center space-x-2 bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full font-semibold">
                <span>Launching Soon</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce [animation-delay:-0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce [animation-delay:-0.1s]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
