import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});
  

 export async function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown"; 
  let success = true;
try {
  const result = await ratelimit.limit(ip);
  success = result.success;
} catch (err) {
  console.warn("Rate limit check failed:", err); 
}
 
if (!success) {
    return new Response(JSON.stringify({ error: "Too many requests. Try again later." }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "Request successful" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
  });
}
