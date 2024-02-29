"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import DeleteUserButton from "./delete-user-button"

export type userListItem = {
   id: string
   name: string
   email: string
   email_list_id: string
   created_at: string
}

export const columns: ColumnDef<userListItem>[] = [
   {
      accessorKey: "name",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Name
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
   },
   {
      accessorKey: "email",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Email
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
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
         const userListItem = row.original

         return formatDate(userListItem.created_at)
      },
   },
   {
      id: "actions",
      cell: ({ row }) => {
         const userListItem = row.original

         return (
            <DeleteUserButton
               userId={userListItem.id}
               userName={userListItem.name}
               listId={userListItem.email_list_id}
            />
         )
      },
   },
]
