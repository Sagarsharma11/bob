'use client';

import { useState, useEffect } from 'react';
import captainsData from '../../data/captains.json';

type SortKey = 'leadershipRating' | 'winPercentage' | 'matchesPlayed' | 'wins';

interface Captain {
  name: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  winPercentage: number;
  leadershipRating: number;
}

const rankColors = [
  {
    badge: 'from-yellow-300 via-yellow-400 to-amber-500',
    border: 'from-yellow-400 via-amber-400 to-yellow-600',
    glow: 'shadow-yellow-400/30',
    icon: '👑',
    label: 'Champion Leader',
  },
  {
    badge: 'from-gray-300 via-slate-300 to-gray-400',
    border: 'from-gray-300 via-slate-400 to-gray-500',
    glow: 'shadow-slate-400/20',
    icon: '🥈',
    label: 'Vice Captain',
  },
  {
    badge: 'from-amber-600 via-orange-700 to-amber-800',
    border: 'from-amber-600 via-orange-600 to-amber-700',
    glow: 'shadow-amber-600/20',
    icon: '🥉',
    label: 'Rising Star',
  },
];

function CircularProgress({ value, max, size = 80, strokeWidth = 6, color }: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (value / max) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ strokeDashoffset }}
        />
      </svg>
      <span className="absolute text-sm font-bold text-gray-800 dark:text-gray-200">
        {value.toFixed(value % 1 === 0 ? 0 : 1)}
      </span>
    </div>
  );
}

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-gray-500 dark:text-gray-400">{label}</span>
        <span className="text-gray-700 dark:text-gray-300">{value}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function CaptainsCorner() {
  const [sortBy, setSortBy] = useState<SortKey>('leadershipRating');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sorted: Captain[] = [...captainsData.captains].sort((a, b) => {
    if (sortBy === 'leadershipRating') return b.leadershipRating - a.leadershipRating;
    if (sortBy === 'winPercentage') return b.winPercentage - a.winPercentage;
    if (sortBy === 'matchesPlayed') return b.matchesPlayed - a.matchesPlayed;
    return b.wins - a.wins;
  });

  const maxMatches = Math.max(...sorted.map(c => c.matchesPlayed));
  const maxWins = Math.max(...sorted.map(c => c.wins));
  const maxLosses = Math.max(...sorted.map(c => c.losses));

  const sortOptions: { key: SortKey; label: string; icon: string }[] = [
    { key: 'leadershipRating', label: 'Leadership', icon: '⭐' },
    { key: 'winPercentage', label: 'Win %', icon: '📊' },
    { key: 'matchesPlayed', label: 'Matches', icon: '🏏' },
    { key: 'wins', label: 'Wins', icon: '🏆' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-10 px-4 sm:px-6">
      {/* Hero Header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-semibold mb-4">
          <span className="text-lg">👑</span> Captains Corner
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 mb-3 leading-tight">
          Leadership Hall of Fame
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
          Celebrating every captain who has led Blasters of Bharat. Ranked by performance, driven by passion.
        </p>
      </div>

      {/* Sort Controls */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-1">Rank by:</span>
          {sortOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                ${sortBy === opt.key
                  ? 'bg-gradient-to-r from-orange-500 to-blue-600 text-white shadow-lg shadow-orange-500/25 scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-md'
                }
              `}
            >
              <span>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Captain Cards */}
      <div className="max-w-5xl mx-auto space-y-5">
        {sorted.map((captain, index) => {
          const rankStyle = rankColors[index] || null;
          const isTop3 = index < 3;

          return (
            <div
              key={captain.name}
              className={`
                relative group rounded-2xl overflow-hidden transition-all duration-500
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                ${isTop3 ? `shadow-xl ${rankStyle?.glow}` : 'shadow-md'}
                hover:shadow-2xl hover:-translate-y-1
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Gradient border for top 3 */}
              {isTop3 && (
                <div className={`absolute inset-0 bg-gradient-to-r ${rankStyle?.border} rounded-2xl p-[2px] -z-0`}>
                  <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl" />
                </div>
              )}

              <div className={`relative z-10 p-5 sm:p-6 rounded-2xl ${!isTop3 ? 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700' : ''}`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Rank Badge */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div
                      className={`
                        flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black
                        ${isTop3
                          ? `bg-gradient-to-br ${rankStyle?.badge} text-white shadow-lg`
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                        }
                      `}
                    >
                      {isTop3 ? rankStyle?.icon : `#${index + 1}`}
                    </div>

                    {/* Name & Title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className={`text-xl sm:text-2xl font-bold truncate ${
                          index === 0
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600'
                            : 'text-gray-800 dark:text-white'
                        }`}>
                          {captain.name}
                        </h2>
                        {isTop3 && (
                          <span className={`
                            text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
                            ${index === 0
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                              : index === 1
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                            }
                          `}>
                            {rankStyle?.label}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {captain.matchesPlayed} match{captain.matchesPlayed !== 1 ? 'es' : ''} as captain
                      </p>
                    </div>
                  </div>

                  {/* Circular Gauges */}
                  <div className="flex items-center gap-6 sm:ml-auto">
                    <div className="text-center">
                      <CircularProgress
                        value={captain.winPercentage}
                        max={100}
                        size={72}
                        color={captain.winPercentage >= 40 ? '#22c55e' : captain.winPercentage >= 25 ? '#f59e0b' : '#ef4444'}
                      />
                      <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">
                        Win %
                      </p>
                    </div>
                    <div className="text-center">
                      <CircularProgress
                        value={captain.leadershipRating}
                        max={5}
                        size={72}
                        color={captain.leadershipRating >= 4 ? '#3b82f6' : captain.leadershipRating >= 2.5 ? '#8b5cf6' : '#6b7280'}
                      />
                      <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">
                        Rating
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <StatBar label="Matches Played" value={captain.matchesPlayed} max={maxMatches} color="linear-gradient(90deg, #f97316, #fb923c)" />
                    <StatBar label="Wins" value={captain.wins} max={maxWins || 1} color="linear-gradient(90deg, #22c55e, #4ade80)" />
                    <StatBar label="Losses" value={captain.losses} max={maxLosses || 1} color="linear-gradient(90deg, #ef4444, #f87171)" />
                  </div>
                </div>

                {/* Quick Stats Footer */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg">
                    <span className="text-green-500">W</span>
                    <span className="text-gray-700 dark:text-gray-300">{captain.wins}</span>
                    <span className="text-gray-300 dark:text-gray-600 mx-0.5">|</span>
                    <span className="text-red-500">L</span>
                    <span className="text-gray-700 dark:text-gray-300">{captain.losses}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg">
                    📊 Win Rate: <span className={`font-bold ${captain.winPercentage >= 40 ? 'text-green-600 dark:text-green-400' : captain.winPercentage >= 25 ? 'text-amber-600 dark:text-amber-400' : 'text-red-500 dark:text-red-400'}`}>{captain.winPercentage}%</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg">
                    ⭐ Leadership: <span className={`font-bold ${captain.leadershipRating >= 4 ? 'text-blue-600 dark:text-blue-400' : captain.leadershipRating >= 2.5 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'}`}>{captain.leadershipRating}/5</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="max-w-5xl mx-auto mt-12 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-6 px-8 py-4 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="text-center">
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">
              {captainsData.captains.length}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Captains</p>
          </div>
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
              {captainsData.captains.reduce((sum, c) => sum + c.matchesPlayed, 0)}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Total Matches</p>
          </div>
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
              {captainsData.captains.reduce((sum, c) => sum + c.wins, 0)}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Total Wins</p>
          </div>
        </div>
      </div>
    </main>
  );
}
