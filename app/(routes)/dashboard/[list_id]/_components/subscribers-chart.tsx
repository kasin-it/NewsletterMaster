"use client"

import { ResponsiveLine } from "@nivo/line"

import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"

export default function SubscribersChart() {
   return (
      <Card className="w-full max-w-3xl">
         <CardHeader>
            <CardTitle>Subscribers</CardTitle>
            <CardDescription>Number of subscribers over time.</CardDescription>
         </CardHeader>
         <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
               <div className="inline-flex items-center gap-2">
                  <CalendarCheckIcon className="h-4 w-4" />
                  <span className="font-medium">Time Interval</span>
               </div>
               <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                     Today
                  </Button>
                  <Button size="sm" variant="outline">
                     This Month
                  </Button>
                  <Button size="sm" variant="outline">
                     Last Month
                  </Button>
                  <Button size="sm" variant="outline">
                     All Time
                  </Button>
               </div>
            </div>
            <TimeseriesChart className="aspect-[2/1] h-[300px] w-full" />
         </CardContent>
      </Card>
   )
}

function CalendarCheckIcon(props) {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
         <line x1="16" x2="16" y1="2" y2="6" />
         <line x1="8" x2="8" y1="2" y2="6" />
         <line x1="3" x2="21" y1="10" y2="10" />
         <path d="m9 16 2 2 4-4" />
      </svg>
   )
}

function TimeseriesChart(props) {
   return (
      <div {...props}>
         <ResponsiveLine
            data={[
               {
                  id: "Desktop",
                  data: [
                     { x: "2018-01-01", y: 7 },
                     { x: "2018-01-02", y: 5 },
                     { x: "2018-01-03", y: 11 },
                     { x: "2018-01-04", y: 9 },
                     { x: "2018-01-05", y: 12 },
                     { x: "2018-01-06", y: 16 },
                     { x: "2018-01-07", y: 13 },
                  ],
               },
               {
                  id: "Mobile",
                  data: [
                     { x: "2018-01-01", y: 9 },
                     { x: "2018-01-02", y: 8 },
                     { x: "2018-01-03", y: 13 },
                     { x: "2018-01-04", y: 6 },
                     { x: "2018-01-05", y: 8 },
                     { x: "2018-01-06", y: 14 },
                     { x: "2018-01-07", y: 11 },
                  ],
               },
            ]}
            margin={{ top: 10, right: 20, bottom: 40, left: 40 }}
            xScale={{
               type: "time",
               format: "%Y-%m-%d",
               useUTC: false,
               precision: "day",
            }}
            xFormat="time:%Y-%m-%d"
            yScale={{
               type: "linear",
               min: 0,
               max: "auto",
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
               tickSize: 0,
               tickPadding: 16,
               format: "%d",
               tickValues: "every 1 day",
            }}
            axisLeft={{
               tickSize: 0,
               tickValues: 5,
               tickPadding: 16,
            }}
            colors={["#2563eb", "#e11d48"]}
            pointSize={6}
            useMesh={true}
            gridYValues={6}
            theme={{
               tooltip: {
                  chip: {
                     borderRadius: "9999px",
                  },
                  container: {
                     fontSize: "12px",
                     textTransform: "capitalize",
                     borderRadius: "6px",
                  },
               },
               grid: {
                  line: {
                     stroke: "#f3f4f6",
                  },
               },
            }}
            role="application"
         />
      </div>
   )
}
