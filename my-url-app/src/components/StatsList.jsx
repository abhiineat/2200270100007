import React from "react";

function StatsList({ data }) {
  return (
    <div>
      {data.map((item, i) => (
        <div key={i}>
          <p><b>Short:</b> {item.short}</p>
          <p><b>Created:</b> {item.createdAt}</p>
          <p><b>Expires:</b> {item.expiresAt}</p>
          <p><b>Clicks:</b> {item.clicks}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsList;
