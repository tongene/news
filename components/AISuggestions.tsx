"use client";

import { useState } from "react";

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
      body: JSON.stringify({ topic, currentText }),
    });

    const data = await res.json();
    setSuggestion(data.suggestion || "No suggestions found.");
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">AI Content Suggestions</h2>

      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic (e.g. sustainable fashion)"
        className="w-full p-2 border rounded-md"
      />

      <textarea
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        placeholder="Paste your draft or ideas..."
        rows={6}
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
          <h3 className="font-semibold mb-2">Suggestions:</h3>
          <div dangerouslySetInnerHTML={{ __html: suggestion.replace(/\n/g, "<br />") }} />
        </div>
      )}
    </div>
  );
}
