'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
      (!('darkMode' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleDarkMode}
      className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 ease-in-out hover:scale-110 active:scale-95 group"
      style={{
        background: isDark
          ? 'linear-gradient(145deg, #1e293b, #0f172a)'
          : 'linear-gradient(145deg, #fef3c7, #fde68a)',
        boxShadow: isDark
          ? '0 0 16px rgba(147, 130, 255, 0.3), inset 0 1px 2px rgba(255,255,255,0.1)'
          : '0 0 16px rgba(251, 191, 36, 0.4), inset 0 1px 2px rgba(255,255,255,0.5)',
        border: isDark ? '2px solid rgba(147, 130, 255, 0.4)' : '2px solid rgba(251, 191, 36, 0.5)',
      }}
      aria-label="Toggle dark mode"
    >
      {/* Sun Icon */}
      <div
        className="absolute transition-all duration-500 ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? 'rotate(-90deg) scale(0)' : 'rotate(0deg) scale(1)',
        }}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          {/* Sun rays */}
          <g className="origin-center" style={{ animation: isDark ? 'none' : 'spin-slow 8s linear infinite' }}>
            <line x1="12" y1="1" x2="12" y2="4" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="20" x2="12" y2="23" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="12" x2="4" y2="12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="12" x2="23" y2="12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          </g>
          {/* Sun circle */}
          <circle cx="12" cy="12" r="5" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
        </svg>
      </div>

      {/* Moon Icon */}
      <div
        className="absolute transition-all duration-500 ease-in-out"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0)',
        }}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          {/* Moon */}
          <path
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            fill="#c4b5fd"
            stroke="#8b5cf6"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Stars */}
          <circle cx="18" cy="5" r="1" fill="#e9d5ff" className="animate-twinkle" />
          <circle cx="20" cy="9" r="0.6" fill="#e9d5ff" className="animate-twinkle-delayed" />
          <circle cx="16" cy="3" r="0.5" fill="#e9d5ff" className="animate-twinkle" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes twinkle-delayed {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-twinkle-delayed {
          animation: twinkle-delayed 2s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
}
