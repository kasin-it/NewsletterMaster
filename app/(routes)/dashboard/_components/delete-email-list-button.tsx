"use client"

import { useEffect, useState } from "react"
import { deleteEmailList } from "@/actions/delete-email-list"
import { Loader2, Trash2 } from "lucide-react"
import { useFormState, useFormStatus } from "react-dom"

import {
   AlertDialog,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DeleteEmailListButtonProps {
   emailListId: string
   emailListName: string
}

const initialState = {
   id: "",
   message: "",
}

function DeleteEmailListButton({
   emailListId,
   emailListName,
}: DeleteEmailListButtonProps) {
   const [isMounted, setIsMounted] = useState(false)
   const [state, formAction] = useFormState(deleteEmailList, initialState)

   useEffect(() => {
      setIsMounted(true)
   }, [])

   if (state.message != "") {
      console.log(state.message)
   }

   if (!isMounted) {
      return (
         <Button size={"icon"} className="size-8" variant={"destructive"}>
            <Trash2 className="size-5" />
         </Button>
      )
   }

   const FormFields = () => {
      const { pending } = useFormStatus()
      return (
         <>
            <Input
               value={emailListId}
               name="id"
               className="hidden"
               disabled={pending}
            />
            <Button disabled={pending} variant={"destructive"}>
               {pending ? <Loader2 className="animate-spin" /> : <>Continue</>}
            </Button>
         </>
      )
   }

   return (
      <AlertDialog>
         <AlertDialogTrigger>
            <Button size={"icon"} className="size-8" variant={"destructive"}>
               <Trash2 className="size-5" />
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your{" "}
                  <span className="text-black">
                     &apos;{emailListName}&apos;{" "}
                  </span>
                  and remove all its data from our servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <form action={formAction} method="post">
                  <FormFields />
               </form>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
export default DeleteEmailListButton
