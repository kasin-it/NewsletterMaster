"use client"

import { sendEmails } from "@/actions/send-emails"
import { AlertCircle } from "lucide-react"
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
            <Label>Title</Label>
            <Input
               placeholder="Example name"
               name="listName"
               disabled={pending}
               defaultValue={""}
            />
         </div>
         <div>
            <Label>Description</Label>
            <Input
               id="profilePicture"
               type="file"
               accept="html/*"
               disabled={pending}
            />
         </div>
         <Button disabled={pending} type="submit">
            Send Emails
         </Button>
      </>
   )
}

function SendEmailsForm() {
   const initialState = {
      error: "",
   }
   const [state, formAction] = useFormState(sendEmails, initialState)

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
export default SendEmailsForm
