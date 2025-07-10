import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_SECRET!);

export async function POST(req: NextRequest) {
  const resp=await req.json()
  if (!resp.email || typeof resp.email !== 'string') {
    return NextResponse.json({ message: 'Invalid email.' },
      { status: 400 });
  }

  const { error } = await supabase
    .from('newsletter')
    .update({ unsubscribed: true })
    .eq('email', resp.email.toLowerCase());

  if (error) {
    return NextResponse.json({ message: 'Failed to unsubscribe.' },
      { status: 500 });
  }
    const html = `
    <html>
      <head>
        <title>Unsubscribed</title>
      </head>
      <body style="font-family: Arial; text-align: center; padding: 40px;">
        <h2>You have been unsubscribed.</h2>
        <p>You’ll no longer receive emails from Culturays.</p>
      </body>
    </html>
  `;

 return new NextResponse(html, {
  status: 200,
  headers: {
    'Content-Type': 'text/html',
  },
});

}
