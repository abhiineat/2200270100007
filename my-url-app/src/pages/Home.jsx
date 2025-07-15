import React, { useState } from "react";
import UrlForm from "../components/UrlForm";
import StatsList from "../components/StatsList";

function Home() {
  const [results, setResults] = useState([]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>URL Shortener</h1>
      <UrlForm setResults={setResults} />
      <StatsList data={results} />
    </div>
  );
}

export default Home;
