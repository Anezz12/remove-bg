import Link from 'next/link';
import MainContainer from '@/app/components/Settings/MainContainer';

export default function ProfileSettingPage() {
  return (
    <>
      <MainContainer>
        <div className="min-h-52 pt-20 px-6 bg-gray-50 dark:bg-zinc-900">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100">
              Settings
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Password Change Card */}
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-800/50 p-6 hover:shadow-lg transition duration-300 border border-gray-100 dark:border-zinc-700/50">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-500 dark:text-blue-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    Change Password
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                    Update your password to keep your account secure
                  </p>
                  <Link href="/profile/setting/password">
                    <button className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-300">
                      Change Password
                    </button>
                  </Link>
                </div>
              </div>

              {/* Profile Update Card */}
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-800/50 p-6 hover:shadow-lg transition duration-300 border border-gray-100 dark:border-zinc-700/50">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-500 dark:text-blue-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    Edit Profile
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                    Update your personal information and preferences
                  </p>
                  <Link href="/profile/setting/profile">
                    <button className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-300">
                      Edit Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
}
