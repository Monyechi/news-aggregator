"use client";

import { useEffect, useState } from "react";

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/rss");
        const data = await res.json();
        setArticles(data.news);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading news...</p>;

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
}

function ArticleCard({ article }) {
  return (
    <div className="border rounded-md p-4 shadow-md">
      <h2 className="text-lg font-semibold">{article.title}</h2>
      <p className="text-gray-600">{article.description}</p>
      <a href={article.link} target="_blank" className="text-blue-500 underline">
        Read More
      </a>
    </div>
  );
}
