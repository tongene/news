import { type NextRequest, NextResponse } from "next/server";
//   // IMPORTANT: Avoid writing any logic between createServerClient and
//   // supabase.auth.getUser(). A simple mistake could make it very hard to debug
//   // issues with users being randomly logged out.

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();

  // Supabase stores access token in this cookie by default
  const accessToken = request.cookies.get("sb-access-token")?.value;
  const path = request.nextUrl.pathname;

  // Define which paths should always be accessible without auth
  const unprotectedPaths = ["/forgot-password/"];

  // Redirect unauthenticated users away from protected routes
  if (!accessToken && path.startsWith("/profile")) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (!accessToken && path.startsWith("/protected/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  // If logged in and visiting unprotected paths, redirect to homepage
  if (accessToken && unprotectedPaths.some((up) => path.startsWith(up))) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return response;
}
