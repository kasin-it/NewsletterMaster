import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
   const new_date = Date.parse(date)
   const formatter = new Intl.DateTimeFormat("en", { dateStyle: "long" })
   return formatter.format(new_date)
}

export function copyToClipboard(value: string) {
   navigator.clipboard.writeText(value)
}
