import { Separator } from "@/components/ui/separator"

import ChangeEmailForm from "./_components/change-email-form"
import ChangePasswordForm from "./_components/change-password-form"

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
         <ChangeEmailForm />
         <ChangePasswordForm />
      </main>
   )
}
export default AccountPage
