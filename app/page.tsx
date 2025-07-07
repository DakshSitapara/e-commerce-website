'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Welcome to my e-commerce website!</h1>
        <div className='flex flex-col items-center sm:flex-row gap-4'>
        <Link href="/login">
          <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            login
          </Button>
        </Link>
        <Link href="/register">
          <Button className="bg-green-500 text-white hover:bg-green-600 transition-colors">
            register
          </Button>
        </Link>
        </div>
      </main>
    </div>
  );
}
