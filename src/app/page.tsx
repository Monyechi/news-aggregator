// src/app/page.tsx (or news/page.tsx)
"use client";

import { useSession, signIn } from "next-auth/react";
import NewsFeed from "@/components/NewsFeed";

export default function NewsPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl">Please log in to view the news feed.</p>
        <button onClick={() => signIn("google")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Sign in with Google
        </button>
      </div>
    );
  }

  return <NewsFeed />;
}
