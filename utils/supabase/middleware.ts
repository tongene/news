import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
 
export const updateSession = async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith("/auth/callback")) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) =>
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          }),
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  const unprotectedPaths = ["/sign-in/", "/forgot-password/"];
   if (!user && request.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/sign-in/", request.url));
  } 
  if (path.startsWith("/protected/") && !user) {
    return NextResponse.redirect(new URL("/sign-in/", request.url));
  }

  if (user && unprotectedPaths.some((up) => path.startsWith(up))) {
    return NextResponse.redirect(new URL("/", request.url));
  }
//  response.headers.set('confirm',request.nextUrl.searchParams.toString() ) 
//  response.headers.set('x-url',request.nextUrl.pathname) 
  return response;

 
};
 