import { NextResponse } from "next/server"

export const revalidate = 300 // 与上游 refresh_seconds 一致，缓存 5 分钟

const UPSTREAM = "https://codex-reset-radar.pages.dev/api/model-ratings?history=14"

type UpstreamModel = {
  id: string
  label: string
  group: string
  average: number | null
  count: number
}

type UpstreamDay = {
  day: string
  updated_at: string
  models: UpstreamModel[]
}

type Upstream = {
  ok: boolean
  day: string
  timezone: string
  updated_at: string
  models: UpstreamModel[]
  history: UpstreamDay[]
}

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: `upstream ${res.status}` }, { status: 502 })
    }

    const data = (await res.json()) as Upstream

    // 当前评分卡（取最新的 rolling_24h 数据）
    const cards = data.models.map((m) => ({
      id: m.id,
      label: m.label,
      group: m.group,
      average: m.average,
      count: m.count,
    }))

    // 把 history + 当前 拼成图表所需的逐日数据：[{ day, "gpt-5.5-high": 7.2, ... }]
    const series = [...data.history]
    const chart = series.map((d) => {
      const row: Record<string, string | number | null> = {
        day: d.day.slice(5), // 06-15
      }
      for (const m of d.models) {
        row[m.id] = m.average
      }
      return row
    })

    // 追加「当前」一列
    const current: Record<string, string | number | null> = { day: "当前" }
    for (const m of data.models) {
      current[m.id] = m.average
    }
    chart.push(current)

    return NextResponse.json({
      ok: true,
      updatedAt: data.updated_at,
      timezone: data.timezone,
      cards,
      chart,
    })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "unknown" },
      { status: 500 },
    )
  }
}
