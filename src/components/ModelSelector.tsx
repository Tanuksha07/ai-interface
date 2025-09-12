"use client";

import { useState, useEffect } from "react";

const models = ["GPT-4", "GPT-3.5", "Claude-3", "Gemini", "Other"];

export default function ModelSelector() {
  const [selected, setSelected] = useState(models[0]);
  const [theme, setTheme] = useState("light");

  // Optional: sync with theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
  }, []);

  return (
    <div className="flex flex-col gap-1 p-4 rounded-xl shadow-md">
      <label className={`font-semibold text-sm ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
        Model:
      </label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className={`p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
          ${theme === "dark" ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
      >
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
      <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        Selected: <span className="font-medium">{selected}</span>
      </p>
    </div>
  );
}
