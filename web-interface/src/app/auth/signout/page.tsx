'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ redirect: false });
    router.push('/');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-md bg-blue-600"></div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Sign out</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Are you sure you want to sign out?
          </p>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none disabled:opacity-70"
          >
            {isSigningOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>
      </div>
    </div>
  );
} 