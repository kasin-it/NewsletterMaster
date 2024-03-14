"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarProps {
   listId: string
}

function Sidebar({ listId }: SidebarProps) {
   const items = [
      {
         label: "Subscribers",
         href: `/dashboard/${listId}`,
      },
      {
         label: "Send emails",
         href: `/dashboard/${listId}/send-emails`,
      },
      {
         label: "API endpoints",
         href: `/dashboard/${listId}/endpoints`,
      },
      {
         label: "Settings",
         href: `/dashboard/${listId}/settings`,
      },
   ]
   const pathname = usePathname()

   return (
      <nav className={"flex gap-2 overflow-x-auto lg:flex-col"}>
         {items.map((item) => (
            <Link
               key={item.href}
               href={item.href}
               className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === item.href
                     ? "bg-primary text-white hover:bg-primary hover:text-white"
                     : "hover:bg-transparent hover:underline",
                  "w-full max-w-[200px] lg:justify-start"
               )}
            >
               {item.label}
            </Link>
         ))}
      </nav>
   )
}
export default Sidebar
