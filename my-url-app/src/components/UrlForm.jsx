import React, { useState } from "react";
import { log } from "../utils/logger";

function UrlForm({ setResults }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url || !url.startsWith("http")) {
      log("frontend", "warn", "page", "User submitted invalid URL");
      return;
    }

    // 🔧 Simulate a shortened URL
    const fakeShortUrl = `https://sho.rt/${Math.random().toString(36).substring(2, 8)}`;
    const now = new Date();
    const expires = new Date(now.getTime() + 60 * 60 * 1000); // +1 hour

    const data = {
      original: url,
      short: fakeShortUrl,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      clicks: 0,
      clickDetails: [],
    };

    // 💾 Store in localStorage
    const prev = JSON.parse(localStorage.getItem("shortenedLinks")) || [];
    localStorage.setItem("shortenedLinks", JSON.stringify([...prev, data]));

    // ✅ Update UI
    setResults((prev) => [...prev, data]);
    setUrl("");

    // 🧾 Log it
    log("frontend", "info", "form", "Simulated URL shortening and saved to localStorage");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border px-3 py-2 w-full md:w-96"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
        Shorten
      </button>
    </form>
  );
}

export default UrlForm;
