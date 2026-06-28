"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { models, type ModelInfo } from "@/lib/models";

const filters = ["全部", "OpenAI", "Claude Code"] as const;
type Filter = (typeof filters)[number];

export function ModelsExplorer() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("全部");

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
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
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

      {/* Table header note */}
      <p className="text-sm text-muted-foreground mb-4">
        价格单位为<span className="text-foreground font-medium">美元 / 1M tokens</span>，按官方公开价计费，输入 / 输出 / 缓存与官方完全一致，不加价、不降智。
      </p>

      {/* Groups */}
      {Object.keys(grouped).length === 0 && (
        <div className="py-20 text-center text-muted-foreground">没有匹配的模型</div>
      )}

      <div className="flex flex-col gap-12">
        {Object.entries(grouped).map(([provider, list]) => (
          <div key={provider}>
            <h2 className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-4">
              {provider} · {list.length} 个模型
            </h2>
            <div className="border border-foreground/10 rounded-xl overflow-hidden">
              {/* Column headers */}
              <div className="hidden md:grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-4 px-6 py-3 bg-foreground/[0.02] border-b border-foreground/10 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <span>模型</span>
                <span className="text-right">输入 / 1M</span>
                <span className="text-right">输出 / 1M</span>
                <span className="text-right">缓存 / 1M</span>
              </div>
              {list.map((m, i) => (
                <div
                  key={m.name}
                  className={`grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-x-4 gap-y-2 px-6 py-4 items-center hover:bg-foreground/[0.02] transition-colors ${
                    i !== list.length - 1 ? "border-b border-foreground/10" : ""
                  }`}
                >
                  {/* Name + category */}
                  <div className="col-span-2 md:col-span-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-medium truncate">{m.name}</span>
                      {m.popular && (
                        <span className="px-2 py-0.5 text-[10px] font-mono bg-foreground text-background rounded">
                          热门
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{m.category}</div>
                  </div>

                  {/* Rates */}
                  <div className="md:text-right">
                    <span className="md:hidden text-xs text-muted-foreground mr-2">输入</span>
                    <span className="font-mono text-sm">{m.inputRate}</span>
                  </div>
                  <div className="md:text-right">
                    <span className="md:hidden text-xs text-muted-foreground mr-2">输出</span>
                    <span className="font-mono text-sm">{m.outputRate}</span>
                  </div>
                  <div className="md:text-right">
                    <span className="md:hidden text-xs text-muted-foreground mr-2">缓存</span>
                    <span className="font-mono text-sm">{m.cacheRate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
