"use client";
import { useState } from "react";
   //find the coin no this page and earn real money from reading and sharing - coind emebede within a concealed share button

// Cowry card rcharge
// Feature their short videos.

export default function AISuggestions() {
  const [topic, setTopic] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const getSuggestions = async () => {
    setLoading(true);
    setSuggestion("");
    const res = await fetch("/api/ai-suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    }); 

    const data = await res.json();
    setSuggestion(data.suggestion || "No suggestions found.");
    setLoading(false);
  };

  return (
    <div className="max-w-xl p-6 rounded-xl shadow-md space-y-4">     
          <h2 className="text-lg font-semibold">AI Assitance? Look here for more! Click to get Personalized Suggestions</h2>
        <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic (e.g. asuu strike, world bank)"
        className="w-full p-2 border rounded-md"
      /> 

      <button
        onClick={getSuggestions}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Thinking..." : "Get AI Suggestions"}
      </button>

      {suggestion && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50 whitespace-pre-wrap">
          <h3 className="font-semibold mb-2">Done:</h3>
          <div dangerouslySetInnerHTML={{ __html: suggestion.replace(/\n/g, "<br />") }} />
        </div>
      )} 
     
      </div>
  );
}
