import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_SECRET!);

export async function POST(req: NextRequest, res: NextApiResponse) {
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
 return NextResponse.json(
      { message: `
    <html>
      <body style="font-family: Arial; text-align: center; padding: 40px;">
        <h2>You have been unsubscribed.</h2>
        <p>You’ll no longer receive emails from GoWork Africa Reinvented.</p>
      </body>
    </html>
  `  },
      { status: 200 }
    );
 
}
