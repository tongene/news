import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export async function POST(req: Request) {    
    const raw = await req.text();
    const body = JSON.parse(raw);   
    const secret = req.headers.get("x-wp-secret");
    const { title, excerpt, image, url, date,  postId} = body; 
  if (secret !== process.env.WP_SECRET) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

if (!postId) {
return NextResponse.json({ error: "Missing postId" }, { status: 400 });
}
try {
 
if (!title) {
  return NextResponse.json({ error: "No post found", title, postId  }, { status: 404 });
}  

// 2️⃣ Build email-safe HTML
const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
    <h1>${title}</h1>

    ${
      image
        ? `<img src="${image}" style="width:100%;border-radius:8px"/>`
        : ""
    }

    <div>${excerpt}</div>

    <p style="margin-top:20px">
      <a href="https://culturays.com/${url}" 
         style="background:#000;color:#fff;padding:12px 18px;text-decoration:none;border-radius:6px;">
         Read Full Story
      </a>
    </p>
  </div>
`;

// 3️⃣ Insert into Supabase
const supabase =await createClient(
process.env.SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_SECRET! 
);

const { data, error } = await supabase
  .from("campaigns")
  .insert({
    wp_post_id: postId,
    title,
    html_content: html,
    status: "draft",
    subject:"Naija News Today",
    image,
    created_at:date,
    sent_at:new Date().toDateString(),
    url,
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