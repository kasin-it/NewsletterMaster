import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import DeleteEmailListButton from "../../_components/delete-email-list-button"
import UpdateEmailListForm from "./_components/update-email-list-form"

async function SettingsPage({
   params: { list_id },
}: {
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
      .select("list_name, desc")
      .eq("id", list_id)

   if (error != null) {
      console.log(error)
   }

   return (
      <main className="flex flex-col gap-5 pb-5">
         <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">Settings</h1>
            <p className="text-sm text-muted-foreground">
               Use this endpoint in your form to signup them to your newsletter
            </p>
         </div>
         <Separator />
         <UpdateEmailListForm
            listId={list_id}
            listName={data![0].list_name}
            listDesc={data![0].desc}
         />
         <DeleteEmailListButton emailListId={list_id}>
            <Button variant={"destructive"}>Delete List</Button>
         </DeleteEmailListButton>
      </main>
   )
}
export default SettingsPage
