"use client"

import { useEffect, useState } from "react"
import { deleteUser } from "@/actions/delete-user"
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

interface DeleteUserButtonProps {
   userId: string
   userName: string
   listId: string
}

const initialState = {
   id: "",
   listId: "",
   message: "",
}

function DeleteUserButton({ userId, userName, listId }: DeleteUserButtonProps) {
   const [isMounted, setIsMounted] = useState(false)
   const [state, formAction] = useFormState(deleteUser, initialState)

   useEffect(() => {
      setIsMounted(true)
   }, [])

   if (state?.message != "") {
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
               value={userId}
               name="id"
               className="aria-hidden hidden"
               disabled={pending}
            />
            <Input
               value={listId}
               name="listId"
               className="aria-hidden hidden"
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
                  This action cannot be undone. This will permanently delete{" "}
                  <span className="text-black">&apos;{userName}&apos; </span>
                  from the list.
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
export default DeleteUserButton
