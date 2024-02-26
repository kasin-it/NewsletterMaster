"use client"

import Link from "next/link"
import { deleteEmailList } from "@/actions/delete-email-list"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Trash2 } from "lucide-react"
import { useFormState, useFormStatus } from "react-dom"

import { cn, formatDate } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { useOptimistic } from "react"

export type EmailListItem = {
   id: string
   list_name: string
   desc: string
   created_at: string
   updated_at: string
}

export const columns: ColumnDef<EmailListItem>[] = [
   {
      id: "navigate",
      cell: ({ row }) => {
         const emailListItem = row.original

         return (
            <Link
               href={`/dashboard/${emailListItem.id}`}
               className={cn(buttonVariants({ variant: "default" }))}
            >
               Go to Email List
            </Link>
            // <DropdownMenu>
            //    <DropdownMenuTrigger asChild>
            //       <Button variant="ghost" className="h-8 w-8 p-0">
            //          <span className="sr-only">Open menu</span>
            //          <MoreHorizontal className="h-4 w-4" />
            //       </Button>
            //    </DropdownMenuTrigger>
            //    <DropdownMenuContent align="end">
            //       <DropdownMenuLabel>Actions</DropdownMenuLabel>
            //       <DropdownMenuItem
            //          onClick={() =>
            //             navigator.clipboard.writeText(emailListItem.id)
            //          }
            //       >
            //          Copy payment ID
            //       </DropdownMenuItem>
            //       <DropdownMenuSeparator />
            //       <DropdownMenuItem>View customer</DropdownMenuItem>
            //       <DropdownMenuItem>View payment details</DropdownMenuItem>
            //    </DropdownMenuContent>
            // </DropdownMenu>
         )
      },
   },
   {
      accessorKey: "list_name",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               List Name
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
   },
   {
      accessorKey: "desc",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Description
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
   },
   {
      accessorKey: "updated_at",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Updated At
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => {
         const emailListItem = row.original

         return formatDate(emailListItem.updated_at)
      },
   },
   {
      accessorKey: "created_at",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Created At
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => {
         const emailListItem = row.original

         return formatDate(emailListItem.created_at)
      },
   },
   {
      id: "delete",
      cell: ({ row }) => {
         const emailListItem = row.original
     

         const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[]>(

         return (
            <form action={deleteEmailList}>
               <Button size={"icon"} variant={"destructive"}>
                  <Trash2 className="size-5" />
               </Button>
            </form>
         )
      },
      header: "Delete",
   },
]
