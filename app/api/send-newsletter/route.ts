import { NextRequest, NextResponse } from 'next/server'; 
import { createClient } from '@/utils/supabase/server';
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY);
/**
 * Send bulk newsletter emails in batches.
 * @param {string} title - The title of the newsletter.
 * @param {string} excerpt - A short excerpt or summary.
 * @param {number} batchSize - Max number of recipients per batch (default: 50).
 */ 
 
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, image, url } = body;
    console.log(title, excerpt, image, url)
    if (!title || !excerpt) {
      return NextResponse.json(
        { message: 'Missing title or excerpt' },
        { status: 400 }
      );
    }

    // Optional: Verify secret header for security (recommended)
    const wpSecret = request.headers.get('x-wp-secret');
    if (wpSecret !== process.env.WP_SECRET) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
const supabase = await createClient()
const { data: newsletter, error } = await supabase
  .from('newsletter')
  .select('email, name')
  .eq('unsubscribed', false);
  

if (error) {
console.error('Failed to fetch newsletter subscribers:', error);
return;
  }

  if (!newsletter || newsletter.length === 0) {
    console.warn('No subscribers found.');
    return;
  }

  console.log(`📨 Sending personalized emails to ${newsletter.length} subscribers...`);

  for (const person of newsletter) {
    const { email, name} = person;

    if (!email) continue;

    const safeName = name || 'there';
 
     await resend.emails.send({
        from: 'culturays',
        to: email,
        subject: 'News Headlines Today',
        html: `
  <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
    <img src=${image} alt="Newsletter Banner" style="width: 50%; border-radius: 6px; margin-bottom: 20px;" />

    <p style="font-size: 16px; color: #333333;">Hi ${safeName},</p>

    <h2 style="font-size: 22px; color: #2c3e50; margin: 10px 0;">${title}</h2>
 ${url ? `<p><a href="${url}" style="display:inline-block;margin-top:1em;padding:0.5em 1em;background:#0070f3;color:white;text-decoration:none;border-radius:5px;">Read Full Post</a></p>` : ''}
    <p style="font-size: 16px; color: #444444; line-height: 1.6;">
      ${excerpt}
    </p>

    <p style="margin-top: 30px; font-size: 15px; color: #333333;">
      Warm regards,<br>
      <strong>Culturays</strong>
    </p>

    <hr style="margin: 40px 0; border: none; border-top: 1px solid #eaeaea;" />
<footer style="font-size: 13px; color: #999999; text-align: center;">
  You are receiving this email because you subscribed to GoWork newsletter.<br>
  <a href="https://culturays.com/api/unsubscribe?email=${encodeURIComponent(email)}" style="color: #999999;">Unsubscribe</a>
</footer>
  </div>
`, 
      });

   
  }

  console.log('📬 All personalized emails processed.');
   // await sendPersonalizedNewsletter(title, excerpt);

    return NextResponse.json({ message: 'Newsletter sent' }, { status: 200 });
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
