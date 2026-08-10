const API_BASE = (
  (import.meta.env["VITE_LYX_API_URL"] as string | undefined) ?? "http://127.0.0.1:8000"
).replace(/\/$/, "");

export async function askLyx(message: string, signal?: AbortSignal): Promise<string> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
    signal: signal ?? null,
  });

  if (!res.ok) throw new Error(`Lyx responded with ${res.status}`);

  return await res.text();
}
