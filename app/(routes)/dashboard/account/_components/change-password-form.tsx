"use client"

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
            <Label>Change Password</Label>
            <Input name="password" type="text" placeholder="password" />
         </div>
         <Button disabled={pending} type="submit">
            Change Password
         </Button>
      </>
   )
}

function ChangePasswordForm() {
   const initialState = {
      error: "",
      message: "",
      password: "",
   }

   const [state, formAction] = useFormState(changePassword, initialState)
   return (
      <form action={formAction} method="POST" className="flex flex-col gap-3">
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
export default ChangePasswordForm
