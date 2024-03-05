import { cookies } from "next/headers"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { ArrowLeftCircle } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import Sidebar from "./_components/sidebar"

async function ListNameLayout({
   children,
   params: { list_id },
}: {
   children: React.ReactNode
   params: { list_id: string }
}) {
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
      .select("list_name, id")
      .eq("id", list_id)

   if (!data) {
      notFound()
   }

   if (error != null) {
      console.log(error)
   }

   return (
      <main className="container flex max-w-6xl flex-col gap-10 pt-40">
         <div className="flex items-center justify-between">
            <div className="flex w-full flex-col gap-4">
               <Link
                  href={"/dashboard"}
                  className="flex items-center gap-2 text-muted-foreground"
               >
                  <ArrowLeftCircle strokeWidth={1.3} /> Go back dashboard
               </Link>
               <h1 className="text-3xl font-bold">
                  List Control ({data[0].list_name})
               </h1>
               <Separator />
            </div>
         </div>
         <div className="flex flex-col gap-8 lg:flex-row">
            <Sidebar listId={data[0].id} />
            {children}
         </div>
      </main>
   )
}
export default ListNameLayout
