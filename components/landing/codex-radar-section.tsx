"use client"

import { useState, useRef, useCallback } from "react"
import useSWR from "swr"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ReferenceArea } from "recharts"
import { toPng } from "html-to-image"
import { Copy, Check } from "lucide-react"
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

// 评分(0-10) → IQ(0-125)。通过数/12×150 与评分×12.5 同源，IQ 风格刻度
const SCORE_TO_IQ = 12.5

type Mode = "iq" | "score"

export function CodexRadarSection() {
  const { data, isLoading } = useSWR<ApiResponse>("/api/codex-ratings", fetcher, {
    refreshInterval: 300_000, // 5 分钟刷新
    revalidateOnFocus: false,
  })

  const [mode, setMode] = useState<Mode>("iq")
  const [hidden, setHidden] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  const cards = data?.cards ?? []
  const chart = data?.chart ?? []

  const toValue = useCallback(
    (v: number | null) => (v == null ? null : mode === "iq" ? Math.round(v * SCORE_TO_IQ * 10) / 10 : v),
    [mode],
  )

  const toggle = (id: string) => {
    setHidden((prev) => {
      const next = new Set(prev)
      // 至少保留一条线
      if (next.has(id)) {
        next.delete(id)
      } else if (cards.length - next.size > 1) {
        next.add(id)
      }
      return next
    })
  }

  const chartConfig: ChartConfig = cards.reduce((acc, c, i) => {
    acc[c.id] = { label: c.label, color: SERIES_COLORS[i % SERIES_COLORS.length] }
    return acc
  }, {} as ChartConfig)

  // 按当前模式换算图表数据
  const chartData = chart.map((row) => {
    const out: Record<string, string | number | null> = { day: row.day as string }
    for (const c of cards) {
      const raw = row[c.id]
      out[c.id] = typeof raw === "number" ? toValue(raw) : null
    }
    return out
  })

  const updated = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null

  const handleCopyImage = useCallback(async () => {
    if (!chartRef.current) return
    try {
      const dataUrl = await toPng(chartRef.current, {
        pixelRatio: 2,
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--card") || "#ffffff",
      })
      const blob = await (await fetch(dataUrl)).blob()
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // 剪贴板不可用时静默失败
    }
  }, [])

  return (
    <section id="codex-radar" className="relative py-24 lg:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              实时监测
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">Codex 降智雷达</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              汇总社区对 GPT 各档位 Codex 模型的真实体感评分，换算为 IQ 风格刻度，逐日跟踪是否「降智」。
            </p>
          </div>
        </div>

        {/* 说明 + 复制图片 */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="text-sm text-muted-foreground">
            每天更新两次：上午约 7:00-8:00，下午约 13:00-14:00。可点击下方卡片筛选要显示的模型。
          </div>
          <button
            type="button"
            onClick={handleCopyImage}
            className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border text-sm transition-all ${
              copied
                ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "已复制" : "复制图片"}
          </button>
        </div>

        {/* Score cards（可点击筛选） */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {isLoading && cards.length === 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-24 rounded-xl border border-border bg-card animate-pulse" />
              ))
            : cards.map((c, i) => {
                const color = SERIES_COLORS[i % SERIES_COLORS.length]
                const isHidden = hidden.has(c.id)
                const display = toValue(c.average)
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggle(c.id)}
                    aria-pressed={!isHidden}
                    className={`text-left rounded-xl border p-4 transition-all ${
                      isHidden ? "opacity-40 border-border bg-card" : "bg-card"
                    }`}
                    style={isHidden ? undefined : { borderColor: color, backgroundColor: `color-mix(in oklch, ${color} 6%, var(--card))` }}
                  >
                    <div className="text-xs font-medium text-muted-foreground truncate mb-1">{c.label}</div>
                    <div className="text-3xl font-display" style={{ color: isHidden ? undefined : color }}>
                      {display == null ? "—" : mode === "iq" ? display.toFixed(1) : display.toFixed(1)}
                    </div>
                  </button>
                )
              })}
        </div>

        {/* Trend chart */}
        <div ref={chartRef} className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {updated && (
                <span className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  更新于 {updated}
                </span>
              )}
            </div>
            {/* 曲线切换 */}
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              曲线
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as Mode)}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-foreground/40"
              >
                <option value="iq">IQ 曲线</option>
                <option value="score">评分曲线</option>
              </select>
            </label>
          </div>

          {chartData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-[360px] w-full">
              <LineChart data={chartData} margin={{ left: 4, right: 16, top: 8, bottom: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                {/* 常态区高亮：IQ 90-110 / 评分 7.2-8.8 */}
                <ReferenceArea
                  y1={mode === "iq" ? 90 : 7.2}
                  y2={mode === "iq" ? 110 : 8.8}
                  fill="oklch(0.58 0.18 255)"
                  fillOpacity={0.06}
                  ifOverflow="extendDomain"
                  label={{
                    value: mode === "iq" ? "90-110 常态区" : "7.2-8.8 常态区",
                    position: "insideTop",
                    fontSize: 12,
                    fill: "oklch(0.58 0.18 255)",
                  }}
                />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} minTickGap={16} />
                <YAxis
                  domain={mode === "iq" ? [50, 130] : [0, 10]}
                  ticks={mode === "iq" ? [60, 80, 100, 120] : [2, 4, 6, 8, 10]}
                  tickLine={false}
                  axisLine={false}
                  width={32}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                {cards.map((c, i) =>
                  hidden.has(c.id) ? null : (
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
                  ),
                )}
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
              <button
                key={c.id}
                type="button"
                onClick={() => toggle(c.id)}
                className={`flex items-center gap-2 text-sm transition-opacity ${
                  hidden.has(c.id) ? "opacity-40 text-muted-foreground" : "text-foreground"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: SERIES_COLORS[i % SERIES_COLORS.length] }}
                />
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4 font-mono">
          数据来源：社区公开体感评分（codex-reset-radar），评分 ×12.5 换算为 IQ 风格刻度，仅供参考，不代表官方结论。
        </p>
      </div>
    </section>
  )
}
