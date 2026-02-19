import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./server";

const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/auth/confirm",
  "/auth/auth-code-error",
  "/forgot-password",
];

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();
const supabase = await createClient()
  const path = request.nextUrl.pathname;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect unauthenticated users away from protected routes
  if (!user && path.startsWith("/profile")) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (path.startsWith("/protected")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

//   const isPublic = publicRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//  If logged in and visiting unprotected paths, redirect to homepage
  if (user && publicRoutes.some((up) => path.startsWith(up))) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
// BLOCK auth pages for logged-in users
//   if (isLoggedIn && isPublic) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   BLOCK protected routes for logged-out users
//   if (!isLoggedIn && "/") {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

 const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
 
  if (isDashboard && !user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
 
  return response;
}
