'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Provider } from 'react-redux';
import { store } from './lib/redux/store';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import { Suspense } from 'react';

export default function AppProviders({ children }) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
          </Suspense>
            {children}
         
        <Footer />
      </Provider>
    </ClerkProvider>
  );
}
