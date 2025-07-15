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
    const fakeShortUrl = `https://sho.rt/${Math.random().toString(36).substring(2, 8)}`;
    const now = new Date();
    const expires = new Date(now.getTime() + 30 * 60 * 1000);


    const data = {
      original: url,
      short: fakeShortUrl,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      clicks: 0,
      clickDetails: [],
    };

    const prev = JSON.parse(localStorage.getItem("shortenedLinks")) || [];
    localStorage.setItem("shortenedLinks", JSON.stringify([...prev, data]));

    setResults((prev) => [...prev, data]);
    setUrl("");

    log("frontend", "info", "page", "Simulated url");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
    <input
      type="text"
      placeholder="Enter URL"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      className="input"
    />
    <button type="submit" className="button">
      Shorten
    </button>
  </form>
  
  );
}

export default UrlForm;
