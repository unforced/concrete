'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = 'An error occurred during authentication.';
  
  if (error === 'CredentialsSignin') {
    errorMessage = 'Invalid email or password. Please try again.';
  } else if (error === 'OAuthSignin' || error === 'OAuthCallback') {
    errorMessage = 'There was a problem with the OAuth provider. Please try again.';
  } else if (error === 'OAuthAccountNotLinked') {
    errorMessage = 'This email is already associated with another account.';
  } else if (error === 'EmailCreateAccount') {
    errorMessage = 'There was a problem creating your account. Please try again.';
  } else if (error === 'Callback') {
    errorMessage = 'There was a problem with the authentication callback. Please try again.';
  } else if (error === 'AccessDenied') {
    errorMessage = 'Access denied. You do not have permission to access this resource.';
  } else if (error === 'Verification') {
    errorMessage = 'The verification token has expired or is invalid.';
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Authentication Error</h2>
        </div>

        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
          <div className="flex">
            <div className="text-sm text-red-700 dark:text-red-400">{errorMessage}</div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/auth/signin"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
          >
            Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
} 