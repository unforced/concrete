'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If the user is not authenticated and not on an auth page, redirect to signin
    if (status === 'unauthenticated' && !pathname.startsWith('/auth/')) {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [status, router, pathname]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  // If on auth page or authenticated, show children
  if (pathname.startsWith('/auth/') || status === 'authenticated') {
    return <>{children}</>;
  }

  // This should not be visible due to the redirect, but just in case
  return null;
} 