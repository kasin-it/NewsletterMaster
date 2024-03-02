import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { createServerClient } from "@supabase/ssr"

import { Separator } from "@/components/ui/separator"

import { columns } from "./_components/columns"
import SubscribersChart from "./_components/subscribers-chart"
import { UsersTable } from "./_components/users_table"

interface ListNamePageProps {
   params: {
      list_id: string
   }
}

async function ListNamePage({ params: { list_id } }: ListNamePageProps) {
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
      .from("email_list_users")
      .select("id, name, email, created_at, email_list_id")
      .eq("email_list_id", list_id)
      .order("created_at", { ascending: true })

   if (!data) {
      notFound()
   }

   if (error != null) {
      console.log(error)
   }

   return (
      <main className="flex flex-col gap-5 pb-5">
         <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">List subscribers</h1>
            <p className="text-sm text-muted-foreground">
               Use this endpoint in your form to signup them to your newsletter
            </p>
         </div>
         <Separator />
         <SubscribersChart data={data} />
         <UsersTable columns={columns} data={data} />
      </main>
   )
}
export default ListNamePage
