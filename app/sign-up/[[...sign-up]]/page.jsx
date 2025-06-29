import { SignUp } from '@clerk/nextjs';
import { headers } from 'next/headers';

export default async function SignUpPage() {
  const h = await headers();
  return (
    <div className='flex items-center justify-center p-3'>
      <SignUp />
    </div>
  );
}