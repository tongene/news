import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (!email || !token) {
    return NextResponse.json({ error: "Invalid link" }, { status: 400 });
  }

  const expected = crypto
    .createHmac("sha256", process.env.UNSUBSCRIBE_SECRET!)
    .update(email)
    .digest("hex");

  if (token !== expected) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_SECRET!
  );

  await supabase
    .from("newsletter_js_2")
    .update({
      unsubscribed: true,
      unsubscribed_at: new Date()
    })
    .eq("email", email);

  return new Response(
    `<div style="font-family:sans-serif;text-align:center;padding:40px">
      <h2>You have been unsubscribed.</h2>
      <p>You will no longer receive our newsletters.</p>
    </div>`,
    { headers: { "Content-Type": "text/html" } }
  );
}