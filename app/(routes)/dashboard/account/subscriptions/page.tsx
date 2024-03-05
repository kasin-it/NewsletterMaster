import { cookies } from "next/headers"
import Link from "next/link"
import { createServerClient } from "@supabase/ssr"
import { ShieldCheckIcon } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import SubscribeButton from "./_compoenents/subscribe-button"
import UnSubscribeButton from "./_compoenents/unsubscribe-button"

async function SubscriptionsPage() {
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

   const { data, error } = await supabase.from("subscribers").select().limit(1)

   const getSubscriptionStatus = () => {
      if (!data || data.length === 0) {
         return "unsubscribed"
      }

      if (isExpired()) {
         return "expired"
      }

      return "active"
   }

   const isExpired = () => {
      const currentPeriodEnd = new Date(data![0].stripe_current_period_end)
      const now = new Date()

      return currentPeriodEnd < now
   }

   const SubscriptionStatus = () => {
      const status = getSubscriptionStatus()

      let message, button

      switch (status) {
         case "unsubscribed":
            message = "Upgrade to premium"
            button = <SubscribeButton>Subscribe</SubscribeButton>
            break
         case "expired":
            message = "Your subscription expired"
            button = <SubscribeButton>Renew Subscription</SubscribeButton>
            break
         default:
            message = "You are already subscribed"
            button = <UnSubscribeButton>Unsubscribe</UnSubscribeButton>
            break
      }

      return (
         <div className="bg-gray-900 dark:bg-gray-50">
            <div className="container px-4 md:px-6">
               <div className="flex flex-col flex-wrap items-center justify-center gap-5 space-y-4 px-3 py-12 md:space-y-0 md:px-5 lg:px-10 lg:py-16">
                  <ShieldCheckIcon className="size-16 rounded-lg bg-gray-900 p-2 text-gray-50 dark:bg-gray-50 dark:text-gray-900" />
                  <div className="grid gap-2">
                     <h3 className="text-center text-lg font-bold tracking-tighter text-white sm:text-xl md:text-2xl">
                        {message}
                     </h3>
                     <p className="text-center text-sm tracking-wide text-gray-300 dark:text-gray-400 md:text-base">
                        Upgrade to premium for ad-free browsing, unlimited
                        downloads, and exclusive content.
                     </p>
                  </div>

                  {button}
               </div>
            </div>
         </div>
      )
   }

   return (
      <main className="flex flex-col gap-5 pb-5">
         <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">Subscribtion</h1>
            <p className="text-sm text-muted-foreground">
               Manage your subscribtions
            </p>
         </div>
         <Separator />
         <SubscriptionStatus />
      </main>
   )
}
export default SubscriptionsPage
