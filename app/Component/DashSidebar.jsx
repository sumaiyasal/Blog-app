'use client';

import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiChartPie,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function DashSidebar() {
  const [tab, setTab] = useState('');
  const searchParams = useSearchParams();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab('dash'); // default tab if none selected
    }
  }, [searchParams]);

  if (!isSignedIn) return null;

  // Helper component for sidebar items
 const SidebarItem = ({ href, icon: Icon, active, children, label }) => (
  <Link
    href={href}
    className={`flex items-center gap-2 px-4 py-3 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
      active
        ? 'bg-teal-500 text-white dark:bg-teal-600'
        : 'text-gray-700 dark:text-gray-300'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="flex-1">{children}</span>
    {label && (
      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
        {label}
      </span>
    )}
  </Link>
);


  return (
    <aside className="w-full md:w-56 bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 min-h-screen p-4">
      <nav className="flex flex-col gap-1">
        {user?.publicMetadata?.isAdmin && (
          <SidebarItem
            href="/dashboard?tab=dash"
            icon={HiChartPie}
            active={tab === 'dash'}
          >
            Dashboard
          </SidebarItem>
        )}
        <SidebarItem
          href="/dashboard?tab=profile"
          icon={HiUser}
          active={tab === 'profile'}
          label={user?.publicMetadata?.isAdmin ? 'Admin' : 'User'}
        >
          Profile
        </SidebarItem>
        {user?.publicMetadata?.isAdmin && (
          <SidebarItem
            href="/dashboard?tab=posts"
            icon={HiDocumentText}
            active={tab === 'posts'}
          >
            Posts
          </SidebarItem>
        )}
        {user?.publicMetadata?.isAdmin && (
          <SidebarItem
            href="/dashboard?tab=users"
            icon={HiOutlineUserGroup}
            active={tab === 'users'}
          >
            Users
          </SidebarItem>
        )}
        <div className="mt-4">
          <SignOutButton>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-3 rounded-md w-full text-gray-700 hover:bg-red-500 hover:text-white dark:text-gray-300 dark:hover:bg-red-600"
            >
              <HiArrowSmRight className="w-5 h-5" />
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </nav>
    </aside>
  );
}
