"use client";

import { useEffect, useState } from "react";

interface Article {
  title: string;
  description?: string;
  content?: string;
  // Add any other fields from your news API
}

export default function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        if (data.articles) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading news...</p>;
  }

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

function ArticleCard({ article }: { article: Article }) {
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);

  async function handleSummarize() {
    if (!article.content && !article.description) return;
    setSummarizing(true);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: article.content ?? article.description,
        }),
      });
      const data = await res.json();
      setSummary(data.summary || "No summary available");
    } catch (error) {
      console.error("Error summarizing:", error);
    } finally {
      setSummarizing(false);
    }
  }

  return (
    <div className="border rounded-md p-4">
      <h2 className="text-lg font-semibold">{article.title}</h2>
      {summary ? (
        <p className="mt-2 italic">Summary: {summary}</p>
      ) : (
        <p className="mt-2">{article.description}</p>
      )}
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleSummarize}
          disabled={summarizing}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {summarizing ? "Summarizing..." : "Summarize"}
        </button>
      </div>
    </div>
  );
}
