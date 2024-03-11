"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { z } from "zod"

const schema = z.object({
   listName: z.string().min(4, "List Name has to be at least 4 characters"),
   desc: z
      .string()
      .max(256, "Description can have maximum length of 258 characters")
      .optional(),
})

export async function createEmailList(prevState: any, formData: FormData) {
   const listName = formData.get("listName")
   const desc = formData.get("desc")

   const validatedFields = schema.safeParse({
      listName,
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

   const { data: subscriberData, error: subscriberError } = await supabase
      .from("subscribers")
      .select("stripe_current_period_end")

   if (subscriberError !== null) {
      console.error("Error fetching subscriber data:", subscriberError)
      return {
         message: "An unexpected error occurred, please try again.",
      }
   }

   const { data: emailListsData, error: emailListsError } = await supabase
      .from("email_lists")
      .select("id")

   if (emailListsError !== null) {
      console.error("Error fetching email lists data:", emailListsError)
      return {
         message: "An unexpected error occurred, please try again.",
      }
   }

   const currentTime = new Date(Date.now())

   if (
      !(subscriberData && subscriberData.length > 0) &&
      emailListsData &&
      emailListsData.length > 0
   ) {
      return {
         message: "You must subscribe to create more than one email list.",
      }
   }

   if (
      subscriberData &&
      subscriberData.length >= 1 &&
      subscriberData[0].stripe_current_period_end &&
      currentTime.getTime() < subscriberData[0].stripe_current_period_end
   ) {
      return {
         message: "You must subscribe to create more than one email list.",
      }
   }

   try {
      const { error } = await supabase
         .from("email_lists")
         .insert([{ list_name: listName, desc, user_id: userId }])

      if (error !== null) {
         throw new Error(error.message)
      }
   } catch (err) {
      console.error("Error creating email list:", err)
      return {
         message: "Something went wrong, please try again.",
      }
   }
   redirect("/dashboard")
}
