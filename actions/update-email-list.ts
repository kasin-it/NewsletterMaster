"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { z } from "zod"

const schema = z.object({
   listName: z.string().min(4, "List Name has to be at least 4 characters"),
   listId: z.string().uuid(),
   desc: z
      .string()
      .max(256, "Description can have maximum length of 258 characters")
      .optional(),
})

export async function updateEmailList(prevState: any, formData: FormData) {
   const listName = formData.get("listName")
   const listId = formData.get("listId")
   const desc = formData.get("desc")

   const validatedFields = schema.safeParse({
      listName,
      listId,
      desc,
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

   const userId = (await supabase.auth.getUser()).data.user?.id

   const { error } = await supabase
      .from("email_lists")
      .update({
         list_name: listName,
         desc,
         updated_at: new Date(Date.now()),
         user_id: userId,
      })
      .eq("id", listId)

   console.log(error)

   if (error != null) {
      return {
         message: "Something went wrong, try again later",
      }
   }

   revalidatePath(`/dashboard/${listId}/settings`)
}
