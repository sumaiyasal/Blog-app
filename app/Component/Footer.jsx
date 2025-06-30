'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & App Name */}
        <div>
          <h2 className="text-2xl font-bold text-white">BlogApp</h2>
          <p className="mt-2 text-sm text-gray-400">
            A place to share knowledge, stories, and ideas.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/search" className="hover:text-white transition">Search</Link></li>
            <li><Link href="/dashboard/create-post" className="hover:text-white transition">Create Post</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            {/* Replace # with actual links */}
            <a href="#" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 fill-current hover:text-white" viewBox="0 0 24 24"><path d="M22,12C22,6.5,17.5,2,12,2S2,6.5,2,12c0,5,3.7,9.1,8.5,9.9v-7H8v-2.9h2.5V9.5c0-2.5,1.5-3.9,3.8-3.9c1.1,0,2.2,0.2,2.2,0.2v2.4h-1.3c-1.3,0-1.7,0.8-1.7,1.6v1.9H17l-0.4,2.9h-2.1v7C18.3,21.1,22,17,22,12z"/></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 fill-current hover:text-white" viewBox="0 0 24 24"><path d="M21,6.5c-0.8,0.4-1.7,0.7-2.5,0.8c0.9-0.6,1.6-1.5,2-2.5c-0.9,0.6-1.9,1-3,1.2C16.6,5.2,15.4,4.5,14,4.5c-2.6,0-4.6,2.2-4.1,4.7C6.7,9.1,4.1,7.7,2.4,5.7c-0.7,1.2-0.3,2.8,0.9,3.6c-0.7,0-1.3-0.2-1.9-0.5c0,1.6,1.1,3,2.6,3.3c-0.5,0.1-1,0.2-1.5,0.1c0.4,1.3,1.6,2.3,3,2.3C4.5,16.2,3,16.7,1.5,16.6C3,17.6,4.7,18.1,6.5,18c7.5,0,11.6-6.4,11.3-12.1C19.4,8.2,20.3,7.4,21,6.5z"/></svg>
            </a>
            {/* Add more icons if needed */}
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-5">
        &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
      </div>
    </footer>
  );
}
