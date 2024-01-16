import Link from "next/link"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"
import Logo from "./ui/logo"

function LandingNavbar() {
   const ROUTES = [
      {
         label: "Pricing",
         href: "/pricing",
      },
      {
         label: "Pricing",
         href: "/pricing",
      },
      {
         label: "Pricing",
         href: "/pricing",
      },
   ]

   return (
      <section className="sticky flex justify-center py-4">
         <nav className="text-md container flex items-center justify-between rounded-xl bg-foreground px-2 py-2 text-background">
            <div className="ps-2">
               <Logo />
            </div>
            <ul className="flex gap-5">
               {ROUTES.map((route) => (
                  <li key={route.href}>
                     <Link href={route.href} className="px-1 py-1">
                        {route.label}
                     </Link>
                  </li>
               ))}
            </ul>
            <Link
               className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-7 uppercase"
               )}
               href={"/auth/sign-in"}
            >
               Sign In
            </Link>
         </nav>
      </section>
   )
}
export default LandingNavbar
