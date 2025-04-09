import React from 'react';

function ErrorShimmer() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full p-8 text-center animate-pulse">

        {/* Icon shimmer */}
        <div className="w-16 h-16 mx-auto mb-6 bg-yellow-300 dark:bg-yellow-600 rounded-full" />

        {/* Heading shimmer */}
        <div className="w-2/3 h-6 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-3" />

        {/* Subtext shimmer */}
        <div className="w-4/5 h-4 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="w-3/4 h-4 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-4" />

        {/* Buttons shimmer */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
          <div className="w-full sm:w-1/2 h-10 bg-blue-300 dark:bg-blue-600 rounded-xl" />
          <div className="w-full sm:w-1/2 h-10 bg-gray-300 dark:bg-gray-600 rounded-xl" />
        </div>

        {/* Footer shimmer */}
        <div className="w-1/2 h-3 mx-auto mt-8 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export default ErrorShimmer;
