// Assure-toi que ce fichier existe bien.
const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function fetchFromServer(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${txt || res.statusText}`);
  }
  return res.json();
}
