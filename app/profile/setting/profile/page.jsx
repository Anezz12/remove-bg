'use client';
import ProfileDefault from '@/app/assets/image/profile.png';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
export default function ProfileSettingProfilePage() {
  const { data: session } = useSession();

  const [error, setError] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const MAX_SIZE = 1024 * 1024; // 1MB

    if (file.size > MAX_SIZE) {
      setError('File size is too large. Max 1MB');
      e.target.value = null;
      return;
    }

    setError('');
  };

  const profileImage = session?.user?.image || ProfileDefault;
  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-2">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h1>
        <p className="max-w-lg text-xl font-semibold text-gray-600 mb-8">
          Masukkan informasi yang valid <br /> agar proses lebih mudah
        </p>
        <div className="bg-white rounded-lg shadow-md p-8">
          <form className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
                <label
                  htmlFor="avatar"
                  className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600"
                >
                  <input
                    type="file"
                    id="avatar"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </label>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <p className="text-sm text-gray-500">
                Click to change profile picture
              </p>
            </div>

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name <span className="text-gray-400">(max 50 characters)</span>
              </label>
              <input
                type="text"
                id="name"
                maxLength={50}
                defaultValue={session?.user?.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username{' '}
                <span className="text-gray-400">(max 20 characters)</span>
              </label>
              <input
                type="text"
                id="username"
                maxLength={20}
                defaultValue={session?.user?.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                defaultValue={session?.user?.email}
                disabled
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* City Field */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
