"use client";
import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Copy, Download } from "lucide-react";

type Message = {
  role: string;
  content: string;
};

const models = ["GPT-4", "GPT-3.5", "Claude-3", "Gemini", "Other"];
const defaultTemplates = [
  { name: "Default Greeting", content: "Hello, how can I help you today?" },
  { name: "Quick Summary", content: "Summarize the following text..." },
];

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("light");
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [templates,] = useState(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplates[0].name);
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(150);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Send message to API (mock or real)
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          model: selectedModel,
          temperature,
          maxTokens,
        }),
      });

      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content ??
        "🤖 This is a mock AI response.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ Error fetching AI response" },
      ]);
    }
  };

  // Copy text
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // Download JSON
  const downloadJSON = (msg: string) => {
    const blob = new Blob([JSON.stringify({ response: msg }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "response.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Load template into input
  const loadTemplate = (name: string) => {
    const tmpl = templates.find((t) => t.name === name);
    if (tmpl) setInput(tmpl.content);
  };

  return (
    <div
      className={`flex flex-col h-screen w-full max-w-6xl mx-auto ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b dark:border-gray-700 gap-3 sm:gap-0">
        <h1 className="text-xl font-bold">⚡ AI Interface</h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          {/* Model Selector */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-current">
              Model:
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500
               text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
              aria-label="Select AI Model"
            >
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Template Selector */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-current">
              Template:
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => {
                setSelectedTemplate(e.target.value);
                loadTemplate(e.target.value);
              }}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500
               text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
              aria-label="Select Prompt Template"
            >
              {templates.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>

      {/* Parameters Panel */}
      <div className="flex flex-col sm:flex-row gap-4 p-3 border-b dark:border-gray-700">
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium text-current">Temperature: {temperature}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full"
            aria-label="Temperature Slider"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium text-current">Max Tokens: {maxTokens}</label>
          <input
            type="range"
            min={50}
            max={500}
            step={1}
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
            className="w-full"
            aria-label="Max Tokens Slider"
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-2xl max-w-3xl relative group ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-300 dark:bg-gray-800 dark:text-white self-start mr-auto"
            }`}
          >
            {msg.content}
            {msg.role === "assistant" && (
              <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => copyText(msg.content)}
                  className="text-xs flex items-center gap-1 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded"
                  aria-label="Copy message"
                >
                  <Copy size={14} /> Copy
                </button>
                <button
                  onClick={() => downloadJSON(msg.content)}
                  className="text-xs flex items-center gap-1 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded"
                  aria-label="Download JSON"
                >
                  <Download size={14} /> JSON
                </button>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 flex border-t dark:border-gray-700">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // prevent newline
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg p-2 mr-2 dark:bg-gray-800 dark:text-white resize-none"
          rows={2}
          aria-label="Chat Input"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          aria-label="Send Message"
        >
          Send
        </button>
      </div>
    </div>
  );
}
