

import { Label, Pie, PieChart } from "recharts"
import {
  
  CardContent,
  CardFooter,
  
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"

type params={
  completed:number
  uncompleted:number
  total:number,
  completedC:number
}


const chartConfig = {
  visitors: {
    label: "Courses",
  },
} satisfies ChartConfig
export function PieChartCompletion({completed,uncompleted,total,completedC}:params) {
  

  const [chartData, setChartData] = useState([
    { name: "completed", visitors: Math.round(completed), fill: "blue" },
    { name: "uncompleted", visitors: Math.round(uncompleted), fill: "#63a9ff" },
  ])

   useEffect(() => {
    setChartData([
      { name: "completed", visitors: Math.round(completed), fill: "blue" },
      { name: "uncompleted", visitors: Math.round(uncompleted), fill: "#63a9ff" },
    ])
  }, [completed, uncompleted])
  console.log(completed,uncompleted)
  
 
  return (
    
      <div className="flex flex-col mb-10">
          <CardContent className="flex-1 pb-0">
      <ChartContainer
        config={chartConfig}
        className="mx-auto h-[250px] w-full"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="name"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {completed}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Completed
                      </tspan>
                    </text>
                  )
                }
              } } />
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent><CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          You’ve completed {completedC} of {total} courses 
        </div>
        
      </CardFooter>
      </div>
      
      
    
  )
}

export default PieChartCompletion

    