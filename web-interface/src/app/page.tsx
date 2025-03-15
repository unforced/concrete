'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const { status } = useSession();
  
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/conversation');
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [router, status]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Concrete</h1>
        <p>Loading...</p>
        <div className="mt-4 h-6 w-6 mx-auto animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
      </div>
    </div>
  );
}
