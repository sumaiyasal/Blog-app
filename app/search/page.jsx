
'use client';

import { Suspense } from 'react';
import SearchPage from '../Component/SearchPage';

export default function DashboardPage() {
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <SearchPage></SearchPage>
      </Suspense>
    </div>
  );
}
