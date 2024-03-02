import Link from "next/link"
import { ArrowLeftCircle } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import Sidebar from "./_components/sidebar"

function AccountLayout({ children }: { children: React.ReactNode }) {
   return (
      <main className="container flex max-w-6xl flex-col gap-10 pt-40">
         <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
               <Link
                  href={"/dashboard"}
                  className="flex items-center gap-2 text-muted-foreground"
               >
                  <ArrowLeftCircle strokeWidth={1.3} /> Go back dashboard
               </Link>
               <h1 className="text-3xl font-bold">My Account</h1>
               <Separator />
            </div>
         </div>
         <div className="flex gap-8">
            <Sidebar />
            {children}
         </div>
      </main>
   )
}
export default AccountLayout
