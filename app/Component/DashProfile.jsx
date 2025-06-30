'use client';

import { UserProfile } from '@clerk/nextjs';

export default function DashProfile() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <UserProfile routing="hash" />
    </div>
  );
}
