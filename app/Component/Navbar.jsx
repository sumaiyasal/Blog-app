'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import CustomUserMenu from './CustomUserMenu';

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
const searchParams = useSearchParams();
 useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
      setSearchTerm('');
    }
  }, [searchParams]);
 const handleSearch = (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(searchParams);
  urlParams.set('searchTerm', searchTerm.trim());
  const searchQuery = urlParams.toString();
  router.push(`/search?${searchQuery}`);
  setSearchTerm(''); // ✅ Clear search bar after submitting
  setIsOpen(false);  // ✅ Optional: Close mobile menu after search
};

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchTerm.trim()) {
  //     router.push(`/search?term=${encodeURIComponent(searchTerm)}`);
  //     setSearchTerm('');
  //     setIsOpen(false); // close mobile menu
  //   }
  // };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-teal-600">
          Blog App
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-teal-600">Home</Link>
          <Link href="/about" className="hover:text-teal-600">About</Link>
          {isSignedIn && user?.publicMetadata?.isAdmin && (
            <Link href="/dashboard/create-post" className="hover:text-teal-600">
              Create Post
            </Link>
          )}

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button type="submit" className="absolute right-1 top-1 text-sm text-teal-600 hover:underline">
              Go
            </button>
          </form>

          {isSignedIn ? (
           <CustomUserMenu />
          ) : (
            <Link href="/sign-in" className="text-teal-600 hover:underline">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
          <Link href="/" className="block py-2 hover:text-teal-600">Home</Link>
          <Link href="/about" className="block py-2 hover:text-teal-600">About</Link>
          {isSignedIn && user?.publicMetadata?.isAdmin && (
            <Link href="/dashboard/create-post" className="block py-2 hover:text-teal-600">
              Create Post
            </Link>
          )}

          <form onSubmit={handleSearch} className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-1 border rounded-md"
            />
            <button type="submit" className="text-sm px-3 py-1 bg-teal-500 text-white rounded-md">
              Go
            </button>
          </form>

          {isSignedIn ? (
            <CustomUserMenu />
          ) : (
            <Link href="/sign-in" className="py-2 text-teal-600 hover:underline">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
}
