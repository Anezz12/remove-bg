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
                  Harsena Argretya
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
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-lg'
          : 'bg-transparent'
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
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Harsena Argretya
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
            >
              Home
            </Link>
            <Link
              href="/project"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
            >
              Project
            </Link>
            {session && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-200 hover:scale-105"
                >
                  Tools
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white/80 backdrop-blur-md border border-gray-200">
                    <div className="py-1">
                      <Link
                        href="/services/web"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Web Development
                      </Link>
                      <Link
                        href="/services/mobile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Mobile Development
                      </Link>
                      <Link
                        href="/services/design"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Design
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Auth Button */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={authMenuRef}>
              {session ? (
                <button
                  onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-200"
                >
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white"
                  />
                  <span className="hidden md:block">{session.user.name}</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                >
                  <span>Login</span>
                </button>
              )}

              {isAuthMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg py-1 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-[80px] transition-all duration-300 ease-in-out z-50 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="mx-4 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/project"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Project
            </Link>
            {session && (
              <>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between"
                  >
                    Tools
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="mt-2 rounded-lg bg-gray-50 overflow-hidden">
                      <Link
                        href="/services/web"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Web Development
                      </Link>
                      <Link
                        href="/services/mobile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Mobile Development
                      </Link>
                      <Link
                        href="/services/design"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Design
                      </Link>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
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
                className="w-full text-center bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]">
          <Container>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex items-center justify-center mb-6">
              <span className="text-2xl font-semibold text-gray-900">
                Harsena Argretya
              </span>
            </div>
            <LoginForm />
          </Container>
        </div>
      )}
    </nav>
  );
}
