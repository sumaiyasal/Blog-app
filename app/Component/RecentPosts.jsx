
'use client';

import { useGetPostsQuery } from '@/app/lib/redux/api/blogApi';
import PostCard from './PostCard';

export default function RecentPosts({ limit = 3 }) {
  const { data, error, isLoading } = useGetPostsQuery({
    limit,
    order: 'desc',
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts.</p>;

  const posts = data?.posts || [];

  return (
    <div className='flex flex-col justify-center items-center mb-5'>
      <h1 className='text-xl mt-5'>Recent articles</h1>
      <div className='flex flex-wrap gap-5 mt-5 justify-center'>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
