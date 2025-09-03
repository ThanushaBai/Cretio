"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList, Cell } from "recharts"

interface FunnelChartProps {
  title: string
  description?: string
  data: any[]
  dataKey: string
  nameKey: string
  colors?: string[]
  showPercentage?: boolean
  height?: number
  periodOptions?: string[]
}

export function FunnelChartComponent({
  title,
  description,
  data,
  dataKey,
  nameKey,
  colors = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"],
  showPercentage = true,
  height = 400,
  periodOptions = ["Last 7 days", "Last 30 days", "Last 90 days", "Last year"],
}: FunnelChartProps) {
  const [period, setPeriod] = useState(periodOptions[1])

  // Calculate percentages if needed
  const dataWithPercentages = data.map((item, index) => {
    if (!showPercentage || index === 0) return item

    const prevValue = data[0][dataKey]
    const percentage = prevValue ? Math.round((item[dataKey] / prevValue) * 100) : 0

    return {
      ...item,
      percentage: `${percentage}%`,
    }
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            {periodOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height={height}>
            <FunnelChart>
              <Tooltip
                formatter={(value, name) => [`${value.toLocaleString()}`, name]}
                labelFormatter={(name) => `Stage: ${name}`}
              />
              <Funnel dataKey={dataKey} nameKey={nameKey} data={dataWithPercentages} isAnimationActive>
                <LabelList position="right" fill="#888" stroke="none" dataKey={showPercentage && "percentage"} />
                {dataWithPercentages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

