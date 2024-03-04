"use client"

import { changeEmail } from "@/actions/change-email"
import { changePassword } from "@/actions/change-password"
import { AlertCircle, Check } from "lucide-react"
import { useFormState, useFormStatus } from "react-dom"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function FormFields() {
   const { pending } = useFormStatus()
   return (
      <>
         <div>
            <Label>Change Email</Label>
            <Input name="email" type="text" placeholder="email" />
         </div>
         <Button disabled={pending} type="submit">
            Change Email
         </Button>
      </>
   )
}

function ChangeEmailForm() {
   const initialState = {
      error: "",
      email: "",
   }

   const [state, formAction] = useFormState(changeEmail, initialState)
   return (
      <form action={formAction} className="flex flex-col gap-3">
         {state?.error && (
            <Alert
               variant="destructive"
               className="bg-destructive text-white [&>svg]:text-white"
            >
               <AlertCircle className="h-4 w-4" />
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>{state?.error}</AlertDescription>
            </Alert>
         )}
         <FormFields />
      </form>
   )
}
export default ChangeEmailForm
