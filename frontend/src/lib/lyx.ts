const API_BASE = (
  (import.meta.env.VITE_LYX_API_URL as string | undefined) ??
  "http://127.0.0.1:8000"
).replace(/\/$/, "");


export async function streamLyx(
  message: string,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal,
): Promise<void> {

  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      message,
    }),

    signal,
  });


  // ---------------------------------------------------------
  // CHECK HTTP RESPONSE
  // ---------------------------------------------------------

  if (!res.ok) {

    let errorMessage = `Lyx responded with ${res.status}`;

    try {

      const errorData = await res.json();

      if (errorData?.error) {
        errorMessage = errorData.error;
      }

    } catch {
      // Ignore JSON parsing errors
    }

    throw new Error(errorMessage);
  }


  // ---------------------------------------------------------
  // CHECK STREAM
  // ---------------------------------------------------------

  if (!res.body) {
    throw new Error("Lyx returned no response stream.");
  }


  // ---------------------------------------------------------
  // READ STREAM
  // ---------------------------------------------------------

  const reader = res.body.getReader();

  const decoder = new TextDecoder("utf-8");


  try {

    while (true) {

      const {
        value,
        done,
      } = await reader.read();


      if (done) {
        break;
      }


      const chunk = decoder.decode(value, {
        stream: true,
      });


      if (chunk) {
        onChunk(chunk);
      }

    }


    // Flush any remaining decoded text

    const remaining = decoder.decode();

    if (remaining) {
      onChunk(remaining);
    }


  } finally {

    reader.releaseLock();

  }
}