import React, { Suspense } from 'react';
import SearchPage from './search/page';
import Dashboard from './dashboard/page';


export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
      <Dashboard></Dashboard>
    </Suspense>
  );
}
