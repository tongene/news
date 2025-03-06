import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
 
export const createClient =async () => {
const cookieStore =await cookies();
 const supabaseClient = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_SECRET!, 
    {
      cookies: {
         async getAll() {
          return (await cookieStore).getAll();
        },

        setAll(cookiesToSet) {
          try {                      
          cookiesToSet
          .forEach(async ({ name , value , options
           }) =>
         (await cookieStore).set( name , value , options
          )
                      );
                    } catch (error) {}
                  },
 
      },
    }
  ) 
  return supabaseClient.auth;
};