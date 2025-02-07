import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions';
import profileDefault from '@/app/assets/image/profile.png';
import { redirect } from 'next/navigation';
import { User, Settings, FileText, Bell } from 'lucide-react';
import Link from 'next/link';

export default async function ProfilePage({ children }) {
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
                src={user.image || profileDefault}
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
                href="/profile"
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

        {children}
      </div>
    </div>
  );
}
