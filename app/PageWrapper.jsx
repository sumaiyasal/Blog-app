import React, { Suspense } from 'react';
import SearchPage from './search/page';


export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
