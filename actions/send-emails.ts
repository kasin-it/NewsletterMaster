"use server"

import { readFileSync } from "fs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { z } from "zod"

const schema = z.object({
   title: z.string(),
   listId: z.string().uuid(),
   html: z
      .instanceof(File)
      .refine((file) => file.type === "text/html", {
         message: "Only HTML files are allowed.",
      })
      .refine((file) => file.name.endsWith(".html"), {
         message: 'Please ensure the file extension is ".html".',
      })
      .refine((file) => file.size <= 5000000, `Max file size is 5MB.`),
})

export async function sendEmails(prevState: any, formData: FormData) {
   const title = formData.get("title")
   const listId = formData.get("listId")
   const html = formData.get("html") as File

   const arrayBuffer = await html.arrayBuffer()

   const validatedFields = schema.safeParse({
      title,
      listId,
      html,
   })

   console.log(arrayBuffer.toString())

   if (!validatedFields.success) {
      return {
         error: validatedFields.error.errors[0].message,
      }
   }

   return {
      message: "Emails has been sent!",
   }
}
