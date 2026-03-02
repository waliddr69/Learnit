"use client"


import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type params = {
  columnData:number[]
}


const chartConfig = {
  users: {
    label: "Rate",
    color: "#006efd",
  },
} satisfies ChartConfig

export function ColumnChart({columnData}:params) {
  console.log(columnData)
  const chartData = [
  { rate: 1, users: columnData[0] },
  { rate: 2, users: columnData[1] },
  { rate: 3, users: columnData[2] },
  { rate: 4, users: columnData[3] },
  { rate: 5, users: columnData[4] },
  
]
  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex flex-col gap-1 pb-4 mb-4 border-b">
        <h3 className="text-lg font-semibold">Users Rating</h3>
        
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ChartContainer className="h-[250px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="rate"
              tickFormatter={value => `${value} ⭐`}
              tickLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
            <Bar dataKey="users" fill="var(--color-users)" radius={8} />
          </BarChart>
        </ChartContainer>
      </div>
      
    </div>
  )
}

export default ColumnChart
