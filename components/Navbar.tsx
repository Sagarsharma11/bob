'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when side drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/blog', label: 'Blogs', icon: '📝' },
    { href: '/blog/blasters-of-bharat-match-gallery', label: 'Gallery', icon: '🖼️' },
    { href: '/blog/blasters-of-bharat-team-stats', label: 'Team Stats', icon: '📊' },
  ];

  const moreLinks = [
    { href: '/captains', label: 'Captains Corner', icon: '👑' },
    { href: '/toss', label: 'Coin Toss', icon: '🪙' },
  ];

  return (
    <>
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
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-semibold transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-semibold transition-colors"
                >
                  More
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {moreOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-dropdown">
                    {moreLinks.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 dark:hover:from-orange-900/30 dark:hover:to-blue-900/30 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-all duration-200"
                      >
                        <span className="text-xl">{link.icon}</span>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <DarkModeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <DarkModeToggle />
              <button
                onClick={() => setIsOpen(true)}
                className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes dropdown {
            from { opacity: 0; transform: translateY(-8px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-dropdown {
            animation: dropdown 0.15s ease-out;
          }
        `}</style>
      </nav>

      {/* ======== Mobile Side Drawer ======== */}
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side drawer panel */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-72 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200 dark:border-gray-800">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2"
          >
            <Image
              src="/images/BOB.png"
              alt="Blasters of Bharat"
              width={36}
              height={36}
              className="w-9 h-9 rounded-full"
            />
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">
              BoB
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Nav Links */}
        <div className="flex flex-col px-3 py-4 space-y-1 overflow-y-auto h-[calc(100%-80px)]">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 dark:hover:from-orange-900/20 dark:hover:to-blue-900/20 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-all duration-200"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-lg w-7 text-center">{link.icon}</span>
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="pt-3 pb-1 px-4">
            <div className="border-t border-gray-200 dark:border-gray-700" />
            <p className="pt-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              More
            </p>
          </div>

          {moreLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 dark:hover:from-orange-900/20 dark:hover:to-blue-900/20 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-all duration-200"
              style={{ animationDelay: `${(navLinks.length + i) * 50}ms` }}
            >
              <span className="text-lg w-7 text-center">{link.icon}</span>
              {link.label}
            </Link>
          ))}

          {/* Bottom accent */}
          <div className="mt-auto pt-6 px-4">
            <div className="h-1 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 opacity-50" />
          </div>
        </div>
      </div>
    </>
  );
}
