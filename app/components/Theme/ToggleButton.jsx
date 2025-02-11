'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

export default function ToggleButton() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        {theme === 'dark' ? (
          <>
            <MoonIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            <span className="text-gray-800 dark:text-gray-200">Dark</span>
          </>
        ) : theme === 'light' ? (
          <>
            <SunIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            <span className="text-gray-800 dark:text-gray-200">Light</span>
          </>
        ) : (
          <>
            <ComputerDesktopIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            <span className="text-gray-800 dark:text-gray-200">System</span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
          <div className="py-1">
            <button
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-800 dark:text-gray-200
                ${theme === 'light' ? 'bg-gray-50 dark:bg-gray-700/50' : ''}`}
              onClick={() => {
                setTheme('light');
                setIsOpen(false);
              }}
            >
              <SunIcon className="w-5 h-5" />
              Light Mode
            </button>
            <button
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-800 dark:text-gray-200
                ${theme === 'dark' ? 'bg-gray-50 dark:bg-gray-700/50' : ''}`}
              onClick={() => {
                setTheme('dark');
                setIsOpen(false);
              }}
            >
              <MoonIcon className="w-5 h-5" />
              Dark Mode
            </button>
            <button
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-800 dark:text-gray-200
                ${theme === 'system' ? 'bg-gray-50 dark:bg-gray-700/50' : ''}`}
              onClick={() => {
                setTheme('system');
                setIsOpen(false);
              }}
            >
              <ComputerDesktopIcon className="w-5 h-5" />
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
