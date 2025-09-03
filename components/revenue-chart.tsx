"use client"

import { useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Bar, BarChart, Tooltip } from "recharts"
import { ArrowDownIcon, ArrowUpIcon, CalendarIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for the revenue chart
const revenueData = [
  { month: "Jan", revenue: 4500, expenses: 3200, profit: 1300 },
  { month: "Feb", revenue: 5200, expenses: 3800, profit: 1400 },
  { month: "Mar", revenue: 5800, expenses: 4100, profit: 1700 },
  { month: "Apr", revenue: 6300, expenses: 4300, profit: 2000 },
  { month: "May", revenue: 7100, expenses: 4700, profit: 2400 },
  { month: "Jun", revenue: 8200, expenses: 5200, profit: 3000 },
  { month: "Jul", revenue: 9100, expenses: 5600, profit: 3500 },
  { month: "Aug", revenue: 9800, expenses: 5900, profit: 3900 },
  { month: "Sep", revenue: 10200, expenses: 6100, profit: 4100 },
  { month: "Oct", revenue: 11300, expenses: 6500, profit: 4800 },
  { month: "Nov", revenue: 12500, expenses: 7200, profit: 5300 },
  { month: "Dec", revenue: 14000, expenses: 8100, profit: 5900 },
]

// Mock quarterly data
const quarterlyData = [
  { quarter: "Q1", revenue: 15500, expenses: 11100, profit: 4400 },
  { quarter: "Q2", revenue: 21600, expenses: 14200, profit: 7400 },
  { quarter: "Q3", revenue: 29100, expenses: 17600, profit: 11500 },
  { quarter: "Q4", revenue: 37800, expenses: 21800, profit: 16000 },
]

// Mock yearly data
const yearlyData = [
  { year: "2020", revenue: 75000, expenses: 52000, profit: 23000 },
  { year: "2021", revenue: 88000, expenses: 59000, profit: 29000 },
  { year: "2022", revenue: 104000, expenses: 68000, profit: 36000 },
  { year: "2023", revenue: 124000, expenses: 78000, profit: 46000 },
]

type ChartPeriod = "monthly" | "quarterly" | "yearly"

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-md">
        <p className="text-sm font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-xs">
            <div 
              className="h-2 w-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  const [period, setPeriod] = useState<ChartPeriod>("monthly")
  const [chartType, setChartType] = useState<"line" | "bar">("line")

  // Select the appropriate data based on the selected period
  const data = period === "monthly" ? revenueData : period === "quarterly" ? quarterlyData : yearlyData
  const labelKey = period === "monthly" ? "month" : period === "quarterly" ? "quarter" : "year"

  // Calculate percentage change
  const currentRevenue = data[data.length - 1].revenue
  const previousRevenue = data[data.length - 2].revenue
  const percentageChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100
  const isIncrease = percentageChange > 0

  // Chart colors
  const colors = {
    revenue: "hsl(var(--primary))",
    expenses: "hsl(var(--muted))",
    profit: "hsl(var(--success))",
  }

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-4 px-4">
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={(value) => setPeriod(value as ChartPeriod)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={chartType} onValueChange={(value) => setChartType(value as "line" | "bar")}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div style={{ width: '100%', height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey={labelKey}
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke={colors.revenue} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="expenses" stroke={colors.expenses} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="profit" stroke={colors.profit} strokeWidth={2} dot={false} />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey={labelKey} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="revenue" fill={colors.revenue} radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill={colors.expenses} radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill={colors.profit} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
