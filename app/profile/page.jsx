import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '../utils/authOptions';
import { redirect } from 'next/navigation';
import { User, Settings, FileText, Bell } from 'lucide-react';
import Link from 'next/link';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const user = session.user;
  return (
    <div className="min-h-screen bg-gray-50 sm:px-8 pt-20 sm:mt-0">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-64 bg-white shadow-sm lg:h-screen">
          <div className="p-5">
            <div className="flex items-center space-x-4 mb-6">
              <Image
                src={user.image || '/default-avatar.png'}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h2 className="font-semibold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <Link
                href="#"
                className="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-600"
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                <FileText size={20} />
                <span>Projects</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                <Bell size={20} />
                <span>Notifications</span>
              </Link>
              <Link
                href="profile/setting"
                className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                <Settings size={20} />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium">
                  Total Projects
                </h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
                <div className="flex items-center mt-4">
                  <span className="text-green-500 text-sm font-medium">
                    ↑ 7%
                  </span>
                  <span className="text-gray-400 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium">
                  Contributions
                </h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">158</p>
                <div className="flex items-center mt-4">
                  <span className="text-green-500 text-sm font-medium">
                    ↑ 12%
                  </span>
                  <span className="text-gray-400 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium">
                  Activity Score
                </h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">92%</p>
                <div className="flex items-center mt-4">
                  <span className="text-green-500 text-sm font-medium">
                    ↑ 3%
                  </span>
                  <span className="text-gray-400 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center p-4 border rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <FileText className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800">
                        Updated Project Documentation
                      </h3>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
