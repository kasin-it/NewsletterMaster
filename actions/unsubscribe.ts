"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"

import { stripe } from "@/lib/stripe"

export async function unsubscribe() {
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

   const {
      data: { user },
   } = await supabase.auth.getUser()

   if (!user) {
      revalidatePath("/dashboard/account/subscriptions")
   }

   const afterUrl = process.env.WEBSITE_URI + "/dashboard/account"

   const { data } = await supabase
      .from("subscribers")
      .select("stripe_customer_id, stripe_subscription_id")
      .eq("user_id", user?.id)
   await supabase.from("subscribers").delete().eq("user_id", user?.id)

   const userSubscription = data

   if (
      userSubscription &&
      userSubscription.length > 0 &&
      userSubscription[0].stripe_subscription_id
   ) {
      await stripe.subscriptions.update(
         userSubscription[0].stripe_subscription_id,
         { cancel_at_period_end: true }
      )

      redirect(afterUrl)
   }

   redirect(afterUrl)
}
