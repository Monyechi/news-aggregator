import connectToDatabase from "@/lib/mongodb";
import Article from "@/models/Article";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newArticle = await Article.create(body);
    return NextResponse.json(newArticle);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
