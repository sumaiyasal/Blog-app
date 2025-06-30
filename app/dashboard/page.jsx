'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DashSidebar from '../Component/DashSidebar';
import DashProfile from '../Component/DashProfile';
import DashPosts from '../Component/DashPosts';
import DashUsers from '../Component/DashUsers';
import DashboardComp from '../Component/DashboardComp';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <Suspense fallback={<div>Loading dashboard...</div>}><DashSidebar />
        </Suspense>
        
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}

      {tab === 'posts' && <DashPosts />}

      {tab === 'users' && <DashUsers />}
      {tab === 'dash' && <DashboardComp />}
    </div>
  );
}