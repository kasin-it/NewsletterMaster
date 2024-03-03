"use server"

import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { z } from "zod"

const schema = z.object({
   password: z.string().min(6, "Password has to be at least 6 characters"),
})

export async function changePassword(prevState: any, formData: FormData) {
   const password = formData.get("password")

   const validatedFields = schema.safeParse({
      password,
   })

   if (!validatedFields.success) {
      return {
         error: validatedFields.error.errors[0].message,
      }
   }

   const cookieStore = cookies()

   const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
         cookies: {
            get(name: string) {
               return cookieStore.get(name)?.value
            },
         },
      }
   )

   const { error } = await supabase.auth.updateUser({
      // @ts-ignore
      password: password,
   })

   if (error != null) {
      return {
         error: "Something went wrong, try again later",
      }
   }
}
