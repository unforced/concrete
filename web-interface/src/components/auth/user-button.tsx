'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function UserButton() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  if (status === 'loading') {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800"></div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <Link
        href="/auth/signin"
        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 focus:outline-none"
      >
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || 'User'}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
            {session?.user?.name?.charAt(0) || 'U'}
          </div>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={closeDropdown}
          ></div>
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
            <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {session?.user?.name}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {session?.user?.email}
              </p>
            </div>
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={closeDropdown}
            >
              Dashboard
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={closeDropdown}
            >
              Settings
            </Link>
            <button
              onClick={() => {
                closeDropdown();
                signOut({ redirect: true, callbackUrl: '/auth/signout' });
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
} 