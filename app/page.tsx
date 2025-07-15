'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 py-12 relative overflow-hidden">
      
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-96 h-96 bg-green-300 rounded-full opacity-20 animate-pulse animation-delay-1000"></div>

      <main className="flex flex-col items-center text-center max-w-4xl bg-white bg-opacity-90 backdrop-blur-md rounded-3xl p-12 shadow-lg">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-8 drop-shadow-md">
          Welcome to my <br />
          <span className="text-blue-600">E-Commerce</span> <span className="text-green-600">Website</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-xl">
          Discover amazing products at unbeatable prices. Join us today and start your shopping journey!
        </p>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center w-full max-w-md">
          <Link href="/login" passHref>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-300 px-10 py-4 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1"
              aria-label="Log In"
            >
              Log In
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors duration-300 px-10 py-4 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1"
              aria-label="Register"
            >
              Register
            </Button>
          </Link>
        </div>
      </main>

      <footer className="mt-16 text-gray-500 text-sm select-none">
        &copy; 2025 Your E-Commerce Brand. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
