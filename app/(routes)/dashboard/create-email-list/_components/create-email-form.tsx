"use client"

import { createEmailList } from "@/actions/create-email-list"
import { AlertCircle } from "lucide-react"
import { useFormState, useFormStatus } from "react-dom"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const initialState = {
   message: "",
   listName: "",
   desc: "",
}

function FormFields() {
   const { pending } = useFormStatus()
   return (
      <>
         <div>
            <Label>List Name *</Label>
            <Input
               placeholder="Example name"
               name="listName"
               disabled={pending}
            />
         </div>
         <div>
            <Label>Description</Label>
            <Textarea
               placeholder="Example description"
               name="desc"
               disabled={pending}
            />
         </div>
         <Button disabled={pending} type="submit">
            Create List
         </Button>
      </>
   )
}

function CreateEmailListForm() {
   const [state, formAction] = useFormState(createEmailList, initialState)
   return (
      <form action={formAction} method="post" className="flex flex-col gap-3">
         {state?.message && (
            <Alert
               variant="destructive"
               className="bg-destructive text-white [&>svg]:text-white"
            >
               <AlertCircle className="h-4 w-4" />
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>{state?.message}</AlertDescription>
            </Alert>
         )}
         <FormFields />
      </form>
   )
}
export default CreateEmailListForm
