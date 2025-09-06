// /app/api/newsletter-cron/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server'; 
import { Resend } from 'resend';
//0 6 * * * curl -s https://culturays.com/api/newsletter-cron >> /var/log/newsletter.log 2>&1
//
const resend = new Resend(process.env.RESEND_API_KEY);
 export async function GET() {
  try {
    const supabase = await createClient(); 
 
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: posts, error: postsError } = await supabase
      .from('queued_posts')
      .select('*')
      .gte('created_at', since);

    if (postsError) {
      console.error('❌ Failed to fetch posts:', postsError);
      return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
    }

    if (!posts || posts.length < 3) {
      console.log('⏩ Not enough posts to send newsletter today.');
      return NextResponse.json({ message: 'Not enough posts today' }, { status: 200 });
    }

    // Fetch subscribers
    const { data: subscribers, error: subError } = await supabase
      .from('newsletter')
      .select('email, name')
      .eq('unsubscribed', false);

    if (subError || !subscribers || subscribers.length === 0) {
      console.log('⚠️ No subscribers to send newsletter to.');
      return NextResponse.json({ message: 'No subscribers found' }, { status: 200 });
    }  

 
    for (const sub of subscribers) {
           const { email, name} = sub; 
             const safeName = name || 'there';
      if (!email) continue;

      await resend.emails.send({
        from: 'News Headlines Today <contact@culturays.com>',
        to: email,
        replyTo: 'contact@culturays.com',
        subject: `Today's Headlines - ${new Date().toLocaleDateString()}`,
        html:   ` 
      <h2>Today's Top Stories</h2>
      ${posts
        .map(
          (p) => `
           <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <img src=${p.image} alt="Newsletter Banner" style="width: 50%; border-radius: 6px; margin-bottom: 20px;" />
    
        <p style="font-size: 16px; color: #333333; text-transform: capitalize;">Hi ${safeName},</p>
    
        <h2 style="font-size: 22px; color: #2c3e50; margin: 10px 0;">${p.title}</h2>
     ${p.url ? `<p><a href="${p.url}" style="display:inline-block;margin-top:1em;padding:0.5em 1em;background:#0070f3;color:white;text-decoration:none;border-radius:5px;">Read Full Post</a></p>` : ''}
        <p style="font-size: 16px; color: #444444; line-height: 1.6;">
          ${p?.excerpt}
        </p>
    
        <p style="margin-top: 30px; font-size: 15px; color: #333333;">
          Warm regards,<br>
          <strong>Urban Naija</strong>
        </p>
    
        <hr style="margin: 40px 0; border: none; border-top: 1px solid #eaeaea;" />
    <footer style="font-size: 13px; color: #999999; text-align: center;">
      You are receiving this email because you subscribed to GoWork newsletter.<br>
      <a href="https://culturays.com/api/unsubscribe?email=${encodeURIComponent(p.email)}" style="color: #999999;">Unsubscribe</a>
    </footer>
      </div>
        `
        )
        .join('')}
    `,
      });
    }

    console.log(`📨 Sent newsletter to ${subscribers.length} subscribers.`);

    // Optional: clear old posts so queue doesn’t grow forever
   // await supabase.from('queued_posts').delete().lte('created_at', since);
// Instead of deleting by date:
await supabase.from('queued_posts').delete().in('id', posts.map(p => p.id));

    return NextResponse.json({ message: 'Newsletter sent' }, { status: 200 });
  } catch (err) {
    console.error('❌ Error in /newsletter-cron:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}