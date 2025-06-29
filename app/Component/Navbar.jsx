'use client';
import React from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo/Brand */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          MyBlog
        </Link>

        {/* Right: Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/create" className="hover:text-blue-600">Create</Link>
          <Link href="/ai-helper" className="hover:text-blue-600">AI Helper</Link>

          {/* Show when user is signed in */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* Show when user is signed out */}
          <SignedOut>
            <Link href="/sign-in" className="text-blue-600">Login</Link>
            <Link href="/sign-up" className="text-blue-600">Sign Up</Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
