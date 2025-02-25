import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    // For a "text-davinci-003" style completion:
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Summarize this article in bullet points:\n\n${text}\n`,
      max_tokens: 150,
    });

    // Access the result
    const summary = completion.choices[0].text;

    return NextResponse.json({ summary });
  } catch (error) {
    // By default, 'error' is 'unknown'. You can do a type check or cast:
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
