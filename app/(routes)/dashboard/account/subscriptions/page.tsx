import { Separator } from "@/components/ui/separator"

function SubscriptionsPage() {
   return (
      <main className="flex flex-col gap-5 pb-5">
         <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">Subscribtion</h1>
            <p className="text-sm text-muted-foreground">
               Manage your subscribtions
            </p>
         </div>
         <Separator />
         {/* <UpdateEmailListForm
      listId={list_id}
      listName={data![0].list_name}
      listDesc={data![0].desc}
   />
   <DeleteEmailListButton emailListId={list_id}>
      <Button variant={"destructive"}>Delete List</Button>
   </DeleteEmailListButton> */}
      </main>
   )
}
export default SubscriptionsPage
