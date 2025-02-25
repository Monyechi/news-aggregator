// Example (App Router style): src/app/api/news/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY; // define in .env.local
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  try {
    const { data } = await axios.get(url);
    return NextResponse.json({ articles: data.articles });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
