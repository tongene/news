import { NextRequest, NextResponse } from 'next/server'; 
import { createClient } from '@/utils/supabase/server'; 
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
    if (!title || !excerpt) {
      return NextResponse.json({ message: 'Missing title or excerpt' }, { status: 400 });
    }
   
    const wpSecret = request.headers.get('x-wp-secret');
    if (wpSecret !== process.env.WP_SECRET) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient(); 

    // Insert into queue
    const { error } = await supabase.from('queued_posts').insert([
      {
        title,
        excerpt,
        image,
        url,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('❌ Failed to queue post:', error);
      return NextResponse.json({ message: 'Failed to queue post' }, { status: 500 });
    }

    return NextResponse.json({ message: '✅ Post queued for newsletter' }, { status: 200 });
  } catch (err) {
    console.error('❌ Error in newsletter-queue:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}