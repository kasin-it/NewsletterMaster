import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { createServerClient } from "@supabase/ssr"

import SideBar from "./_components/sidebar"

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
      .select("list_name")
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
            <h1 className="text-4xl font-bold">
               List Control ({data[0].list_name})
            </h1>
         </div>
         <div className="flex">
            <SideBar />
            {children}
         </div>
      </main>
   )
}
export default ListNameLayout
