'use client';

export default function GlobalError({ reset }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen gap-4 font-PlusJakarta">
        <h2 className="text-lg text-gray-700">Something went wrong.</h2>
        <button
          onClick={reset}
          className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-black hover:text-white transition"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
