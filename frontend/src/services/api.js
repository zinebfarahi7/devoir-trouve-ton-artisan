// src/services/api.js

// Base API: une seule fois "…/api"
const API =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.replace(/\/$/, "")) ||
  "http://localhost:4000/api";

export const fetchJSON = async (url, opts = {}) => {
  const fullUrl = `${API}${url.startsWith("/") ? url : `/${url}`}`;
  console.log("[API call]", fullUrl); // ← tu verras l’URL finale dans la console

  const res = await fetch(fullUrl, {
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    ...opts,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
};
