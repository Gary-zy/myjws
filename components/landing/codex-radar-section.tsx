"use client"

import useSWR from "swr"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

type Card = {
  id: string
  label: string
  group: string
  average: number | null
  count: number
}

type ApiResponse = {
  ok: boolean
  updatedAt: string
  timezone: string
  cards: Card[]
  chart: Record<string, string | number | null>[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

// 为每个模型分配一个可区分的颜色（数据可视化需要多色区分）
const SERIES_COLORS = [
  "oklch(0.62 0.17 145)", // 绿
  "oklch(0.58 0.18 255)", // 蓝
  "oklch(0.70 0.16 60)", // 橙
  "oklch(0.55 0.20 300)", // 紫
  "oklch(0.60 0.22 25)", // 红
]

function scoreColor(v: number | null) {
  if (v == null) return "text-muted-foreground"
  if (v >= 7) return "text-[oklch(0.55_0.17_145)]"
  if (v >= 5) return "text-[oklch(0.62_0.16_60)]"
  return "text-[oklch(0.58_0.22_25)]"
}

export function CodexRadarSection() {
  const { data, isLoading } = useSWR<ApiResponse>("/api/codex-ratings", fetcher, {
    refreshInterval: 300_000, // 5 分钟刷新
    revalidateOnFocus: false,
  })

  const cards = data?.cards ?? []
  const chart = data?.chart ?? []

  const chartConfig: ChartConfig = cards.reduce((acc, c, i) => {
    acc[c.id] = { label: c.label, color: SERIES_COLORS[i % SERIES_COLORS.length] }
    return acc
  }, {} as ChartConfig)

  const updated = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null

  return (
    <section id="codex-radar" className="relative py-24 lg:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            实时监测
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Codex 降智雷达
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            汇总社区对 GPT 各档位 Codex 模型的真实体感评分，逐日跟踪是否「降智」。
            数据每 5 分钟自动更新，帮助你挑选当下状态最好的模型。
          </p>
        </div>

        {/* Score cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {isLoading && cards.length === 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-28 rounded-xl border border-border bg-card animate-pulse" />
              ))
            : cards.map((c, i) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-border bg-card p-5 flex flex-col gap-1"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: SERIES_COLORS[i % SERIES_COLORS.length] }}
                    />
                    <span className="text-sm font-medium text-foreground truncate">{c.label}</span>
                  </div>
                  <div className={`text-4xl font-display ${scoreColor(c.average)}`}>
                    {c.average == null ? "—" : c.average.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{c.count} 人评分</div>
                </div>
              ))}
        </div>

        {/* Trend chart */}
        <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">近 14 天体感分趋势</h3>
            {updated && (
              <span className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                更新于 {updated}
              </span>
            )}
          </div>

          {chart.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[360px] w-full">
              <LineChart data={chart} margin={{ left: 4, right: 16, top: 8, bottom: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  minTickGap={16}
                />
                <YAxis
                  domain={[0, 10]}
                  ticks={[2, 4, 6, 8, 10]}
                  tickLine={false}
                  axisLine={false}
                  width={28}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                {cards.map((c, i) => (
                  <Line
                    key={c.id}
                    type="monotone"
                    dataKey={c.id}
                    stroke={SERIES_COLORS[i % SERIES_COLORS.length]}
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    connectNulls
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ChartContainer>
          ) : (
            <div className="h-[360px] flex items-center justify-center text-muted-foreground">
              {isLoading ? "加载中…" : "暂无数据"}
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-6 border-t border-border">
            {cards.map((c, i) => (
              <span key={c.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: SERIES_COLORS[i % SERIES_COLORS.length] }}
                />
                {c.label}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4 font-mono">
          数据来源：社区公开体感评分（codex-reset-radar），仅供参考，不代表官方结论。
        </p>
      </div>
    </section>
  )
}
