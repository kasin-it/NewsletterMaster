"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { z } from "zod"

const schema = z.object({
   email: z.string().email(),
})

export async function sendEmails(prevState: any, formData: FormData) {
   const email = formData.get("email")

   const validatedFields = schema.safeParse({
      email,
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
      email: email,
   })

   if (error != null) {
      return {
         error: "Something went wrong, try again later",
      }
   }

   revalidatePath("/dashboard/account")
}
