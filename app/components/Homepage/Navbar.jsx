'use client';
import Link from 'next/link';
import profileDefault from '@/app/assets/image/profile.png';
import { useState, useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Container from '../Login/ContainerLogin';
import LoginForm from '../Login/LoginForm';
import { Menu, X, ChevronDown, User } from 'lucide-react';

export default function Navbarr() {
  const { data: session, status } = useSession();
  const profileImage = session?.user?.image || profileDefault;
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const authMenuRef = useRef(null);
  const loginModalRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside of auth menu and login modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authMenuRef.current && !authMenuRef.current.contains(event.target)) {
        setIsAuthMenuOpen(false);
      }
      if (
        loginModalRef.current &&
        !loginModalRef.current.contains(event.target)
      ) {
        setIsLoginModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileMenuOpen(false);
      setIsLoginModalOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
    setIsAuthMenuOpen(false);
  };

  const renderAuthButton = () => {
    if (status === 'loading') {
      return (
        <button className="hidden md:flex items-center space-x-2 bg-white text-green-800 px-4 py-2 rounded-full">
          <span className="w-4 h-4 border-2 border-green-800 border-t-transparent rounded-full animate-spin"></span>
        </button>
      );
    }

    if (session) {
      return (
        <div className="relative" ref={authMenuRef}>
          <button
            onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
            className="flex items-center space-x-2 bg-white text-green-800 px-2 py-1 rounded-full hover:bg-green-100 transition-all duration-300"
          >
            <Image
              src={profileImage}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="hidden md:block">{session.user.username}</span>
          </button>

          {isAuthMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                onClick={() => setIsAuthMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative" ref={authMenuRef}>
        <button
          onClick={() => {
            setIsLoginModalOpen(true);
            setIsAuthMenuOpen(false);
          }}
          className="hidden md:flex items-center space-x-2 bg-white text-green-800 px-4 py-2 rounded-full hover:bg-green-100 transition-all duration-300"
        >
          <span>Login</span>
        </button>

        {isLoginModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
            <Container>
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex items-center justify-center mb-6">
                {/* <Image
                  className="w-8 h-8 mr-2"
                  src={logo}
                  alt="GOMealSaver Logo"
                  priority
                /> */}
                <span className="text-2xl font-semibold text-gray-900">
                  Harsena-Tools
                </span>
              </div>
              <LoginForm />
            </Container>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-green-800 shadow-lg' : 'bg-green-700'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              className="flex items-center space-x-2 transition-transform hover:scale-105"
              href="/"
            >
              {/* <Image
                className="h-12 w-auto"
                src={logo}
                alt="GoMealSaver"
                priority
              /> */}
              <span className="hidden md:block text-white text-xl font-bold">
                Harsena-Tools
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors"
            >
              About
            </Link>
            {session && (
              <div className=" relative">
                <button
                  onClick={toggleDropdown}
                  className="text-white hover:text-green-200 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  Tools
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        href="/services/web"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Web Development
                      </Link>
                      <Link
                        href="/services/mobile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Mobile Development
                      </Link>
                      <Link
                        href="/services/design"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Design
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {renderAuthButton()}

            {/* Notifications - Only show if logged in */}
            {session && (
              <Link href="/messages" aria-label="Messages">
                <button
                  className="relative p-2 text-white hover:text-green-200 transition-colors"
                  type="button"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {/* <UnreadMessageCount /> */}
                </button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-green-200 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[64px] left-0 w-full transition-all duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-3 space-y-4 bg-green-800 shadow-lg min-h-screen">
          <Link
            href="/"
            className="block text-white hover:bg-green-700 px-4 py-3 rounded-lg text-lg transition-colors active:bg-green-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block text-white hover:bg-green-700 px-4 py-3 rounded-lg text-lg transition-colors active:bg-green-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          {session && (
            <>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="w-full text-left text-white hover:bg-green-700 px-4 py-3 rounded-lg text-lg transition-colors active:bg-green-600 flex items-center justify-between"
                >
                  Tools
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="mt-2 w-full rounded-lg bg-white shadow-lg overflow-hidden">
                    <div className="py-2">
                      <Link
                        href="/services/web"
                        className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                      >
                        Web Development
                      </Link>
                      <Link
                        href="/services/mobile"
                        className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                      >
                        Mobile Development
                      </Link>
                      <Link
                        href="/services/design"
                        className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                      >
                        Design
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-white hover:bg-green-700 px-4 py-3 rounded-lg text-lg transition-colors active:bg-green-600"
              >
                Sign Out
              </button>
            </>
          )}

          {!session && (
            <button
              onClick={() => {
                setIsLoginModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left text-white hover:bg-green-700 px-4 py-3 rounded-lg text-lg transition-colors active:bg-green-600"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
