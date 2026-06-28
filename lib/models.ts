export type ModelInfo = {
  name: string;
  provider: "OpenAI" | "Claude Code";
  category: string;
  // 价格：美元 / 1M tokens，与 OpenAI / Anthropic 官方公开价一致
  inputRate: string;
  outputRate: string;
  cacheRate: string;
  // 服务状态：在线率 / 可用率（百分比数值）
  uptime: number;
  availability: number;
  popular?: boolean;
  comingSoon?: boolean;
};

// 全站统一的模型清单：仅 GPT 与 Claude Code 两家官方同源模型，价格与官方一致
export const models: ModelInfo[] = [
  // OpenAI GPT —— 官方真实模型与价格（美元 / 1M tokens）
  {
    name: "gpt-5.5",
    provider: "OpenAI",
    category: "旗舰 · 通用",
    inputRate: "$5.00",
    outputRate: "$30.00",
    cacheRate: "$0.50",
    uptime: 99.99,
    availability: 99.95,
    popular: true,
  },
  {
    name: "gpt-5.4",
    provider: "OpenAI",
    category: "通用 · 高性能",
    inputRate: "$2.50",
    outputRate: "$15.00",
    cacheRate: "$0.25",
    uptime: 100,
    availability: 99.98,
  },
  {
    name: "gpt-5.4-mini",
    provider: "OpenAI",
    category: "高性价比 · 轻量",
    inputRate: "$0.75",
    outputRate: "$4.50",
    cacheRate: "$0.075",
    uptime: 100,
    availability: 99.99,
  },
  {
    name: "gpt-5.3-codex",
    provider: "OpenAI",
    category: "编程 · Codex",
    inputRate: "$1.75",
    outputRate: "$14.00",
    cacheRate: "$0.175",
    uptime: 99.9,
    availability: 99.85,
  },
  // Claude Code —— 官方真实模型与价格（美元 / 1M tokens）
  {
    name: "claude-opus-4-8",
    provider: "Claude Code",
    category: "旗舰 · 编程",
    inputRate: "$5.00",
    outputRate: "$25.00",
    cacheRate: "$0.50",
    uptime: 99.98,
    availability: 99.95,
    popular: true,
  },
  {
    name: "claude-sonnet-4-6",
    provider: "Claude Code",
    category: "通用 · 平衡",
    inputRate: "$3.00",
    outputRate: "$15.00",
    cacheRate: "$0.30",
    uptime: 100,
    availability: 99.97,
  },
  {
    name: "claude-haiku-4-5",
    provider: "Claude Code",
    category: "高性价比 · 轻量",
    inputRate: "$1.00",
    outputRate: "$5.00",
    cacheRate: "$0.10",
    uptime: 100,
    availability: 99.99,
  },
];
