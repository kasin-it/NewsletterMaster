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
               name="listId"
               disabled={pending}
               defaultValue={""}
            />
         </div>
         <div>
            <Label>Email Template</Label>
            <Input type="file" accept="html" disabled={pending} name="html" />
         </div>
         <Button disabled={pending} type="submit">
            Send Emails
         </Button>
      </>
   )
}

function SendEmailsForm({ listId }: { listId: string }) {
   const initialState = {
      error: "",
      title: "",
      file: "",
      html: "",
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
         <input name="listId" value={listId} className="hidden" />
         <FormFields />
      </form>
   )
}
export default SendEmailsForm
