"use client"

import { useState } from 'react';
import { Menu, X, ChevronDown, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
  const handleGoogleLogin = () => {
    // Implementasi login Google di sini
    console.log("Google login clicked");
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">Logo</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
              
              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  Services
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <a href="/services/web" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Web Development
                      </a>
                      <a href="/services/mobile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Mobile Development
                      </a>
                      <a href="/services/design" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Design
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <a href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </a>
              
              {/* Auth Buttons */}
              {!isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                  >
                    <User className="h-6 w-6" />
                    <span>Profile</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          My Profile
                        </a>
                        <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Settings
                        </a>
                        <button
                          onClick={() => setIsLoggedIn(false)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="/" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                Home
              </a>
              <a href="/about" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                About
              </a>
              <a href="/services" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                Services
              </a>
              <a href="/contact" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                Contact
              </a>
              {!isLoggedIn && (
                <>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={handleGoogleLogin}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 flex items-center justify-center"
              >
                <img
                  src="/api/placeholder/20/20"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Continue with Google
              </button>
            </form>
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none"
                  placeholder="Create a password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Create Account
              </button>
              <button
                onClick={handleGoogleLogin}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 flex items-center justify-center"
              >
                <img
                  src="/api/placeholder/20/20"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Sign up with Google
              </button>
            </form>
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;