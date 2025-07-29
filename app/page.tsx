'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-200 via-white to-teal-100 flex flex-col relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 z-0 pointer-events-none" />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_#4f46e5_0%,_transparent_70%)] opacity-20 animate-pulse" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_#fb923c_0%,_transparent_70%)] opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_#f43f5e_0%,_transparent_70%)] opacity-20 animate-pulse delay-2000" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_#14b8a6_0%,_transparent_70%)] opacity-20 animate-pulse delay-2000" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_#f43f5e_0%,_transparent_70%)] opacity-20 animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_#f43f5e_0%,_transparent_70%)] opacity-20 animate-pulse delay-2000" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_#14b8a6_0%,_transparent_70%)] opacity-20 animate-pulse delay-2000" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_#f43f5e_0%,_transparent_70%)] opacity-20 animate-pulse delay-3000" />
      </div>

      <header className="z-50 backdrop-blur-xl">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
            <span className="text-indigo-600">E</span>
            <span className="text-gray-800">-Commerce</span>
          </div>
          <div className="flex gap-6 text-md font-medium">
            <Link
              href="/shop"
              className="flex items-center transition-colors duration-200 hover:shadow-md px-4 py-2 rounded-lg"
            >
              <ShoppingCart className="w-6 h-6" />
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 sm:px-12 lg:px-24 relative z-10">
        <section className="text-center bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-14 lg:p-16 max-w-4xl border border-white/40 transition-all duration-300">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 drop-shadow-lg mb-4 leading-tight tracking-tight">
            <span className="text-indigo-600">Experience</span> the{" "}
            <span className="text-teal-600">Future</span> of{" "}
            <span className="text-indigo-600">Shopping</span>
          </h1>
          <p className="text-md sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Premium products, unbeatable prices, and a seamless shopping
            experience. Welcome to your new favorite store.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link href="/login" passHref>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Log In
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Register
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-4 text-gray-500 text-sm text-center backdrop-blur-md">
        <div className="container mx-auto px-6">
          &copy; 2025{" "}
          <span className="text-indigo-600 font-semibold">
            E-Commerce Brand
          </span>
          . All rights reserved.
        </div>
      </footer>
    </div>
  );
};