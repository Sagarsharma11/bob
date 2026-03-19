'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600 hover:from-blue-600 hover:to-orange-500 transition-all"
          >
            <Image
              src="/images/BOB.png"
              alt="Blasters of Bharat"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <span className="hidden sm:inline">Blasters of Bharat</span>
            <span className="sm:hidden">BoB</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-semibold transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-semibold transition-colors"
            >
              Blogs
            </Link>
            <div className="flex items-center space-x-2">
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <DarkModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-orange-500"
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
                  strokeWidth={2}
                  d={
                    isOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Blogs
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
