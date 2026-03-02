"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
type params={
  data:{ day: string; enroll: number; }[],
  name:string
}


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ApexChart({data,name}:params) {
  const chartData = data.reduce<{ day: string; totalEnroll: number }[]>((acc, curr) => {
    const previousTotal = acc.length > 0 ? acc[acc.length - 1].totalEnroll : 0;
    acc.push({ day: curr.day, totalEnroll: previousTotal + curr.enroll });
    return acc;
  }, []);
  

  return (
    <div className="w-full bg-white rounded-3xl border border-[rgba(0, 0, 0, 0.2)] h-full flex flex-col p-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">{name} chart</h3>
        
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ChartContainer className="w-full h-[270px]" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            allowDecimals={false} 
          />
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="day"
              
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} />
            <Line
              activeDot={{
                r: 6,
              }}
              dataKey="totalEnroll"
              dot={{
                fill: "#2959d3",
              }}
              
              stroke="#2959d3"
              strokeWidth={2}
              type="natural"
            >
              <LabelList className="fill-foreground" fontSize={12} offset={12} position="top" />
            </Line>
          </LineChart>
        </ChartContainer>
      </div>
      
    </div>
  )
}

export default ApexChart
