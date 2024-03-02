"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { z } from "zod"

const schema = z.object({
   userId: z.string(),
   listId: z.string(),
})

export async function deleteUser({
   listId,
   userId,
}: {
   listId: string
   userId: string
}) {
   const validatedFields = schema.safeParse({
      userId,
      listId,
   })

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
      .eq("id", userId)

   if (error != null) {
      console.log(error)
   }

   revalidatePath(`/dashboard/${listId}`)
}
