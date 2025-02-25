"use client";

import { useEffect, useState } from "react";

export default function NewsFeed() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/news");
      const data = await res.json();
      setArticles(data.articles || []);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Latest News</h1>
      {articles.map((article, idx) => (
        <div key={idx} className="my-4 p-4 border rounded-md">
          <h2 className="font-semibold">{article.title}</h2>
          <p>{article.description}</p>
          {/* Link to open a modal or route for summary */}
        </div>
      ))}
    </div>
  );
}
