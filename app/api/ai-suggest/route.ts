 
import { NextResponse } from "next/server";
import { GoogleGenAI, UrlContextMetadata } from "@google/genai";
import { searchValues } from "@/app/lib/searches/searches";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,  
});

export async function POST(req: Request) { 
   const { topic } = await req.json(); 
   const searchTopic  = await searchValues(topic)

  try {
  
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",   
  contents: [
 `Read through this post https://culturays.com/news/${searchTopic[0].slug} and display the first 2 lines of any content that directly mentions ${topic}.`,
    ],
     config: {
       tools: [{urlContext: {}}],
      // systemInstruction: "Your job is to generate a summary of the content found and display them alongside the titles and link texts.",
    },
  
});
// const contextMetaData = response.candidates?.map((xy)=> xy.urlContextMetadata).map((tx)=> tx?.urlMetadata) as UrlContextMetadata 
    const suggestion = response.text + ' ' + `Read full content -><a href="https://culturays.com/news/${searchTopic[0].slug}" style="color:#00796b; font-size="18px">here</a>.` || "No suggestion from Gemini"; 
    return NextResponse.json({ suggestion });
  } catch (err: any) {
    console.error("Gemini request error:", err);
    return NextResponse.json(
      { error: "Gemini request failed", details: err.message },
      { status: 500 }
    );
  }
}
