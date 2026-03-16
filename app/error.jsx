'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 font-PlusJakarta">
      <h2 className="text-lg text-gray-700 dark:text-white/70">Something went wrong.</h2>
      <button
        onClick={reset}
        className="px-4 py-2 text-sm border border-gray-300 dark:border-white/20 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
      >
        Try again
      </button>
    </div>
  );
}
