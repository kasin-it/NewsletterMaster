"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"

import { stripe } from "@/lib/stripe"

export async function subscribe() {
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
      revalidatePath("/dashboard/account")
   }

   const userId = user!.id

   const afterUrl = "http://localhost:3000/dashboard/account"

   const { data } = await supabase
      .from("subscribers")
      .select("stripe_customer_id")
      .eq("user_id", user?.id)

   const userSubscription = data

   console.log(userSubscription)

   if (
      userSubscription &&
      userSubscription.length > 0 &&
      userSubscription[0].stripe_customer_id
   ) {
      const stripeSession = await stripe.billingPortal.sessions.create({
         customer: userSubscription[0].stripe_customer_id,
         return_url: afterUrl,
      })

      redirect(stripeSession.url)
   }

   const stripeSession = await stripe.checkout.sessions.create({
      success_url: afterUrl,
      cancel_url: afterUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user?.email,
      line_items: [
         {
            price_data: {
               currency: "USD",
               product_data: {
                  name: "Genius Pro",
                  description: "Unlimited AI Generations",
               },
               unit_amount: 2000,
               recurring: {
                  interval: "month",
               },
            },
            quantity: 1,
         },
      ],
      metadata: {
         userId,
      },
   })

   redirect(stripeSession.url!)
}
