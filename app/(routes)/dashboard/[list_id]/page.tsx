import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { createServerClient } from "@supabase/ssr"

import { columns } from "./_components/columns"
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

   if (!data) {
      notFound()
   }

   if (error != null) {
      console.log(error)
   }

   return <UsersTable columns={columns} data={data} />
}
export default ListNamePage
