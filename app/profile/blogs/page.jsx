import Link from 'next/link';
import MainContainer from '@/app/components/Settings/MainContainer';
import { PenSquare, LayoutDashboard } from 'lucide-react';

export default function BlogsPage() {
  return (
    <MainContainer>
      <div className=" pt-20 px-6  dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Manage Your Blogs
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create and manage your blog content from one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Create Blog Card */}
            <div className="group bg-white dark:bg-zinc-800/50 rounded-xl shadow-sm hover:shadow-md dark:shadow-zinc-800/30 p-8 hover:scale-[1.02] transition-all duration-300 border border-gray-100 dark:border-zinc-700/50">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <PenSquare className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  Create New Blog
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                  Share your thoughts and ideas with the world
                </p>
                <Link href="/profile/blogs/add" className="w-full">
                  <button className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300 font-medium shadow-sm hover:shadow">
                    Start Writing
                  </button>
                </Link>
              </div>
            </div>

            {/* Blog Dashboard Card */}
            <div className="group bg-white dark:bg-zinc-800/50 rounded-xl shadow-sm hover:shadow-md dark:shadow-zinc-800/30 p-8 hover:scale-[1.02] transition-all duration-300 border border-gray-100 dark:border-zinc-700/50">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <LayoutDashboard className="h-8 w-8 text-green-500 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  Blog Dashboard
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                  Manage and track your published content
                </p>
                <Link href="/profile/blogs/dashboard" className="w-full">
                  <button className="w-full bg-green-500 dark:bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-300 font-medium shadow-sm hover:shadow">
                    View Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
