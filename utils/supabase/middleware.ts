import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// export const updateSession = async (request: NextRequest) => {
//   try {
//     // Start with default response
//     let response = NextResponse.next();

//     // Ignore static files and API routes
//     const pathname = request.nextUrl.pathname;
//     const isStatic = pathname.match(/\.(.*)$/);
//     const isAPI = pathname.startsWith("/api");

//     if (isStatic || isAPI) {
//       return response;
//     }

//     // Define routes
//     const publicRoutes = ["/", "/sign-in", "/forgot-password", "/news"];
//     const isPublicArticle = /^\/news\/article\/[\w-]+$/.test(pathname);
//     const isUnprotected = publicRoutes.some((p) => pathname.startsWith(p)) || isPublicArticle;

//     // Supabase client for SSR
//     const supabase = createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         cookies: {
//           getAll: () => request.cookies.getAll(),
//           setAll: (cookiesToSet) => {
//             cookiesToSet.forEach(({ name, value, options }) => {
//               response.cookies.set(name, value, options);
//             });
//           },
//         },
//       }
//     if (user && (pathname === "/sign-in" || pathname === "/forgot-password")) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     return response;
//   } catch (error) {
//     console.error("Middleware error:", error);
//     return NextResponse.next();
//   }
// };

// // Limit middleware scope to protected paths only
// export const config = {
//   matcher: ["/protected/:path*"],
// };  );

//     const { data: { user }, error } = await supabase.auth.getUser();

//     // If the user is not logged in and trying to access protected pages
//     if (!user && pathname.startsWith("/protected")) {
//       return NextResponse.redirect(new URL("/sign-in", request.url));
//     }

//     // If the user IS logged in but goes to public-only pages
//   

export const updateSession = async (request: NextRequest) => {
 // try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            // response = NextResponse.next({
            //   request,
            // });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );
 
    const user = await supabase.auth.getUser(); 
      const path = new URL(request.url).pathname;  
   
  const unprotectedPaths = ["/sign-in", "/forgot-password"]; 
      if (request.nextUrl.pathname.startsWith("/protected") && user.error) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
  
  //     if (request.nextUrl.pathname === "/" && !user.error) {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
   const isUnprotectedPath = unprotectedPaths.some((up) => path.startsWith(up));
  if (user.data.user && isUnprotectedPath) { 
      return NextResponse.redirect(new URL("/", request.url));
     } 
     // return response;
     response.headers.set('confirm',request.nextUrl.searchParams.toString() ) 
     response.headers.set('x-url',request.nextUrl.pathname) 
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    
    });

};
