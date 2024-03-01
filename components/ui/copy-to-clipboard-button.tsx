"use client"

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
      <Button size={"sm"} onClick={handleClick}>
         Copy
      </Button>
   )
}
export default CopyToClipboardButton
