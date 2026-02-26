import { NextRequest, NextResponse } from 'next/server'; 
import { createClient } from '@/utils/supabase/server';
import { createClient as serverRole } from "@supabase/supabase-js";
import crypto from "crypto";
/**
 * Send bulk newsletter emails in batches.
 * @param {string} title - The title of the newsletter.
 * @param {string} excerpt - A short excerpt or summary.
 * @param {number} batchSize - Max number of recipients per batch (default: 50).
 */ 
  
 
export async function POST(request: NextRequest) {
   const body = await request.json(); 
   console.log(body)
    const wpSecret = request.headers.get('x-wp-secret');
    if (wpSecret !== process.env.WP_SECRET) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { title, excerpt, image, url, date } = body;  
   
    if (wpSecret !== process.env.WP_SECRET) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

 const { postId } =body;
if (!postId) {
return NextResponse.json({ error: "Missing postId" }, { status: 400 });
}
try {

if (!title) {
  return NextResponse.json({ error: "No post found" }, { status: 404 });
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
const supabase =await serverRole(
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



  // try {
  //   const body = await request.json();
  //   const { title, excerpt, image, url, content } = body;
  //   if (!title || !excerpt) {
  //     return NextResponse.json({ message: 'Missing title or excerpt' }, { status: 400 });
  //   }
   
  //   const wpSecret = request.headers.get('x-wp-secret');
  //   if (wpSecret !== process.env.WP_SECRET) {
  //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  //   }

  //   const supabase = await createClient(); 

  //   // Insert into queue
  //   const { error } = await supabase.from('queued_posts').insert([
  //     {
  //       title,
  //       excerpt,
  //       image,
  //       url,
  //       created_at: new Date().toISOString(),
  //     },
  //   ]);

  //   if (error) {
  //     console.error('❌ Failed to queue post:', error);
  //     return NextResponse.json({ message: 'Failed to queue post' }, { status: 500 });
  //   }

  //   return NextResponse.json({ message: '✅ Post queued for newsletter' }, { status: 200 });
  // } catch (err) {
  //   console.error('❌ Error in newsletter-queue:', err);
  //   return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  // }




}