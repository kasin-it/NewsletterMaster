"use client"

import { useMemo } from "react"
import { ResponsiveLine } from "@nivo/line"
import { CalendarCheckIcon } from "lucide-react"

import {
   formatAnnuallyByMonth,
   formatCreatedAtToFullTime,
   formatCurrentMonthByDay,
   formatHourlyComparisonToToday,
} from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SubscribersChartProps {
   data: { created_at: string }[]
}
interface TimeseriesChartProps {
   data: { x: string; y: number }[]
   className: string
}

export default function SubscribersChart({ data }: SubscribersChartProps) {
   const dataGroupedByFullTime = useMemo(
      () => formatCreatedAtToFullTime(data),
      [data]
   )
   const dataGroupedByToday = useMemo(
      () => formatHourlyComparisonToToday(data),
      [data]
   )
   const dataGroupedByYear = useMemo(() => formatAnnuallyByMonth(data), [data])
   const dataGroupedByMonth = useMemo(
      () => formatCurrentMonthByDay(data),
      [data]
   )

   return (
      <Card className="w-full max-w-3xl">
         <CardHeader>
            <CardTitle>Subscribers</CardTitle>
            <CardDescription>Number of subscribers over time.</CardDescription>
         </CardHeader>
         <CardContent className="flex flex-col gap-4">
            <Tabs defaultValue="today" className="w-[400px]">
               <TabsList className="bg-white">
                  <TabsTrigger value="all_time">All Time</TabsTrigger>
                  <TabsTrigger value="year">This Year</TabsTrigger>
                  <TabsTrigger value="month">This Month</TabsTrigger>
                  <TabsTrigger value="today">Today</TabsTrigger>
               </TabsList>
               <TabsContent value="all_time">
                  <TimeseriesChart
                     data={dataGroupedByFullTime}
                     className="aspect-[2/1] h-[300px] w-full"
                  />
               </TabsContent>
               <TabsContent value="year">
                  <TimeseriesChart
                     data={dataGroupedByYear}
                     className="aspect-[2/1] h-[300px] w-full"
                  />
               </TabsContent>
               <TabsContent value="month">
                  <TimeseriesChart
                     data={dataGroupedByMonth}
                     className="aspect-[2/1] h-[300px] w-full"
                  />
               </TabsContent>
               <TabsContent value="today">
                  <TimeseriesChart
                     data={dataGroupedByToday}
                     className="aspect-[2/1] h-[300px] w-full"
                  />
               </TabsContent>
            </Tabs>
         </CardContent>
      </Card>
   )
}

function TimeseriesChart({ data, className }: TimeseriesChartProps) {
   return (
      <div className={className}>
         <ResponsiveLine
            data={[
               {
                  id: "Subscribers",
                  data: data,
               },
            ]}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
               type: "linear",
               min: "auto",
               max: "auto",
               stacked: true,
               reverse: false,
            }}
            yFormat="1"
            curve="natural"
            axisTop={null}
            axisRight={null}
            axisBottom={{
               tickSize: 5,
               tickPadding: 5,
               tickRotation: 0,
               legend: "Date",
               legendOffset: 36,
               legendPosition: "middle",
               truncateTickAt: 0,
            }}
            axisLeft={{
               tickSize: 5,
               tickPadding: 5,
               tickRotation: 0,
               legend: "count",
               legendOffset: -40,
               legendPosition: "middle",
               truncateTickAt: 0,
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
               {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                     {
                        on: "hover",
                        style: {
                           itemBackground: "rgba(0, 0, 0, .03)",
                           itemOpacity: 1,
                        },
                     },
                  ],
               },
            ]}
         />
      </div>
   )
}
