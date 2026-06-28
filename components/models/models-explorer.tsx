"use client";

import { useState, useMemo } from "react";
import { Search, Copy, Check } from "lucide-react";
import { models, type ModelInfo } from "@/lib/models";
import { OpenAIIcon, ClaudeIcon } from "@/components/brand-icons";

const filters = ["全部", "OpenAI", "Claude Code"] as const;
type Filter = (typeof filters)[number];

// 条状指示器：10 段，按百分比填充
function StatusBars({ percent }: { percent: number }) {
  const filled = Math.floor(percent / 10);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className={`h-3.5 w-1.5 rounded-full ${
            i < filled ? "bg-emerald-500" : "bg-emerald-500/20"
          }`}
        />
      ))}
    </div>
  );
}

function ModelCard({
  m,
  copied,
  onCopy,
}: {
  m: ModelInfo;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border border-foreground/10 bg-background overflow-hidden transition-shadow hover:shadow-lg hover:shadow-foreground/5 ${
        m.comingSoon ? "opacity-60" : ""
      }`}
    >
      {/* 顶部绿色渐变描边 */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400" />

      <div className="flex flex-col gap-5 p-6">
        {/* 标题 */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {m.provider === "OpenAI" ? (
            <OpenAIIcon className="w-5 h-5 shrink-0 text-foreground" />
          ) : (
            <ClaudeIcon className="w-5 h-5 shrink-0 text-[#D97757]" />
          )}
          <h3 className="text-lg font-bold tracking-tight">{m.name}</h3>
          {m.popular && (
            <span className="px-2 py-0.5 text-[10px] font-mono bg-foreground text-background rounded">
              热门
            </span>
          )}
          {m.comingSoon && (
            <span className="px-2 py-0.5 text-[10px] font-mono border border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/5 rounded">
              暂未开放
            </span>
          )}
        </div>

        {/* 状态指示 */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">
              在线率 {m.uptime}%
            </span>
            <StatusBars percent={m.uptime} />
          </div>
          <div className="flex flex-col gap-2 items-end">
            <span className="text-xs text-muted-foreground">
              可用率 {m.availability}%
            </span>
            <StatusBars percent={m.availability} />
          </div>
        </div>

        {/* 价格盒 */}
        <div className="rounded-xl bg-foreground/[0.03] border border-foreground/5 p-4 flex flex-col gap-3">
          {[
            { label: "输入价格", value: m.inputRate },
            { label: "输出价格", value: m.outputRate },
            { label: "缓存价格", value: m.cacheRate },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className="text-sm">
                <span className="font-semibold">
                  {m.comingSoon ? "—" : row.value}
                </span>
                {!m.comingSoon && (
                  <span className="text-xs text-muted-foreground ml-1">
                    / 1M tokens
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* 复制按钮 */}
        <button
          type="button"
          onClick={onCopy}
          disabled={m.comingSoon}
          aria-label={`复制模型 ID ${m.name}`}
          className={`flex items-center justify-center gap-2 h-11 rounded-xl border text-sm font-medium transition-colors disabled:cursor-not-allowed ${
            copied
              ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5"
              : "border-foreground/15 hover:border-foreground/40 hover:bg-foreground/[0.03]"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              已复制
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              复制模型 ID
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function ModelsExplorer() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("全部");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1500);
    } catch {
      // 剪贴板不可用时静默失败
    }
  };

  const filtered = useMemo(() => {
    return models.filter((m) => {
      const matchFilter = filter === "全部" || m.provider === filter;
      const matchQuery = m.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchFilter && matchQuery;
    });
  }, [query, filter]);

  const grouped = useMemo(() => {
    const groups: Record<string, ModelInfo[]> = {};
    for (const m of filtered) {
      (groups[m.provider] ??= []).push(m);
    }
    return groups;
  }, [filtered]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索模型名称，如 gpt-5.5 / claude-opus"
            className="w-full h-12 pl-11 pr-4 bg-foreground/[0.02] border border-foreground/10 rounded-full text-sm outline-none focus:border-foreground/30 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-5 h-12 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-foreground text-background"
                  : "border border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Note */}
      <p className="text-sm text-muted-foreground mb-8">
        价格单位为<span className="text-foreground font-medium">美元 / 1M tokens</span>，按官方公开价计费，输入 / 输出 / 缓存与官方完全一致，不加价、不降智。
      </p>

      {/* Groups */}
      {Object.keys(grouped).length === 0 && (
        <div className="py-20 text-center text-muted-foreground">没有匹配的模型</div>
      )}

      <div className="flex flex-col gap-12">
        {Object.entries(grouped).map(([provider, list]) => (
          <div key={provider}>
            <h2 className="flex items-center gap-2.5 text-sm font-mono tracking-widest text-muted-foreground uppercase mb-5">
              {provider === "OpenAI" ? (
                <OpenAIIcon className="w-5 h-5 text-foreground" />
              ) : (
                <ClaudeIcon className="w-5 h-5 text-[#D97757]" />
              )}
              <span>
                {provider} · {list.length} 个模型
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {list.map((m) => (
                <ModelCard
                  key={m.name}
                  m={m}
                  copied={copiedId === m.name}
                  onCopy={() => handleCopy(m.name)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
