"use client"

import { ClipboardIcon } from "lucide-react"

import { copyToClipboard } from "@/lib/utils"

import { Button } from "./button"
import { useToast } from "./use-toast"

interface CopyToClipboardButtonProps {
   value: string
}

function CopyToClipboardButton({ value }: CopyToClipboardButtonProps) {
   const { toast } = useToast()

   const handleClick = () => {
      toast({
         title: "Copied to clipboard",
         variant: "default",
      })
      copyToClipboard(value)
   }

   return (
      <Button variant={"outline"} size={"icon"} onClick={handleClick}>
         <ClipboardIcon />
      </Button>
   )
}
export default CopyToClipboardButton
