// lib/fetchWithTrace.js
export async function fetchWithTrace(url:string, options = {}) {
  const start = Date.now();
 
  const errForStack = new Error();
  const stackLines = errForStack.stack
    ?.split("\n")
    .slice(2, 8)  
    .map(line => line.trim())
    .join("\n");

  console.log("\n[TRACE] Fetch called from:\n" + stackLines);
  console.log(`[TRACE] Fetching: ${url}`);

  try {
    const res = fetch(url, options);
    const duration = Date.now() - start;
      const resp=await res
    console.log(`[TRACE] ${url} → Status: ${resp} (${duration} ms)`);

    // Read the body as text first so we can inspect it
    const text = await resp.text();
    console.log(`[TRACE] First chars: "${text.slice(0, 80).replace(/\n/g, " ")}"`);

    // Try parsing JSON if it looks like JSON
    if (resp.headers.get("content-type")?.includes("application/json")) {
      try {
        return JSON.parse(text);
      } catch (err) {
         if(err instanceof Error)
        console.error(`[TRACE] JSON parse failed for ${url}:`, err.message);
        throw err;
      }
    } else { 
      console.warn(`[TRACE] Skipping JSON parse — response is not JSON`);
      return text;
    }

  } catch (err) {
    if(err instanceof Error)
    console.error(`[TRACE] Fetch failed for ${url}:`, err.message);
    throw err;
  }
}
