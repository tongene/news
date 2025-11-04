import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { topic, currentText } = await req.json();

    const prompt = `
      You are an expert content assistant. 
      Suggest 3 improved directions or next paragraphs for this content about "${topic}".
      Current draft:
      ${currentText}

      Reply with markdown-formatted suggestions.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const suggestion = completion.choices[0]?.message?.content;
    return NextResponse.json({ suggestion });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate suggestion" }, { status: 500 });
  }
}
