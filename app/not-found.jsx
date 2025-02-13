import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 px-8 py-14 rounded-2xl shadow-lg transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex justify-center mb-8">
            <FaExclamationTriangle className="text-blue-600 dark:text-blue-400 text-7xl animate-pulse" />
          </div>
          <div className="space-y-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl">
              Page Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Sorry, we couldn't find the page you're looking for. Please check
              the URL or navigate back home.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 hover:scale-105 font-semibold"
              >
                <span>Return Home</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
