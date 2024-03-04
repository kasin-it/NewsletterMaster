import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import Stripe from "stripe"

import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
   const cookieStore = cookies()
   const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!,
      {
         cookies: {
            get(name: string) {
               return cookieStore.get(name)?.value
            },
         },
      }
   )

   const body = await req.text()
   const signature = headers().get("Stripe-Signature") as string

   let event: Stripe.Event

   try {
      event = stripe.webhooks.constructEvent(
         body,
         signature,
         process.env.STRIPE_WEBHOOK_SECRET!
      )
   } catch (error: any) {
      return new NextResponse(`Webhook Error: ${error.message}`, {
         status: 400,
      })
   }

   const session = event.data.object as Stripe.Checkout.Session

   if (event.type === "checkout.session.completed") {
      const subscription = await stripe.subscriptions.retrieve(
         session.subscription as string
      )

      if (!session?.metadata?.userId) {
         return new NextResponse("User id is required", { status: 400 })
      }

      await supabase.from("subscribers").insert({
         user_id: session?.metadata?.userId,
         stripe_subscription_id: subscription.id,
         stripe_customer_id: subscription.customer as string,
         stripe_price_id: subscription.items.data[0].price.id,
         stripe_current_period_end: new Date(
            subscription.current_period_end * 1000
         ),
      })
   }

   if (event.type === "invoice.payment_succeeded") {
      const subscription = await stripe.subscriptions.retrieve(
         session.subscription as string
      )

      await supabase.from("subscribers").update({
         where: {
            stripeSubscriptionId: subscription.id,
         },
         data: {
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
               subscription.current_period_end * 1000
            ),
         },
      })
   }

   return new NextResponse(null, { status: 200 })
}
