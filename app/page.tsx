'use client';

import Link from 'next/link';
import { useRef } from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Virtual Try-On
          </Link>
          <Link 
            href="/studio" 
            className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Try Studio
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold text-gray-800">
            Virtual Try-On App
            <span className="block text-indigo-500 mt-2 text-3xl">
              Try Before You Buy
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience clothes virtually before making a purchase. 
            Upload your photo and see how different garments look on you.
          </p>
          <Link 
            href="/studio" 
            className="inline-flex items-center bg-indigo-500 text-white px-8 py-3 rounded-lg hover:bg-indigo-600 transition-colors text-lg"
          >
            Get Started
          </Link>
        </div>
      </main>

      <footer className="border-t mt-auto py-6 text-center text-gray-600">
        <p>© 2024 Virtual Try-On Project - Work in Progress</p>
      </footer>
    </div>
  );
}