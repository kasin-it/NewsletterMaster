import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function AccountPage() {
   return (
      <main className="flex flex-col gap-5 pb-5">
         <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">Personal Info</h1>
            <p className="text-sm text-muted-foreground">
               Use this endpoint in your form to signup them to your newsletter
            </p>
         </div>
         <Separator />
         <form>
            <Label>Email</Label>
            <Input />
            <Button>Change Email</Button>
         </form>
         <form>
            <Label>Password</Label>
            <Input />
            <Button>Change Password</Button>
         </form>
      </main>
   )
}
export default AccountPage
