//export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
const supabase = createClient(
process.env.SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_SECRET! 
);

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-wp-signature");
if (!signature) {
return NextResponse.json({ error: "Missing signature" }, { status: 401 });
}

// recreate signature
const expected = crypto
.createHmac("sha256", process.env.WP_WEBHOOK_SECRET!)
.update(rawBody)
.digest("hex");

// timing safe compare (VERY important)
const valid = crypto.timingSafeEqual(
Buffer.from(signature),
Buffer.from(expected)
);

if (!valid) {
return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
}
const { postId } = JSON.parse(rawBody);
if (!postId) {
return NextResponse.json({ error: "Missing postId" }, { status: 400 });
}
try {
// Fetch specific post from WordPress
const wpRes = await fetch("https://content.culturays.com/graphql", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
query: `query GetPost($id: ID!) { 
conversation(id: $id, idType: DATABASE_ID) { 
id title excerpt content uri featuredImage { node { sourceUrl } } } }` ,
variables: { id: postId },
}),
});

const wpData = await wpRes.json();
const post = wpData.data.post;
if (!post) {
  return NextResponse.json({ error: "No post found" }, { status: 404 });
}

// 2️⃣ Build email-safe HTML
const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
    <h1>${post.title}</h1>

    ${
      post.featuredImage?.node?.sourceUrl
        ? `<img src="${post.featuredImage.node.sourceUrl}" style="width:100%;border-radius:8px"/>`
        : ""
    }

    <div>${post.excerpt}</div>

    <p style="margin-top:20px">
      <a href="https://culturays.com/${post.uri}" 
         style="background:#000;color:#fff;padding:12px 18px;text-decoration:none;border-radius:6px;">
         Read Full Story
      </a>
    </p>
  </div>
`;

// 3️⃣ Insert into Supabase
const { data, error } = await supabase
  .from("campaigns")
  .insert({
    wp_post_id: post.id,
    title: post.title,
    html_content: html,
    status: "draft",
    subject:""
  })
  .select()
  .single();

if (error) throw error;

return NextResponse.json({ success: true, campaign: data }); 

} catch (err) {
console.error(err);
return NextResponse.json({ error: "Import failed" }, { status: 500 });
}
}

