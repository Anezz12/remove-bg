'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { User, Settings, FileText, Bell, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage({ user, children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Resume', href: '/profile', icon: User },
    { name: 'Progress', href: '/profile/progress', icon: FileText },
    { name: 'Courses', href: '/profile/courses', icon: Bell },
    { name: 'Catalog', href: '/profile/catalog', icon: Bell },
    { name: 'Settings', href: '/profile/setting', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 sm:px-8 pt-20 sm:mt-0 pb-24 lg:pb-0">
      <div className="flex flex-col lg:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-64 bg-white shadow-sm">
          <div className="p-5">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-4 mb-6 w-full hover:bg-gray-50 p-2 rounded-lg"
              >
                <Image
                  src={user?.image || '/default-avatar.png'}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="text-left">
                  <h2 className="font-semibold text-gray-800">{user?.name}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-2 py-2 z-50">
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User size={16} className="mr-2" />
                    View Profile
                  </Link>
                  <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50">
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>

            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg
                      ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Floating Mobile Navigation */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 lg:hidden z-50">
          <nav className="flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-lg">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:pl-8">{children}</div>
      </div>
    </div>
  );
}
