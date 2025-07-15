const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const API_URL = "http://20.244.56.144/evaluation-service/logs";

/**
 * Sends a log to the evaluation server.
 * 
 * @param {"frontend" | "backend"} stack 
 * @param {"debug" | "info" | "warn" | "error" | "fatal"} level 
 * @param {string} pkg 
 * @param {string} message 
 */
export async function log(stack, level, pkg, message) {
  if (!ACCESS_TOKEN) {
    console.error("❌ ACCESS_TOKEN is missing");
    return;
  }

  // ✅ Define body BEFORE using it
  const logBody = {
    stack,
    level,
    package: pkg, // must be "package", not "pkg"
    message,
  };
  console.log("Sending body:", JSON.stringify(logBody, null, 2));

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(logBody),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Log sent:", data);
  } catch (err) {
    console.error("❌ Failed to send log:", err.message);
  }
}
