"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
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

   const validatedFields = schema.safeParse({
      title,
      listId,
      html,
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

   const { data, error } = await supabase
      .from("email_list_users")
      .select("email")

   if (error != null) {
      return {
         error: error.message,
      }
   }

   if (data.length == 0) {
      return {
         error: "You dont have any subscribers",
      }
   }

   const nodemailer = require("nodemailer")
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.EMAIL_ADDRESS,
         pass: process.env.EMAIL_PASSWORD,
      },
   })

   const htmlContent = await html.arrayBuffer()

   data.forEach(async (user) => {
      const result = await transporter.sendMail({
         from: "noreply",
         to: user.email,
         subject: title,
         text: new Uint8Array(htmlContent),
      })
   })

   redirect("/dashboard/" + listId)
}
