import { clsx, type ClassValue } from "clsx"
import { differenceInCalendarMonths } from "date-fns"
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

export function formatCreatedAtToFullTime(data: { created_at: string }[]) {
   const fullTimeMap = new Map<string, number>()

   data.forEach((item) => {
      const entryDate = new Date(item.created_at)
      const entryYear = entryDate.getFullYear().toString()
      fullTimeMap.set(entryYear, (fullTimeMap.get(entryYear) || 0) + 1)
   })

   // Convert the Map to an array and sort it by the parsed date in descending order
   const output = Array.from(fullTimeMap, ([key, value]) => ({
      x: key,
      y: value,
   }))
      .sort((a, b) => {
         const dateA = new Date(a.x)
         const dateB = new Date(b.x)
         return dateB > dateA ? -1 : dateB < dateA ? 1 : 0
      })
      .map(({ x, y }) => {
         const date = new Date(x)
         return {
            x: date.getFullYear().toString(),
            y,
         }
      })

   return output
}

export function formatHourlyComparisonToToday(data: { created_at: string }[]) {
   const hourlyData: { [key: number]: number } = {}
   const currentDate = new Date(Date.now())
   const currentMonth = currentDate.getMonth()
   const currentYear = currentDate.getFullYear()
   const currentDay = currentDate.getUTCDate()

   data.forEach((entry) => {
      const entryDate = new Date(entry.created_at)
      if (
         entryDate.getMonth() == currentMonth &&
         entryDate.getFullYear() == currentYear &&
         entryDate.getUTCDate() == currentDay
      ) {
         const entryHour = entryDate.getUTCHours() + 1
         hourlyData[entryHour] = (hourlyData[entryHour] || 0) + 1
      }
   })

   const result = Object.entries(hourlyData).map(([hourStr, y]) => ({
      x: hourStr,
      y: y,
   }))

   return result
}

export function formatAnnuallyByMonth(data: { created_at: string }[]) {
   const yearlyData: { [key: number]: number } = {}
   const localYear = new Date(Date.now()).getFullYear()

   data.forEach((entry) => {
      const entryDate = new Date(entry.created_at)
      if (entryDate.getFullYear() == localYear) {
         yearlyData[entryDate.getMonth() + 1] =
            (yearlyData[entryDate.getMonth()] || 0) + 1
      }
   })

   const result = Object.keys(yearlyData)
      .filter((monthKey) => !Number.isNaN(parseInt(monthKey)))
      .map((monthKey) => ({
         x: monthKey,
         y: yearlyData[parseInt(monthKey)],
      }))

   return result
}

export function formatCurrentMonthByDay(data: { created_at: string }[]) {
   const currentDate = new Date(Date.now())
   const currentMonth = currentDate.getMonth()
   const currentYear = currentDate.getFullYear()

   const dailyData: { [key: number]: number } = {}

   data.forEach((entry) => {
      const entryDate = new Date(entry.created_at)
      if (
         entryDate.getFullYear() == currentYear &&
         entryDate.getMonth() == currentMonth
      ) {
         const day = entryDate.getUTCDate()
         dailyData[day] = (dailyData[day] || 0) + 1
      }
   })

   const result = Object.keys(dailyData)
      .filter((dayKey) => !Number.isNaN(parseInt(dayKey)))
      .map((dayKey) => ({
         x: dayKey,
         y: dailyData[parseInt(dayKey)],
      }))

   return result
}
