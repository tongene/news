 
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,  
});

export async function POST(req: Request) {
  try {
    const { topic } = await req.json(); 
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: `Find information about - ${topic}` ,
  config: {
    systemInstruction: "You are a suggestion agent and you have to look for content on the website https://culturays.com/ to get matching content with link. Put each link in an 'a' tag — <a></a> — and display it alongside the title of each content you find.",
  },
});
//console.log(response.text); 
    const suggestion = response.text || "No suggestion from Gemini"; 
    return NextResponse.json({ suggestion });
  } catch (err: any) {
    console.error("Gemini request error:", err);
    return NextResponse.json(
      { error: "Gemini request failed", details: err.message },
      { status: 500 }
    );
  }
}
