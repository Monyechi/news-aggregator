import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this article in bullet points:\n\n${text}\n`,
      max_tokens: 150,
    });
    return NextResponse.json({ summary: completion.data.choices[0].text });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
