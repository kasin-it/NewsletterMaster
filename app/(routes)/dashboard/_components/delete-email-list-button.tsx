"use client"

import { useEffect, useState } from "react"
import { deleteEmailList } from "@/actions/delete-email-list"
import { Trash2 } from "lucide-react"

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

function DeleteEmailListButton({
   emailListId,
   emailListName,
}: DeleteEmailListButtonProps) {
   const [isMounted, setIsMounted] = useState(false)

   useEffect(() => {
      setIsMounted(true)
   }, [])

   if (!isMounted) {
      return (
         <Button size={"icon"} className="size-8" variant={"destructive"}>
            <Trash2 className="size-5" />
         </Button>
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
               <form action={deleteEmailList}>
                  <Input value={emailListId} name="id" className="hidden" />
                  <Button variant={"destructive"}>Continue</Button>
               </form>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
export default DeleteEmailListButton
