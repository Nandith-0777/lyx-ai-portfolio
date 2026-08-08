const API_BASE = (
  (import.meta.env["VITE_LYX_API_URL"] as string | undefined) ??
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

export async function askLyx(
  message: string,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain",
    },
    body: JSON.stringify({ message }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Lyx responded with ${response.status}`);
  }

  if (!response.body) {
    throw new Error("Lyx returned an empty response stream.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  try {
    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      if (value) {
        const chunk = decoder.decode(value, {
          stream: true,
        });

        if (chunk) {
          onChunk(chunk);
        }
      }
    }

    const remaining = decoder.decode();

    if (remaining) {
      onChunk(remaining);
    }
  } finally {
    reader.releaseLock();
  }
}