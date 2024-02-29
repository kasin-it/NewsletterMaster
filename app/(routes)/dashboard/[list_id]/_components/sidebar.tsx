"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarProps {
   listName: string
   listId: string
}

function Sidebar({ listName, listId }: SidebarProps) {
   const items = [
      {
         label: "List users",
         href: `/dashboard/${listId}`,
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
      <nav className={"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"}>
         {items.map((item) => (
            <Link
               key={item.href}
               href={item.href}
               className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === item.href
                     ? "bg-primary text-white hover:bg-primary hover:text-white"
                     : "hover:bg-transparent hover:underline",
                  "justify-start"
               )}
            >
               {item.label}
            </Link>
         ))}
      </nav>
   )
}
export default Sidebar
