export type ModelInfo = {
  name: string;
  provider: "OpenAI" | "Claude Code";
  category: string;
  // 价格：美元 / 1M tokens，与 OpenAI / Anthropic 官方公开价一致
  inputRate: string;
  outputRate: string;
  cacheRate: string;
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
    inputRate: "$5",
    outputRate: "$30",
    cacheRate: "$0.5",
    popular: true,
  },
  {
    name: "gpt-5.5-pro",
    provider: "OpenAI",
    category: "旗舰 · 深度推理",
    inputRate: "$30",
    outputRate: "$180",
    cacheRate: "—",
  },
  {
    name: "gpt-5-mini",
    provider: "OpenAI",
    category: "高性价比 · 轻量",
    inputRate: "$0.25",
    outputRate: "$2",
    cacheRate: "$0.025",
  },
  {
    name: "gpt-4.1",
    provider: "OpenAI",
    category: "通用 · 高性能",
    inputRate: "$2",
    outputRate: "$8",
    cacheRate: "$0.5",
  },
  {
    name: "gpt-4.1-mini",
    provider: "OpenAI",
    category: "高性价比 · 轻量",
    inputRate: "$0.4",
    outputRate: "$1.6",
    cacheRate: "$0.1",
  },
  // Claude Code —— 官方真实模型与价格（美元 / 1M tokens）
  {
    name: "claude-opus-4-8",
    provider: "Claude Code",
    category: "旗舰 · 编程",
    inputRate: "$5",
    outputRate: "$25",
    cacheRate: "$0.5",
    popular: true,
  },
  {
    name: "claude-sonnet-4-6",
    provider: "Claude Code",
    category: "通用 · 平衡",
    inputRate: "$3",
    outputRate: "$15",
    cacheRate: "$0.3",
  },
  {
    name: "claude-haiku-4-5",
    provider: "Claude Code",
    category: "高性价比 · 轻量",
    inputRate: "$1",
    outputRate: "$5",
    cacheRate: "$0.1",
  },
];
