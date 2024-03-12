import { clsx, type ClassValue } from "clsx"
import { differenceInCalendarMonths, previousDay } from "date-fns"
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

export function formatCreatedAtToFullTime(
   data: { created_at: string }[]
): { x: string; y: number }[] {
   const fullTimeMap = new Map<string, number>()
   let earliestDate = new Date(Date.now())
   let latestDate = new Date()

   // Create a map with counters for each year
   data.forEach((item) => {
      const entryDate = new Date(item.created_at)
      const entryYear = entryDate.getFullYear()

      if (!earliestDate || entryDate < earliestDate) {
         earliestDate = entryDate
      }

      if (!latestDate || entryDate > latestDate) {
         latestDate = entryDate
      }

      const entryKey = entryYear.toString()
      fullTimeMap.set(entryKey, (fullTimeMap.get(entryKey) || 0) + 1)
   })

   const output: { x: string; y: number }[] = []

   // Calculate running total of entries per year
   let currentTotal = 0
   for (
      let year = earliestDate.getFullYear();
      year <= latestDate.getFullYear();
      year++
   ) {
      const key = year.toString()
      const count = fullTimeMap.get(key) || 0
      output.push({ x: key, y: (currentTotal += count) })
   }

   return output
}

export function formatAnnuallyByMonth(data: { created_at: string }[]) {
   const yearlyData = new Map<string, number>()
   let earliestDate = new Date()
   let latestDate = new Date(Date.now())

   const localYear = new Date(Date.now()).getFullYear()

   data.forEach((entry) => {
      const entryDate = new Date(entry.created_at)
      const entryYear = entryDate.getFullYear()
      const entryMonth = (entryDate.getMonth() + 1).toString()

      if (entryYear == localYear) {
         if (!earliestDate || entryDate < earliestDate) {
            earliestDate = entryDate
         }

         if (!latestDate || entryDate > latestDate) {
            latestDate = entryDate
         }
         yearlyData.set(entryMonth, (yearlyData.get(entryMonth) || 0) + 1)
      }
   })

   const output: { x: string; y: number }[] = []

   let currentTotal = 0
   for (
      let month = earliestDate!.getMonth() + 1;
      month <= latestDate!.getMonth() + 1;
      month++
   ) {
      const key = month.toString()
      const count = yearlyData.get(key) || 0
      output.push({ x: key, y: (currentTotal += count) })
   }

   return output
}

export function formatCurrentMonthByDay(data: { created_at: string }[]) {
   const monthlyData = new Map<string, number>()
   let earliestDate = new Date()
   let latestDate = new Date(Date.now())

   const localDate = new Date(Date.now())
   const localYear = localDate.getFullYear()
   const localMonth = localDate.getMonth()

   data.forEach((entry) => {
      const entryDate = new Date(entry.created_at)
      const entryYear = entryDate.getFullYear()
      const entryMonth = entryDate.getMonth()
      const entryDay = entryDate.getUTCDate()
      const entryDayStr = entryDay.toString()

      if (entryYear == localYear && entryMonth == localMonth) {
         if (!earliestDate || entryDate < earliestDate) {
            earliestDate = entryDate
         }

         if (!latestDate || entryDate > latestDate) {
            latestDate = entryDate
         }
         monthlyData.set(entryDayStr, (monthlyData.get(entryDayStr) || 0) + 1)
      }
   })

   const output: { x: string; y: number }[] = []

   let currentTotal = 0
   for (
      let day = earliestDate!.getUTCDate();
      day <= latestDate!.getUTCDate();
      day++
   ) {
      const key = day.toString()
      const count = monthlyData.get(key) || 0
      output.push({ x: key, y: (currentTotal += count) })
   }

   return output
}

export function formatHourlyComparisonToToday(data: { created_at: string }[]) {
   const dailyData = new Map<string, number>()
   let earliestDate = new Date()
   let latestDate = new Date(Date.now())

   const localDate = new Date(Date.now())
   const localYear = localDate.getFullYear()
   const localMonth = localDate.getMonth()
   const localDay = localDate.getUTCDate()

   data.forEach((entry) => {
      const entryDate = new Date(entry.created_at)
      const entryYear = entryDate.getFullYear()
      const entryMonth = entryDate.getMonth()
      const entryDay = entryDate.getUTCDate()
      const entryHour = entryDate.getHours()
      const entryHourStr = entryHour.toString()
      earliestDate = entryDate
      latestDate = entryDate

      if (
         entryYear == localYear &&
         entryMonth == localMonth &&
         entryDay == localDay
      ) {
         if (!earliestDate || entryDate < earliestDate) {
            earliestDate = entryDate
         }

         if (!latestDate || entryDate > latestDate) {
            latestDate = entryDate
         }
         dailyData.set(entryHourStr, (dailyData.get(entryHourStr) || 0) + 1)
      }
   })

   const output: { x: string; y: number }[] = []

   let currentTotal = 0
   for (
      let day = earliestDate!.getUTCDate();
      day <= latestDate!.getUTCDate();
      day++
   ) {
      const key = day.toString()
      const count = dailyData.get(key) || 0
      output.push({ x: key, y: (currentTotal += count) })
   }

   return output
}
