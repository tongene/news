import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(
req: NextRequest,
) {
const supabase =await createClient();
const {
  data: { user },
} = await supabase.auth.getUser();
const id = await req.json()
   const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = session.access_token; 
  if (!accessToken) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }

// const res = await fetch(
// `http://localhost:4000/campaigns/${id}/send`,
// {
// method: "POST",
// headers: {
// Authorization: `Bearer ${accessToken}`, 
// "x-forwarded-user":user?.id as string,
// "x-forwarded-email":user?.email as string
// },
// } 
// );

// const text = await res.text();
let data;
// try {
//   data = JSON.parse(text); 
// } catch {
//   return NextResponse.json(
//     { error: "Fastify did not return JSON", raw: text },
//     { status: 500 }
//   );
// }, { status: res.status}

return NextResponse.json(data);
}
