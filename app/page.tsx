'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-white to-teal-100 flex flex-col relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 z-0 pointer-events-none" />

      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl shadow-md border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
            <span className="text-indigo-600">E</span><span className="text-gray-800">-Commerce</span>
          </div>
          <div className="flex gap-6 text-md font-medium">
            <Link href="/products" className="hover:text-indigo-600 transition-colors duration-200">Products</Link>
            <Link href="/about" className="hover:text-indigo-600 transition-colors duration-200">About</Link>
            <Link href="/contact" className="hover:text-indigo-600 transition-colors duration-200">Contact</Link>
          </div>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 py-20 relative z-10">
        <section className="text-center bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-10 sm:p-16 lg:p-20 max-w-5xl border border-white/40 transition-all duration-300">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 drop-shadow-lg mb-6 leading-tight tracking-tight animate-fade-in-up">
            <span className="text-indigo-600">Experience</span> the <span className="text-teal-600">Future</span> of <span className="text-indigo-600">Shopping</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-150">
            Premium products, unbeatable prices, and a seamless shopping experience. Welcome to your new favorite store.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link href="/login" passHref>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 glow-button">
                Log In
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 glow-button">
                Register
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="mt-auto py-6 text-gray-500 text-sm text-center bg-white/70 backdrop-blur-md border-t border-gray-200">
        <div className="container mx-auto px-6">
          &copy; 2025 <span className="text-indigo-600 font-semibold">E-Commerce Brand</span>. All rights reserved.
        </div>
      </footer>

      <style jsx>{`
        .glow-button {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 128, 255, 0.3);
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in-up.delay-150 {
          animation-delay: 0.15s;
        }

        .animate-ping-slow {
          animation: ping 6s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;

