'use client';

import { useState, useCallback } from 'react';
import Container from '@/components/Container';

type TossResult = 'heads' | 'tails';

interface TossRecord {
  result: TossResult;
  id: number;
}

export default function TossPage() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<TossResult | null>(null);
  const [history, setHistory] = useState<TossRecord[]>([]);
  const [flipCount, setFlipCount] = useState(0);

  const flipCoin = useCallback(() => {
    if (isFlipping) return;

    setIsFlipping(true);
    setResult(null);

    // Random result
    const newResult: TossResult = Math.random() < 0.5 ? 'heads' : 'tails';

    // Wait for animation to finish
    setTimeout(() => {
      setResult(newResult);
      setIsFlipping(false);
      setFlipCount((prev) => prev + 1);
      setHistory((prev) => [{ result: newResult, id: Date.now() }, ...prev].slice(0, 20));
    }, 2000);
  }, [isFlipping]);

  const headsCount = history.filter((h) => h.result === 'heads').length;
  const tailsCount = history.filter((h) => h.result === 'tails').length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-12">
        <Container>
          <h1 className="text-5xl font-bold mb-4 text-center">🪙 Coin Toss</h1>
          <p className="text-lg opacity-90 text-center">
            Toss the coin before your match — Heads or Tails?
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Coin Area */}
            <div className="flex flex-col items-center mb-12">
              {/* The Coin */}
              <div className="perspective-container mb-10" style={{ perspective: '1000px' }}>
                <div
                  className={`coin-wrapper ${isFlipping ? 'coin-flipping' : ''} ${
                    result === 'tails' && !isFlipping ? 'show-tails' : ''
                  }`}
                  style={{
                    width: '200px',
                    height: '200px',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transition: isFlipping ? 'none' : 'transform 0.5s ease-out',
                    transform: result === 'tails' && !isFlipping ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Heads Side */}
                  <div
                    className="absolute inset-0 rounded-full flex items-center justify-center backface-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      background: 'linear-gradient(145deg, #fbbf24, #f59e0b, #d97706)',
                      boxShadow: '0 8px 32px rgba(245, 158, 11, 0.4), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)',
                      border: '4px solid #b45309',
                    }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-1">🦁</div>
                      <div className="text-amber-900 font-black text-lg tracking-wider">HEADS</div>
                    </div>
                  </div>

                  {/* Tails Side */}
                  <div
                    className="absolute inset-0 rounded-full flex items-center justify-center backface-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: 'linear-gradient(145deg, #60a5fa, #3b82f6, #2563eb)',
                      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)',
                      border: '4px solid #1d4ed8',
                    }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-1">🏏</div>
                      <div className="text-blue-100 font-black text-lg tracking-wider">TAILS</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Display */}
              <div className="h-16 flex items-center justify-center mb-6">
                {isFlipping ? (
                  <p className="text-2xl font-bold text-gray-500 dark:text-gray-400 animate-pulse">
                    Flipping...
                  </p>
                ) : result ? (
                  <div className="text-center animate-bounce-in">
                    <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">
                      {result === 'heads' ? '🦁 HEADS!' : '🏏 TAILS!'}
                    </p>
                  </div>
                ) : (
                  <p className="text-xl text-gray-400 dark:text-gray-500">
                    Tap the button to toss!
                  </p>
                )}
              </div>

              {/* Toss Button */}
              <button
                onClick={flipCoin}
                disabled={isFlipping}
                className={`px-10 py-4 text-xl font-bold rounded-2xl text-white transition-all duration-300 transform ${
                  isFlipping
                    ? 'bg-gray-400 cursor-not-allowed scale-95'
                    : 'bg-gradient-to-r from-orange-500 to-blue-600 hover:from-blue-600 hover:to-orange-500 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/40 active:scale-95'
                }`}
              >
                {isFlipping ? '🪙 Tossing...' : '🪙 Toss the Coin!'}
              </button>
            </div>

            {/* Stats Cards */}
            {history.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 border-2 border-amber-400 dark:border-amber-600 rounded-2xl p-5 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-black text-amber-600 dark:text-amber-400">{headsCount}</div>
                  <div className="text-sm font-bold text-amber-700 dark:text-amber-300 mt-1">🦁 Heads</div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 border-2 border-blue-400 dark:border-blue-600 rounded-2xl p-5 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-black text-blue-600 dark:text-blue-400">{tailsCount}</div>
                  <div className="text-sm font-bold text-blue-700 dark:text-blue-300 mt-1">🏏 Tails</div>
                </div>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/40 dark:to-gray-700/40 border-2 border-gray-400 dark:border-gray-600 rounded-2xl p-5 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-black text-gray-600 dark:text-gray-400">{history.length}</div>
                  <div className="text-sm font-bold text-gray-700 dark:text-gray-300 mt-1">Total</div>
                </div>
              </div>
            )}

            {/* Toss History */}
            {history.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  📜 Toss History
                  <span className="text-sm font-normal text-gray-500">(last 20)</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {history.map((record, i) => (
                    <div
                      key={record.id}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${
                        record.result === 'heads'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                      }`}
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <span>{record.result === 'heads' ? '🦁' : '🏏'}</span>
                      <span>{record.result === 'heads' ? 'H' : 'T'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes coinFlip {
          0% {
            transform: rotateY(0deg) rotateX(0deg) translateY(0);
          }
          10% {
            transform: rotateY(360deg) rotateX(20deg) translateY(-120px);
          }
          20% {
            transform: rotateY(720deg) rotateX(-10deg) translateY(-200px);
          }
          30% {
            transform: rotateY(1080deg) rotateX(15deg) translateY(-250px);
          }
          40% {
            transform: rotateY(1440deg) rotateX(-5deg) translateY(-220px);
          }
          50% {
            transform: rotateY(1800deg) rotateX(10deg) translateY(-180px);
          }
          60% {
            transform: rotateY(2160deg) rotateX(-8deg) translateY(-120px);
          }
          70% {
            transform: rotateY(2520deg) rotateX(5deg) translateY(-60px);
          }
          80% {
            transform: rotateY(2880deg) rotateX(-3deg) translateY(-20px);
          }
          90% {
            transform: rotateY(3060deg) rotateX(1deg) translateY(-5px);
          }
          100% {
            transform: rotateY(3240deg) rotateX(0deg) translateY(0);
          }
        }

        .coin-flipping {
          animation: coinFlip 2s ease-in-out forwards;
        }

        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }

        .animate-bounce-in {
          animation: bounceIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
