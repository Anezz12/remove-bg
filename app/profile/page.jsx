import MainContainer from '@/app/components/Settings/MainContainer';
import { getSessionUser } from '../utils/getSessionUser';
import User from '../models/User';
import connectDB from '../config/database';
import { convertToSerializedObject } from '../utils/convertToObject';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Mail, Shield, Clock, User as UserIcon } from 'lucide-react';
import defaultAvatar from '@/app/assets/image/profile.png';

export default async function ProfilePage() {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    console.log('sessionUser Status:', sessionUser);
    if (!sessionUser) {
      redirect('/login');
    }
  } catch (error) {
    console.error('Profile Page Error:', error);
    throw error;
  }

  // Find user by email instead of userId
  const user = await User.findOne({ email: sessionUser.user.email }).lean();
  if (!user) {
    throw new Error('User not found');
  }

  // Convert user data to serializable object
  const serializedUser = convertToSerializedObject(user);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <MainContainer>
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
        {/* Header/Banner Section */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl">
          <div className="absolute -bottom-12 left-8">
            <Image
              src={sessionUser.user.image || defaultAvatar}
              alt={serializedUser.name || 'Profile'}
              width={96}
              height={96}
              className="rounded-full border-4 border-white dark:border-zinc-800"
            />
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 px-8 pb-8">
          {/* Basic Info */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {serializedUser.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              @{serializedUser.username}
            </p>
          </div>

          {/* Detailed Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {serializedUser.email}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
              <Shield className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Role</p>
                <p className="capitalize text-gray-600 dark:text-gray-400">
                  {sessionUser.user.role}
                </p>
              </div>
            </div>

            {/* Provider */}
            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
              <UserIcon className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Sign in Method</p>
                <p className="capitalize text-gray-600 dark:text-gray-400">
                  {serializedUser.provider}
                </p>
              </div>
            </div>

            {/* Join Date */}
            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Joined</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {formatDate(serializedUser.createdAt)}
                </p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {formatDate(serializedUser.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-zinc-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    serializedUser.deletedAt ? 'bg-red-500' : 'bg-green-500'
                  }`}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {serializedUser.deletedAt
                    ? 'Account Deactivated'
                    : 'Account Active'}
                </span>
              </div>
              {serializedUser.deletedAt && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Deactivated on {formatDate(serializedUser.deletedAt)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
