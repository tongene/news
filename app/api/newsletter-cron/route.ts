import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server'; 
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
 export async function GET() {
  try {
    const supabase = await createClient();
    const millisecondsInOneDay = 1000 * 60 * 60 * 24;
    const millisecondsInTwoDays = millisecondsInOneDay * 30;
    const since = new Date(Date.now() - millisecondsInTwoDays).toISOString();
    const { data: posts, error: postsError } = await supabase
      .from("queued_posts")
      .select("*")
     .gte('created_at', since);

    if (postsError) {
      console.error("❌ Failed to fetch posts:", postsError);
      return NextResponse.json(
        { message: "Failed to fetch posts" },
        { status: 500 }
      );
    }

    if (posts.length === 0) {
      console.log("⏩ Not enough posts to send newsletter today.");
      return NextResponse.json(
        { message: "Not enough posts today" },
        { status: 200 }
      );
    }

  
    const { data: subscribers, error: subError } = await supabase
      .from("newsletter")
      .select("email, name")
      .eq("unsubscribed", false);

    if (subError || !subscribers || subscribers.length === 0) {
      console.log("⚠️ No subscribers to send newsletter to.");
      return NextResponse.json(
        { message: "No subscribers found" },
        { status: 200 }
      );
    }

    for (const sub of subscribers) {
      const postsHtml = posts
        .filter((p) => p.title)
        .map(
          (p) => ` 
      <h2>Today's Top Stories</h2> 
           <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <img src=${p.image} alt="Newsletter Banner" style="width: 50%; border-radius: 6px; margin-bottom: 20px;" />   
        <h2 style="font-size: 22px; color: #2c3e50; margin: 10px 0;">${p.title}</h2>
     ${p.url ? `<p><a href="${p.url}" style="display:inline-block;margin-top:1em;padding:0.5em 1em;background:#0070f3;color:white;text-decoration:none;border-radius:5px;">Read Full Post</a></p>` : ""}
        <p style="font-size: 16px; color: #444444; line-height: 1.6;">
          ${p.excerpt}
        </p>
    
        <p style="margin-top: 30px; font-size: 15px; color: #333333;">
          Warm regards,<br>
          <strong>Urban Naija</strong>
        </p>
       
      </div> 
      `
        )
        .join("");
 
      const htmlContent = `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      <h2 style="color:#2c3e50;">Today's Top Stories</h2> 
         <p style="font-size: 16px; color: #333333; text-transform: capitalize;">Hi ${sub.name},</p>
      ${postsHtml}
    
       <hr style="margin: 40px 0; border: none; border-top: 1px solid #eaeaea;" />        
       <h2 style="font-size: 22px; color: #2c3e50; margin: 10px 0;">Information Made for You</h2>

        <img src="/tinitasks-poster.JPG" alt="Tini Tasks Poster" style="width: 50%; border-radius: 6px; margin-bottom: 20px;" />

        <p><a href="https://gowork.africareinvented.com/" style="display:inline-block;margin-top:1em;padding:0.5em 1em;background:#0070f3;color:white;text-decoration:none;border-radius:5px;">Connect. Collaborate. Conquer</a></p>

        <hr style="margin: 40px 0; border: none; border-top: 1px solid #eaeaea;" />
      
       <footer style="font-size: 13px; color: #999999; text-align: center;">
         <p style="font-size:14px; color:#777;">You're receiving this email because you subscribed to Urban Naija News. <br/>If you'd like to unsubscribe, click <a href="https://culturays.com/api/unsubscribe?email=${encodeURIComponent(
           sub.email
         )}" style="color:#00796b;">here</a>.</p>

    </footer>
    </div>
  `;

      // Send the email
      await resend.emails.send({
        from: "Urban Naija News — <contact@culturays.com>",
        to: sub.email,
        replyTo: "contact@culturays.com",
        subject: `Today's Top Stories - ${new Date().toLocaleDateString()}`,
        html: htmlContent,
      });
    }

    console.log(`📨 Sent newsletter to ${subscribers.length} subscribers.`);

    await supabase
      .from("queued_posts")
      .delete()
      .in(
        "id",
        posts.map((p) => p.id)
      );

    return NextResponse.json({ message: "Newsletter sent" }, { status: 200 });
  } catch (err) {
    console.error('❌ Error in /newsletter-cron:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}