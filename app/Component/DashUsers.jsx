'use client';

import { useUser } from '@clerk/nextjs';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useGetUsersQuery } from '../lib/redux/api/userapi';


export default function DashUsers() {
  const { user, isLoaded } = useUser();

  // Use RTK Query hook
  const {
    data,
    error,
    isLoading,
    isFetching,
  } = useGetUsersQuery(user?.publicMetadata?.userMongoId, {
    skip: !user?.publicMetadata?.isAdmin,
  });

  if (!user?.publicMetadata?.isAdmin && isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7">
        <h1 className="text-2xl font-semibold">You are not an admin!</h1>
      </div>
    );
  }

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center py-10">
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        <p>Error loading users.</p>
      </div>
    );
  }

  const users = data?.users || [];

  return (
    <div className="overflow-x-auto p-4 max-w-7xl mx-auto">
      {users.length > 0 ? (
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="text-left px-4 py-3 border-b border-gray-300 dark:border-gray-600">Date Created</th>
              <th className="text-left px-4 py-3 border-b border-gray-300 dark:border-gray-600">User Image</th>
              <th className="text-left px-4 py-3 border-b border-gray-300 dark:border-gray-600">Username</th>
              <th className="text-left px-4 py-3 border-b border-gray-300 dark:border-gray-600">Email</th>
              <th className="text-left px-4 py-3 border-b border-gray-300 dark:border-gray-600">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="bg-white dark:bg-gray-900 even:bg-gray-50 dark:even:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600">
                  <img
                    src={u.profilePicture}
                    alt={u.username}
                    className="w-10 h-10 rounded-full object-cover bg-gray-300"
                    loading="lazy"
                  />
                </td>
                <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600">{u.username}</td>
                <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600">{u.email}</td>
                <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600 text-center">
                  {u.isAdmin ? (
                    <FaCheck className="text-green-500 inline-block" aria-label="Admin" />
                  ) : (
                    <FaTimes className="text-red-500 inline-block" aria-label="Not Admin" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 py-10">No users found.</p>
      )}
    </div>
  );
}
