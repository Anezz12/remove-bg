import { FileText } from 'lucide-react';
import MainContainer from '@/app/components/Settings/MainContainer';

export default async function ProfilePage() {
  return (
    <>
      <MainContainer>
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Total Projects
                </h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
                  12
                </p>
                <div className="flex items-center mt-4">
                  <span className="text-green-500 dark:text-green-400 text-sm font-medium">
                    ↑ 7%
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Contributions
                </h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
                  158
                </p>
                <div className="flex items-center mt-4">
                  <span className="text-green-500 dark:text-green-400 text-sm font-medium">
                    ↑ 12%
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Activity Score
                </h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
                  92%
                </p>
                <div className="flex items-center mt-4">
                  <span className="text-green-500 dark:text-green-400 text-sm font-medium">
                    ↑ 3%
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-zinc-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center p-4 border border-gray-100 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-900/50"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-4">
                      <FileText
                        className="text-blue-600 dark:text-blue-400"
                        size={20}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        Updated Project Documentation
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
}
