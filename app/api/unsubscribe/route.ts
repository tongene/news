import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_SECRET!);

export async function POST(req: NextRequest, res: NextApiResponse) {
  const resp=await req.json()
  if (!resp.email || typeof resp.email !== 'string') {
    return res.status(400).json({ message: 'Invalid email.' });
  }

  const { error } = await supabase
    .from('newsletter')
    .update({ unsubscribed: true })
    .eq('email', resp.email.toLowerCase());

  if (error) {
    return res.status(500).json({ message: 'Failed to unsubscribe.', error });
  }

  return res.status(200).send(`
    <html>
      <body style="font-family: Arial; text-align: center; padding: 40px;">
        <h2>You have been unsubscribed.</h2>
        <p>You’ll no longer receive emails from GoWork Africa Reinvented.</p>
      </body>
    </html>
  `);
}
