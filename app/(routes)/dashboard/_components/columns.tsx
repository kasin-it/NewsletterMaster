"use client"

import Link from "next/link"
import { deleteEmailList } from "@/actions/delete-email-list"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, FolderOpen, Trash2 } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import DeleteEmailListButton from "./delete-email-list-button"

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
      header: "Open",
      cell: ({ row }) => {
         const emailListItem = row.original

         return (
            <Link
               href={`/dashboard/${emailListItem.id}`}
               className={cn(
                  buttonVariants({ variant: "default", size: "sm" })
               )}
            >
               <FolderOpen />
            </Link>
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
      id: "actions",
      cell: ({ row }) => {
         const emailListItem = row.original

         return (
            <DeleteEmailListButton
               emailListId={emailListItem.id}
               emailListName={emailListItem.list_name}
            />
         )
      },
   },
]
