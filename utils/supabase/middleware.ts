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

  if (path.startsWith("/protected/") && !user) {
    return NextResponse.redirect(new URL("/sign-in/", request.url));
  }

  if (user && unprotectedPaths.some((up) => path.startsWith(up))) {
    return NextResponse.redirect(new URL("/", request.url));
  }
 response.headers.set('confirm',request.nextUrl.searchParams.toString() ) 
 response.headers.set('x-url',request.nextUrl.pathname) 
  return response;

//     let response = NextResponse.next({
//       request: {
//         headers: request.headers,
//       },
//     });

//     const supabase = createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         cookies: {
//           getAll() {
//             return request.cookies.getAll();
//           },
//           setAll(cookiesToSet) {
//             cookiesToSet.forEach(({ name, value }) =>
//               request.cookies.set(name, value),
//             );
//             // response = NextResponse.next({
//             //   request,
//             // });
//             cookiesToSet.forEach(({ name, value, options }) =>
//               response.cookies.set(name, value, options),
//             );
//           },
//         },
//       },
//     );
 
// const user = await supabase.auth.getUser(); 
// const path = new URL(request.url).pathname;   
// const unprotectedPaths = ["/sign-in/", "/forgot-password/"]; 
// if (request.nextUrl.pathname.startsWith("/protected/") && user.error) {
// return NextResponse.redirect(new URL("/sign-in/", request.url));
// }
 
//    const isUnprotectedPath = unprotectedPaths.some((up) => path.startsWith(up));
//   if (user.data.user && isUnprotectedPath) { 
//       return NextResponse.redirect(new URL("/", request.url));
//      } 
 
//      // return response;
//      response.headers.set('confirm',request.nextUrl.searchParams.toString() ) 
//      response.headers.set('x-url',request.nextUrl.pathname) 
//     return NextResponse.next({
//       request: {
//         headers: request.headers,
//       },
    
//     });

};
 
