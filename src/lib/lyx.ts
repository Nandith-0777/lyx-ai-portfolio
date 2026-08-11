const API_BASE = (
  (import.meta.env["VITE_LYX_API_URL"] as string | undefined) ?? "http://127.0.0.1:8000"
).replace(/\/$/, "");

export async function askLyx(
  message: string,
  onChunk: (text: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
    signal: signal ?? null,
  });

  if (!res.ok || !res.body) throw new Error(`Lyx responded with ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value, { stream: true }));
  }
}