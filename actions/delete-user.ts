"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { z } from "zod"

const schema = z.object({
   id: z.string(),
   listId: z.string(),
})

export async function deleteUser(prevState: any, formData: FormData) {
   const id = formData.get("id")
   const listId = formData.get("listId")

   const validatedFields = schema.safeParse({
      id,
      listId,
   })

   if (!validatedFields.success) {
      return {
         message: validatedFields.error.errors[0].message,
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

   const { error } = await supabase
      .from("email_list_users")
      .delete()
      .eq("id", id)

   if (error != null) {
      return {
         message: "Something went wrong, try again later",
      }
   }

   redirect(`/dashboard/${listId}`)
}
