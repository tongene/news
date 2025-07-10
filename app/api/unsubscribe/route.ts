import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_SECRET!);

// export async function GET(req: NextRequest) {
//   const resp=await req.json()
//   if (!resp.email || typeof resp.email !== 'string') {
//     return NextResponse.json({ message: 'Invalid email.' },
//       { status: 400 });
//   }

//   const { error } = await supabase
//     .from('newsletter')
//     .update({ unsubscribed: true })
//     .eq('email', resp.email.toLowerCase());

//   if (error) {
//     return NextResponse.json({ message: error },
//       { status: 500 });
//   }


// }


 export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return new NextResponse('Missing email.', { status: 400 });
  }

  const { error } = await supabase
    .from('newsletter')
    .update({ unsubscribed: true })
    .eq('email', email.toLowerCase());

  if (error) {
    return new NextResponse('Failed to unsubscribe.', { status: 500 });
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
 // return NextResponse.redirect(new URL('/unsubscribe-success', req.url));
}
