'use client';
import Link from 'next/link';
import profileDefault from '@/app/assets/image/profile.png';
import { useState, useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Container from '../Login/ContainerLogin';
import { usePathname } from 'next/navigation';
import LoginForm from '../Login/LoginForm';
import { Menu, X, ChevronDown } from 'lucide-react';
import ToggleButton from '../Theme/ToggleButton';
import AdBanner from './AdBanner';

export default function Navbar() {
  const { data: session } = useSession();
  const profileImage = session?.user?.image || profileDefault;
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const authMenuRef = useRef(null);
  const loginModalRef = useRef(null);
  const pathname = usePathname();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Determine if we're scrolling up or down
      setIsVisible(
        prevScrollPos > currentScrollPos || // Scrolling up
          currentScrollPos < 10 // At the top
      );

      // Update background opacity based on scroll position
      setIsScrolled(currentScrollPos > 20);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]); // Uncommented to track scroll position state accurately

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

  return (
    <>
      <header>
        <nav
          className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled
              ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg'
              : 'bg-transparent'
          } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >
          {!session && <AdBanner />}
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
                  className={`${
                    pathname === '/'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-200'
                  } hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105`}
                >
                  Home
                </Link>
                <Link
                  href="/project"
                  className={`${
                    pathname === '/project'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-200'
                  } hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105`}
                >
                  Project
                </Link>
                {session && (
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-semibold  flex items-center transition-all duration-200 hover:scale-105"
                    >
                      Tools
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-lg">
                        <div className="py-1">
                          <Link
                            href="/services/web"
                            className={`${
                              pathname === '/services/web'
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-700 dark:text-gray-200'
                            } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 font-semibold`}
                          >
                            Web Development
                          </Link>
                          <Link
                            href="/services/mobile"
                            className={`${
                              pathname === '/services/mobile'
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-700 dark:text-gray-200'
                            } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 font-semibold`}
                          >
                            Mobile Development
                          </Link>
                          <Link
                            href="/services/design"
                            className={`${
                              pathname === '/services/design'
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-700 dark:text-gray-200'
                            } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 font-semibold`}
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
                      className="flex items-center space-x-2 bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200"
                    >
                      <Image
                        src={profileImage}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white dark:border-gray-800"
                      />
                      <span className="hidden md:block">
                        {session.user.name}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="hidden md:flex items-center space-x-2 bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 hover:scale-105"
                    >
                      <span className="font-semibold ">Login</span>
                    </button>
                  )}

                  {isAuthMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 shadow-lg py-1 z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 font-semibold "
                        onClick={() => setIsAuthMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <ToggleButton />
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 font-semibold "
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
            <div className="mx-4 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-lg">
              <div className="px-4 py-3 space-y-3">
                <Link
                  href="/"
                  className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/project"
                  className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Project
                </Link>
                {session && (
                  <>
                    <div className="relative">
                      <button
                        onClick={toggleDropdown}
                        className="w-full text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between"
                      >
                        Tools
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            isDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isDropdownOpen && (
                        <div className="mt-2 rounded-lg bg-gray-50 dark:bg-zinc-800 overflow-hidden">
                          <Link
                            href="/services/web"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-zinc-700 hover:text-blue-600 dark:hover:text-blue-400"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Web Development
                          </Link>
                          <Link
                            href="/services/mobile"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-zinc-700 hover:text-blue-600 dark:hover:text-blue-400"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Mobile Development
                          </Link>
                          <Link
                            href="/services/design"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-zinc-700 hover:text-blue-600 dark:hover:text-blue-400"
                            onClick={() => setIsMobileMenuOpen(false)}
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
                      className="w-full text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
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
                    className="w-full text-center bg-blue-600 dark:bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Login Modal */}
      {isLoginModalOpen && (
        <section className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60]">
          <Container>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex items-center justify-center mb-6">
              <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Harsena Argretya
              </span>
            </div>
            <LoginForm />
          </Container>
        </section>
      )}
    </>
  );
}
