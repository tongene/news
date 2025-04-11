'use server'
import { redirect } from "next/navigation"
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const full_name = formData.get("full_name")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin"); 
  if (!email || !password) {
    return { error: "Email and password are required" };
  };

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name, 
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-in", error.message);
  } else {
    return encodedRedirect( 
      "success",
      "/sign-in",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();
  const origin =(await headers()).get("origin") as string; 
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect(origin);
};
 export const handleOauthLogin = async () => {
    'use server';
    const origin =(await headers()).get("origin"); 
   const supabase =await createClient();
   const referer = (await headers()).get("referer");
 
   const redirectTo = referer 
   ? `${origin}/auth/callback?redirect_to=${encodeURIComponent('/forum')}`
   : `${origin}/auth/callback`;
     const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',  
    options: { 
    redirectTo ,
   }, 
     })
   
    if (error) {
      console.log(error)        
   } 
    console.log(redirectTo)
    return redirect(data.url as string);
  };
   