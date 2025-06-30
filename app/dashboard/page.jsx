
'use client';

import { Suspense } from 'react';
import DashboardContent from '../Component/DashboardContent'; 

export default function DashboardPage() {
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <DashboardContent></DashboardContent>
      </Suspense>
    </div>
  );
}
