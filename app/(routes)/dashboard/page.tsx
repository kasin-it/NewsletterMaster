import { cookies } from "next/headers"
import Link from "next/link"
import { createServerClient } from "@supabase/ssr"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { columns } from "./_components/columns"
import { EmailListsTable } from "./_components/email-lists-table"

async function DashboardPage() {
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

   const { data, error } = await supabase
      .from("email_lists")
      .select("list_name, desc, updated_at, created_at, id")

   if (error != null) {
      return "error"
   }

   return (
      <main className="container flex max-w-6xl flex-col gap-10 pt-40">
         <div className="flex flex-wrap items-center justify-between gap-10">
            <h1 className="text-3xl font-bold">My email lists:</h1>
            <Link
               href={"/dashboard/create-email-list"}
               className={cn(buttonVariants({ variant: "default" }))}
            >
               Create New Email List
            </Link>
         </div>
         <EmailListsTable columns={columns} data={data} />
      </main>
   )
}
export default DashboardPage
