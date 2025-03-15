'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>('');
  const [errorDescription, setErrorDescription] = useState<string>('');

  useEffect(() => {
    const errorParam = searchParams.get('error');
    setError(errorParam || 'Unknown error');

    // Set a user-friendly error description based on the error code
    switch (errorParam) {
      case 'Configuration':
        setErrorDescription('There is a problem with the server configuration.');
        break;
      case 'AccessDenied':
        setErrorDescription('You do not have permission to sign in.');
        break;
      case 'Verification':
        setErrorDescription('The verification token has expired or has already been used.');
        break;
      case 'CredentialsSignin':
        setErrorDescription('The email or password you entered is incorrect. Please try again with the demo credentials: demo@example.com / password');
        break;
      default:
        setErrorDescription('An unexpected error occurred. Please try again.');
        break;
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Authentication Error</h2>
          <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{errorDescription}</p>
        </div>

        <div className="mt-8 flex flex-col space-y-4">
          <Link
            href="/auth/signin"
            className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
          >
            Return to Sign In
          </Link>
          <Link
            href="/"
            className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Go to Home Page
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help?{' '}
            <Link href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 