"use client"

import { updateEmailList } from "@/actions/update-email-list"
import { AlertCircle } from "lucide-react"
import { useFormState, useFormStatus } from "react-dom"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function FormFields({
   listId,
   listName,
   listDesc,
}: {
   listId: string
   listName?: string
   listDesc?: string
}) {
   const { pending } = useFormStatus()
   return (
      <>
         <Input name="listId" value={listId} className="aria-hidden hidden" />
         <div>
            <Label>List Name *</Label>
            <Input
               placeholder="Example name"
               name="listName"
               disabled={pending}
               defaultValue={listName || ""}
            />
         </div>
         <div>
            <Label>Description</Label>
            <Textarea
               placeholder="Example description"
               name="desc"
               disabled={pending}
               defaultValue={listDesc || ""}
            />
         </div>
         <Button disabled={pending} type="submit">
            Update
         </Button>
      </>
   )
}

function UpdateEmailListForm({
   listId,
   listName,
   listDesc,
}: {
   listId: string
   listName?: string
   listDesc?: string
}) {
   const initialState = {
      message: "",
      listId: listId,
      listName: listName,
      desc: listDesc,
   }

   const [state, formAction] = useFormState(updateEmailList, initialState)
   return (
      <form action={formAction} method="POST" className="flex flex-col gap-3">
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
         <FormFields listId={listId} listDesc={listDesc} listName={listName} />
      </form>
   )
}
export default UpdateEmailListForm
