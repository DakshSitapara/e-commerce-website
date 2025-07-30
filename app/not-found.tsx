"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-neon-green px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle,rgba(0,255,0,0.2)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="text-center z-10">
        <h1 className="text-9xl font-extrabold text-neon-green glitch relative">
          404
        </h1>
        <p className="text-xl mt-4 text-neon-cyan font-mono">
          :: SYSTEM BREACH ::
        </p>
        <p className="text-lg mt-2 mb-8 text-gray-400 font-mono">
          The page you're jacked into doesn't exist in this sector.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/shop"
            className="px-6 py-3 bg-neon-pink hover:bg-pink-700 text-white rounded-full font-medium transition duration-300 shadow-md font-mono"
          >
            ↳ Navigate to Market Node
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-medium transition duration-300 font-mono"
          >
            ⬅ Return to Mainframe
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 text-sm text-gray-500 font-mono z-10">
        ERROR CODE: 0xCYP3R-404 — Trace Route Failed
      </div>

      <style jsx>{`
        .text-neon-green {
          color: #39ff14;
        }
        .text-neon-cyan {
          color: #00ffff;
        }
        .bg-neon-pink {
          background-color: #ff007c;
        }
        .glitch {
          animation: glitch 1s infinite;
        }

        @keyframes glitch {
          0% {
            text-shadow: 2px 2px #ff00c8, -2px -2px #00fff7;
          }
          20% {
            text-shadow: -2px 2px #00fff7, 2px -2px #ff00c8;
          }
          40% {
            text-shadow: 2px -2px #ff00c8, -2px 2px #00fff7;
          }
          60% {
            text-shadow: 0px 0px #fff;
          }
          80% {
            text-shadow: 2px 2px #00fff7, -2px -2px #ff00c8;
          }
          100% {
            text-shadow: -2px -2px #00fff7, 2px 2px #ff00c8;
          }
        }
      `}</style>
    </div>
  );
}
