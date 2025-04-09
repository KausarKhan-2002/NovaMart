import React from 'react';

function AuthShimmer() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
        {/* Logo shimmer */}
        <div className="w-28 h-7 mb-10 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />

        {/* Full name input shimmer (used in signup) */}
        <div className="w-full h-12 mb-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />

        {/* Email input shimmer */}
        <div className="w-full h-12 mb-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />

        {/* Password input shimmer */}
        <div className="w-full h-12 mb-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />

        {/* Submit button shimmer */}
        <div className="w-full h-12 mb-4 bg-blue-200 dark:bg-blue-700 rounded-md animate-pulse" />

        {/* Small helper link shimmer */}
        <div className="w-36 h-4 mx-auto mt-2 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />

        {/* Bottom text shimmer */}
        <div className="w-48 h-4 mx-auto mt-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
      </div>
    </div>
  );
}

export default AuthShimmer;
