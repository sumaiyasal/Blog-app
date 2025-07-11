import { Outfit } from 'next/font/google';
import './globals.css';
import AppProviders from './AppProviders'; // Import new wrapper

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Blog App',
  description: 'Generated by create next app',
};

export default function layout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
