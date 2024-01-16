import { NextResponse, type NextRequest } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
   let response = NextResponse.next({
      request: {
         headers: request.headers,
      },
   })

   const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
         cookies: {
            get(name: string) {
               return request.cookies.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
               request.cookies.set({
                  name,
                  value,
                  ...options,
               })
               response = NextResponse.next({
                  request: {
                     headers: request.headers,
                  },
               })
               response.cookies.set({
                  name,
                  value,
                  ...options,
               })
            },
            remove(name: string, options: CookieOptions) {
               request.cookies.set({
                  name,
                  value: "",
                  ...options,
               })
               response = NextResponse.next({
                  request: {
                     headers: request.headers,
                  },
               })
               response.cookies.set({
                  name,
                  value: "",
                  ...options,
               })
            },
         },
      }
   )

   const {
      data: { user },
   } = await supabase.auth.getUser()

   if (
      (request.nextUrl.pathname.startsWith("/auth/sign-in") ||
         request.nextUrl.pathname.startsWith("/auth/sign-up") ||
         request.nextUrl.pathname === "/") &&
      !!user
   ) {
      return NextResponse.redirect(new URL(`/dashboard`, request.url))
   }

   if (request.nextUrl.pathname.startsWith("/dashboard") && !user) {
      return NextResponse.redirect(new URL(`/auth/sign-in`, request.url))
   }

   return response
}

export const config = {
   matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       * Feel free to modify this pattern to include more paths.
       */
      "/((?!_next/static|_next/image|favicon.ico).*)",
   ],
}
