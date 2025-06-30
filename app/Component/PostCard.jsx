'use client';

import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full sm:w-[420px] border border-gray-300 hover:border-blue-600 rounded-xl overflow-hidden shadow-md transition-all duration-300 bg-white">
      {/* Image */}
      <Link href={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-bold line-clamp-2 text-gray-800">
          {post.title}
        </h2>
        <p className="text-sm italic text-gray-500">{post.category}</p>

        <Link
          href={`/post/${post.slug}`}
          className="mt-2 inline-block text-center text-sm font-medium text-blue-600 border border-blue-600 rounded-md py-2 px-4 hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
}
