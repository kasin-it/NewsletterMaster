"use client"

import { useEffect, useState, useTransition } from "react"
import { deleteEmailList } from "@/actions/delete-email-list"
import { Loader2, Trash2 } from "lucide-react"

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

interface DeleteEmailListButtonProps {
   emailListId: string
   emailListName?: string
   children: React.ReactNode
}

function DeleteEmailListButton({
   emailListId,
   emailListName,
   children,
}: DeleteEmailListButtonProps) {
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
         <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone.
                  {emailListName ? (
                     <>
                        This will permanently delete your{" "}
                        <span className="text-black">
                           &apos;{emailListName}&apos;{" "}
                        </span>
                        and remove all its data from our servers.
                     </>
                  ) : null}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction
                  className={cn(buttonVariants({ variant: "destructive" }))}
                  onClick={() =>
                     startTransition(() => deleteEmailList({ id: emailListId }))
                  }
               >
                  Countinue
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
export default DeleteEmailListButton
