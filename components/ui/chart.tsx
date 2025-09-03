"use client"

import * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps {
  config: ChartConfig
  children: React.ReactNode
  className?: string
}

export function ChartContainer({ config, children, className }: ChartContainerProps) {
  const { theme } = useTheme()

  // Set CSS variables for chart colors
  React.useEffect(() => {
    const root = document.documentElement
    Object.entries(config).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value.color)
    })
  }, [config, theme])

  return (
    <div className={className}>
      <style jsx global>{`
        :root {
          ${Object.entries(config)
            .map(([key, value]) => `--color-${key}: ${value.color};`)
            .join("\n")}
        }
      `}</style>
      <TooltipProvider>{children}</TooltipProvider>
    </div>
  )
}

interface ChartTooltipProps {
  className?: string
  children?: React.ReactNode
}

export function ChartTooltip({
  className,
  children,
  ...props
}: ChartTooltipProps & React.ComponentPropsWithoutRef<typeof Tooltip>) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger className={className}>{children}</TooltipTrigger>
    </Tooltip>
  )
}

interface ChartTooltipContentProps {
  className?: string
  payload?: Array<{ name: string; value: number; dataKey: string }>
  label?: string
  active?: boolean
  config?: ChartConfig
}

export function ChartTooltipContent({ className, payload, label, active, ...props }: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null

  return (
    <TooltipContent className={`${className} bg-popover text-popover-foreground`} {...props}>
      <div className="space-y-2">
        <p className="text-sm font-medium">{label}</p>
        <div className="space-y-1">
          {payload.map((item) => (
            <div key={item.dataKey} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: `var(--color-${item.dataKey})` }} />
              <p className="text-xs text-muted-foreground">{item.name}</p>
              <p className="text-xs font-medium">${Number(item.value).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </TooltipContent>
  )
}
