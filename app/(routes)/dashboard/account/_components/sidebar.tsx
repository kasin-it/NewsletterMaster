"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Sidebar() {
   const items = [
      {
         label: "Account",
         href: `/dashboard/account`,
      },
      {
         label: "Subscriptions",
         href: `/dashboard/account/subscriptions`,
      },
   ]
   const pathname = usePathname()
   const router = useRouter()

   const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   )

   const handleSignOut = async () => {
      await supabase.auth.signOut()
      router.push("/")
   }

   return (
      <nav className={"flex gap-2 overflow-x-auto md:flex-col"}>
         {items.map((item) => (
            <Link
               key={item.href}
               href={item.href}
               className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === item.href
                     ? "bg-primary text-white hover:bg-primary hover:text-white"
                     : "hover:bg-transparent hover:underline",
                  "w-[200px] md:justify-start"
               )}
            >
               {item.label}
            </Link>
         ))}
         <Button
            variant={"outline"}
            className="w-[200px] md:justify-start"
            onClick={handleSignOut}
         >
            Sign Out
         </Button>
      </nav>
   )
}
export default Sidebar
