import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { z } from "zod"

const dataSchema = z.object({
   name: z.string(),
   email: z.string().email(),
})

export async function POST(request: NextRequest, response: NextResponse) {
   const cookieStore = cookies()

   let parsedData

   try {
      parsedData = dataSchema.parse(await request.json())
   } catch (error) {
      console.log(error)
      return new NextResponse("Invalid input format.", { status: 500 })
   }

   const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
         cookies: {
            get(name: string) {
               return cookieStore.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
               cookieStore.set({ name, value, ...options })
            },
            remove(name: string, options: CookieOptions) {
               cookieStore.set({ name, value: "", ...options })
            },
         },
      }
   )

   const url = new URL(request.url)
   const listId = url.searchParams.get("id")

   if (!listId) {
      return new NextResponse("Missing required 'id' parameter.", {
         status: 400,
      })
   }

   const { error } = await supabase
      .from("email_list_users")
      .insert([{ ...parsedData, email_list_id: listId }])

   if (error != null) {
      console.error("Failed to add record:", error)
      switch (error.code) {
         case "23505": // Unique constraint violation
            return new NextResponse("Email address has already been taken.", {
               status: 400,
            })
         default:
            return new NextResponse("An unknown error occurred.", {
               status: 500,
            })
      }
   }

   return new NextResponse("Successfully subscribed.", { status: 200 })
}
