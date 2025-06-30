'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useDeletePostMutation, useGetPostsQuery } from '../lib/redux/api/blogApi';


export default function DashPosts() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  const userId = user?.publicMetadata?.userMongoId;
  const isAdmin = user?.publicMetadata?.isAdmin;

  const { data, isLoading, isError } =  useGetPostsQuery(userId, {
    skip: !isAdmin || !userId,
  });

  const [deletePost] = useDeletePostMutation();

  const handleDeletePost = async () => {
    try {
      await deletePost({ postId: postIdToDelete, userId }).unwrap();
      setShowModal(false);
    } catch (error) {
      console.log('Delete error:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7">
        <h1 className="text-2xl font-semibold">You are not an admin!</h1>
      </div>
    );
  }

  if (isLoading) return <p className="text-center">Loading posts...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading posts</p>;

  const userPosts = data?.posts || [];

  return (
    <div className="overflow-x-auto p-4">
      {userPosts.length > 0 ? (
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Updated</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Delete</th>
              <th className="px-4 py-2 border">Edit</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map((post) => (
              <tr key={post._id} className="border-t">
                <td className="px-4 py-2 text-sm">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <Link href={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-20 h-10 object-cover bg-gray-200"
                    />
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/post/${post.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-2 text-sm">{post.category}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(post._id);
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/dashboard/update-post/${post._id}`}
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">You have no posts yet!</p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="text-center">
              <HiOutlineExclamationCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg mb-4">
                Are you sure you want to delete this post?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeletePost}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
