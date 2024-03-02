"use client"

import { useEffect, useState, useTransition } from "react"
import { deleteUser } from "@/actions/delete-user"
import { Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"

interface DeleteUserButtonProps {
   userId: string
   userName: string
   listId: string
}

function DeleteUserButton({ userId, userName, listId }: DeleteUserButtonProps) {
   const [isMounted, setIsMounted] = useState(false)
   const [isPending, startTransition] = useTransition()

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
                  This action cannot be undone. This will permanently delete{" "}
                  <span className="text-black">&apos;{userName}&apos; </span>
                  from the list.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction
                  className={cn(buttonVariants({ variant: "destructive" }))}
                  onClick={() =>
                     startTransition(() => deleteUser({ listId, userId }))
                  }
               >
                  Continue
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
export default DeleteUserButton
