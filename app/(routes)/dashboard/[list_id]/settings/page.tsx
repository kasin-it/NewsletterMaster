import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function SettingsPage({
   params: { list_id },
}: {
   params: { list_id: string }
}) {
   return (
      <main className="flex flex-col gap-5 pb-5">
         <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">Settings</h1>
            <p className="text-sm text-muted-foreground">
               Use this endpoint in your form to signup them to your newsletter
            </p>
         </div>
         <Separator />
         <form className="flex flex-col gap-3">
            <div>
               <Label>List name</Label>
               <Input placeholder={"Name"} />
            </div>
            <Button>Update</Button>
         </form>
         <form>
            <Button variant={"destructive"}>Delete List</Button>
         </form>
      </main>
   )
}
export default SettingsPage
