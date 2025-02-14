'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    hasNumber: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasMinLength: false,
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      validatePasswordStrength(value);
    }
  };

  const validatePasswordStrength = (password) => {
    setPasswordStrength({
      hasNumber: /\d/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasMinLength: password.length >= 8,
    });
  };

  const validateForm = () => {
    const { hasNumber, hasUpperCase, hasLowerCase, hasMinLength } =
      passwordStrength;

    if (!(hasNumber && hasUpperCase && hasLowerCase && hasMinLength)) {
      setError('Password must meet all requirements');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const recaptchaToken = await executeRecaptcha();

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      }).then((result) => {
        if (result?.error) {
          throw new Error(result.error);
        }
        router.push('/');
      });
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const executeRecaptcha = async () => {
    try {
      return await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: 'register' }
      );
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      throw new Error('Failed to execute reCAPTCHA');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg dark:shadow-zinc-800/50 border border-gray-100 dark:border-zinc-700">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Create your account
          </h2>
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/50 border-l-4 border-red-500 dark:border-red-600 text-red-700 dark:text-red-400">
              {error}
            </div>
          )}
        </div>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100"
                placeholder="you@example.com"
              />
            </div>

            {/* Username Input */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100"
                placeholder="johndoe"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100"
                placeholder="••••••••"
              />
              <div className="mt-2 space-y-1 text-sm">
                <p
                  className={`flex items-center ${
                    passwordStrength.hasMinLength
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {passwordStrength.hasMinLength ? '✓' : '○'} At least 8
                  characters
                </p>
                <p
                  className={`flex items-center ${
                    passwordStrength.hasUpperCase
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {passwordStrength.hasUpperCase ? '✓' : '○'} One uppercase
                  letter
                </p>
                <p
                  className={`flex items-center ${
                    passwordStrength.hasNumber
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {passwordStrength.hasNumber ? '✓' : '○'} One number
                </p>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              have an account?
              <Link
                href="/login"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              >
                {' Login'}
              </Link>
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              This site is protected by reCAPTCHA and the Google{' '}
              <a
                href="https://policies.google.com/privacy"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                href="https://policies.google.com/terms"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>{' '}
              apply.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
