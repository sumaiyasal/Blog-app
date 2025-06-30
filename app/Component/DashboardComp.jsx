'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { HiArrowNarrowUp, HiOutlineUserGroup, HiDocumentText } from 'react-icons/hi';
import { useGetUsersQuery } from '../lib/redux/api/userapi';
import { useGetPostsQuery } from '../lib/redux/api/blogApi';


export default function DashboardComp() {
  const { user } = useUser();

  // Skip queries if not admin
  const { data: usersData, error: usersError, isLoading: usersLoading } = useGetUsersQuery(
    { limit: 5 },
    { skip: !user?.publicMetadata?.isAdmin }
  );

  const { data: postsData, error: postsError, isLoading: postsLoading } = useGetPostsQuery(
    { limit: 5 },
    { skip: !user?.publicMetadata?.isAdmin }
  );

  if (!user?.publicMetadata?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7">
        <h1 className="text-2xl font-semibold">You are not an admin!</h1>
      </div>
    );
  }

  // Defensive fallback
  const users = usersData?.users || [];
  const posts = postsData?.posts || [];
  const totalUsers = usersData?.totalUsers || 0;
  const totalPosts = postsData?.totalPosts || 0;
  const lastMonthUsers = usersData?.lastMonthUsers || 0;
  const lastMonthPosts = postsData?.lastMonthPosts || 0;

  return (
    <div className="p-3 md:mx-auto max-w-7xl">
      {/* Stats cards */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {/* Total Users */}
        <div className="flex flex-col p-4 bg-gray-100 rounded-md shadow-md w-72 dark:bg-slate-800">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 uppercase text-sm">Total Users</h3>
              <p className="text-2xl font-semibold">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-green-500 items-center mt-2 text-sm">
            <HiArrowNarrowUp />
            <span>{lastMonthUsers}</span>
            <span className="text-gray-500">Last month</span>
          </div>
        </div>

        {/* Total Posts */}
        <div className="flex flex-col p-4 bg-gray-100 rounded-md shadow-md w-72 dark:bg-slate-800">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 uppercase text-sm">Total Posts</h3>
              <p className="text-2xl font-semibold">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-green-500 items-center mt-2 text-sm">
            <HiArrowNarrowUp />
            <span>{lastMonthPosts}</span>
            <span className="text-gray-500">Last month</span>
          </div>
        </div>
      </div>

      {/* Recent Users & Posts tables */}
      <div className="flex flex-wrap gap-4 justify-center">
        {/* Recent Users */}
        <section className="shadow-md rounded-md bg-gray-100 dark:bg-gray-800 p-3 w-full md:w-auto max-w-md">
          <header className="flex justify-between items-center mb-3 px-2">
            <h2 className="font-semibold text-center flex-grow">Recent users</h2>
            <Link
              href="/dashboard?tab=users"
              className="text-purple-700 hover:underline text-sm"
            >
              See all
            </Link>
          </header>

          {usersLoading ? (
            <p className="text-center py-5">Loading users...</p>
          ) : usersError ? (
            <p className="text-center py-5 text-red-600">Failed to load users.</p>
          ) : users.length === 0 ? (
            <p className="text-center py-5">No users found.</p>
          ) : (
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">User Image</th>
                  <th className="border border-gray-300 p-2">Username</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="even:bg-gray-200 dark:even:bg-gray-700">
                    <td className="border border-gray-300 p-2 text-center">
                      <img
                        src={u.profilePicture}
                        alt={u.username}
                        className="w-10 h-10 rounded-full object-cover mx-auto"
                      />
                    </td>
                    <td className="border border-gray-300 p-2 text-center">{u.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Recent Posts */}
        <section className="shadow-md rounded-md bg-gray-100 dark:bg-gray-800 p-3 w-full md:w-auto max-w-2xl">
          <header className="flex justify-between items-center mb-3 px-2">
            <h2 className="font-semibold text-center flex-grow">Recent posts</h2>
            <Link
              href="/dashboard?tab=posts"
              className="text-purple-700 hover:underline text-sm"
            >
              See all
            </Link>
          </header>

          {postsLoading ? (
            <p className="text-center py-5">Loading posts...</p>
          ) : postsError ? (
            <p className="text-center py-5 text-red-600">Failed to load posts.</p>
          ) : posts.length === 0 ? (
            <p className="text-center py-5">No posts found.</p>
          ) : (
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Post Image</th>
                  <th className="border border-gray-300 p-2">Title</th>
                  <th className="border border-gray-300 p-2">Category</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    className="even:bg-gray-200 dark:even:bg-gray-700"
                  >
                    <td className="border border-gray-300 p-2 text-center">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-10 rounded-md object-cover mx-auto"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">{post.title}</td>
                    <td className="border border-gray-300 p-2">{post.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}
