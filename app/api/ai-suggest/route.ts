 
import { NextResponse } from "next/server";
import { GoogleGenAI, UrlContextMetadata } from "@google/genai";
import { searchValues } from "@/app/lib/searches/searches";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,  
});

export async function POST(req: Request) {
  try {
    const { topic } = await req.json(); 
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash", 
  
  contents: [
 `Retrieve all content related to ${topic} from the site https://culturays.com/. Provide a summary of the content found and display them alongside the titles.`,
    ],
     config: {
       tools: [{urlContext: {}}],
      // systemInstruction: "Your job is to generate a summary of the content found and display them alongside the titles and link texts.",
    },
  
});
// const contextMetaData = response.candidates?.map((xy)=> xy.urlContextMetadata).map((tx)=> tx?.urlMetadata) as UrlContextMetadata 
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
