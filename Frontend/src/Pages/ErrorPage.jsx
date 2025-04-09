import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle, LogIn, Home } from 'lucide-react';

function ErrorPage() {
  const location = useLocation();
  const isAuthPage = location.pathname.includes('auth');

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-16 h-16 text-yellow-500 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {isAuthPage
            ? 'You must be logged in to access this page.'
            : 'The page you are looking for doesn’t exist or may have been moved.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            to="/auth"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <LogIn className="w-5 h-5" />
            Go to Login
          </Link>
        </div>
        <p className="mt-8 text-sm text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} novaMart. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;