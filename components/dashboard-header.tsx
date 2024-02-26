"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { User } from "lucide-react"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"
import Logo from "./ui/logo"

export default function DashboardHeader() {
   const [top, setTop] = useState<boolean>(true)

   // detect whether user has scrolled the page down by 10px
   const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true)
   }

   useEffect(() => {
      scrollHandler()
      window.addEventListener("scroll", scrollHandler)
      return () => window.removeEventListener("scroll", scrollHandler)
   }, [top])

   return (
      <header
         className={`fixed z-30 w-full transition duration-300 ease-in-out md:bg-opacity-90 ${!top ? "bg-white shadow-lg backdrop-blur-sm" : ""}`}
      >
         <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="flex h-16 items-center justify-between md:h-20">
               {/* Site branding */}
               <div className="mr-4 shrink-0">
                  <Logo />
               </div>

               {/* Desktop navigation */}
               <nav className="flex md:grow">
                  {/* Desktop sign in links */}
                  <ul className="flex grow flex-wrap items-center justify-end gap-2">
                     <li>
                        <Link
                           href="/dashboard/account"
                           className={cn(
                              buttonVariants({ variant: "default" }),
                              "gap-2"
                           )}
                        >
                           My Account
                           <User className="size-5" />
                        </Link>
                     </li>
                  </ul>
               </nav>
            </div>
         </div>
      </header>
   )
}
