'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

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
        className="px-4 py-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {theme === 'dark' ? '🌙 Dark' : '🌞 Light'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-foreground/20">
          <div className="py-1">
            <button
              className="w-full px-4 py-2 text-left hover:bg-foreground/10"
              onClick={() => {
                setTheme('light');
                setIsOpen(false);
              }}
            >
              🌞 Light Mode
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-foreground/10"
              onClick={() => {
                setTheme('dark');
                setIsOpen(false);
              }}
            >
              🌙 Dark Mode
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-foreground/10"
              onClick={() => {
                setTheme('system');
                setIsOpen(false);
              }}
            >
              💻 System
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
