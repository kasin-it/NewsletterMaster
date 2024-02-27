import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { createServerClient } from "@supabase/ssr"

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
      .from("email_lists")
      .select("id, list_name, email_list_users (*)")
      .eq("id", list_id)

   if (!data) {
      notFound()
   }

   if (error != null) {
      console.log(error)
   }

   return <section></section>
}
export default ListNamePage
