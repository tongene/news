import { type NextRequest, NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr"; 
// import { type NextRequest, NextResponse } from "next/server";
 
// // export const updateSession = async (request: NextRequest) => {
// //   // if (request.nextUrl.pathname.startsWith("/auth/callback")) {
// //   //   return NextResponse.next();
// //   // }

// //   const response = NextResponse.next();

// //   const supabase = createServerClient(
// //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
// //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// //     {
// //       cookies: {
// //         getAll: () => request.cookies.getAll(),
// //         setAll: (cookies) =>
// //           cookies.forEach(({ name, value, options }) => {
// //             response.cookies.set(name, value, options);
// //           }),
// //       },
// //     }
// //   );

// //   const { data: { user } } = await supabase.auth.getUser();
// //   const path = request.nextUrl.pathname;

// //   const unprotectedPaths = ["/sign-in/", "/forgot-password/"];
// //    if (!user && request.nextUrl.pathname.startsWith("/profile")) {
// //     return NextResponse.redirect(new URL("/sign-in/", request.url));
// //   } 
// //   if (path.startsWith("/protected/") && !user) {
// //     return NextResponse.redirect(new URL("/sign-in/", request.url));
// //   }

// //   if (user && unprotectedPaths.some((up) => path.startsWith(up))) {
// //     return NextResponse.redirect(new URL("/", request.url));
// //   }
// // //  response.headers.set('confirm',request.nextUrl.searchParams.toString() ) 
// // //  response.headers.set('x-url',request.nextUrl.pathname) 
// //   return response;

 
// // };
 
 
// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({
//     request,
//   });
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll()
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
//           supabaseResponse = NextResponse.next({
//             request,
//           })
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, options)
//           )
//         },
//       },
//     }
//   );
//   // IMPORTANT: Avoid writing any logic between createServerClient and
//   // supabase.auth.getUser(). A simple mistake could make it very hard to debug
//   // issues with users being randomly logged out.
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   // if (
//   //   !user &&
//   //   !request.nextUrl.pathname.startsWith('/sign-in') &&
//   //   !request.nextUrl.pathname.startsWith('/auth')
//   // ) {
//   //   // no user, potentially respond by redirecting the user to the login page
//   //   const url = request.nextUrl.clone();
//   //   url.pathname = '/sign-in';
//   //   return NextResponse.redirect(url);
//   // }
//  const path = request.nextUrl.pathname;

//   const unprotectedPaths = ["/forgot-password/"];
//    if (!user && request.nextUrl.pathname.startsWith("/profile")) {
//       const url = request.nextUrl.clone();
//       url.pathname = '/sign-in';
//     return NextResponse.redirect(url);
//   } 
//   if (path.startsWith("/protected/") && !user) {
//       const url = request.nextUrl.clone();
//       url.pathname = '/sign-in';
//     return NextResponse.redirect(url);
   
//   }

//   if (user && unprotectedPaths.some((up) => path.startsWith(up))) {
//      const url = request.nextUrl.clone();
//       url.pathname = '/';
//     return NextResponse.redirect(url);
//   }
//   return supabaseResponse;
// }




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
