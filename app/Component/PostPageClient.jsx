'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CallToAction from './CallToAction';
import { useGetPostBySlugMutation } from '../lib/redux/api/blogApi';
import RecentPosts from './RecentPosts';



export default function PostPageClient({ slug }) {
  const [post, setPost] = useState(null);
  const [getPost] = useGetPostBySlugMutation();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPost(slug).unwrap();
        setPost(res.posts[0]);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        setPost({ title: 'Failed to load post' });
      }
    };
    fetchPost();
  }, [getPost, slug]);

  if (!post || post.title === 'Failed to load post') {
    return (
      <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h2 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
          Post not found
        </h2>
      </main>
    );
  }

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post.title}
      </h1>

      <Link href={`/search?category=${post.category}`} className='self-center mt-5'>
        <button className='bg-gray-300 text-xs px-3 py-1 rounded-full hover:bg-gray-400 transition'>
          {post.category}
        </button>
      </Link>

      <img
        src={post.image}
        alt={post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />

      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{(post.content?.length / 1000).toFixed(0)} mins read</span>
      </div>

      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      <RecentPosts/>
    </main>
  );
}
