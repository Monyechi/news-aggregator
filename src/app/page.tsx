"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-xl text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">News Aggregator</h1>
        <p className="text-gray-700 mb-6">
          Welcome to <strong>News Aggregator</strong>, your one-stop platform for curated news and real-time updates.
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
          <Link
            href="/auth/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded shadow"
          >
            Log In
          </Link>
          <Link
            href="/auth/register"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded shadow"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
