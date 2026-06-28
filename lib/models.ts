export type ModelInfo = {
  name: string;
  provider: "OpenAI" | "Claude Code";
  category: string;
  // 价格：美元 / 1M tokens，按官方公开价填写，与官方一致
  inputRate: string;
  outputRate: string;
  cacheRate: string;
  popular?: boolean;
};

// 全站统一的模型清单：仅 GPT 与 Claude Code 两家官方同源模型
export const models: ModelInfo[] = [
  // OpenAI GPT
  {
    name: "gpt-5.5",
    provider: "OpenAI",
    category: "旗舰 · 通用",
    inputRate: "$1.25",
    outputRate: "$10",
    cacheRate: "$0.125",
    popular: true,
  },
  {
    name: "gpt-5.4",
    provider: "OpenAI",
    category: "通用 · 高性能",
    inputRate: "$1.25",
    outputRate: "$10",
    cacheRate: "$0.125",
  },
  {
    name: "gpt-5.4-mini",
    provider: "OpenAI",
    category: "高性价比 · 轻量",
    inputRate: "$0.25",
    outputRate: "$2",
    cacheRate: "$0.025",
  },
  // Claude Code
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
    name: "claude-opus-4-7",
    provider: "Claude Code",
    category: "旗舰 · 编程",
    inputRate: "$5",
    outputRate: "$25",
    cacheRate: "$0.5",
  },
  {
    name: "claude-opus-4-6",
    provider: "Claude Code",
    category: "旗舰 · 编程",
    inputRate: "$5",
    outputRate: "$25",
    cacheRate: "$0.5",
  },
  {
    name: "claude-opus-4-5-20251101",
    provider: "Claude Code",
    category: "旗舰 · 编程",
    inputRate: "$5",
    outputRate: "$25",
    cacheRate: "$0.5",
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
    name: "claude-sonnet-4-5-20250929",
    provider: "Claude Code",
    category: "通用 · 平衡",
    inputRate: "$3",
    outputRate: "$15",
    cacheRate: "$0.3",
  },
  {
    name: "claude-haiku-4-5-20251001",
    provider: "Claude Code",
    category: "高性价比 · 轻量",
    inputRate: "$1",
    outputRate: "$5",
    cacheRate: "$0.1",
  },
  {
    name: "claude-fable-5",
    provider: "Claude Code",
    category: "特色 · 写作",
    inputRate: "$2",
    outputRate: "$10",
    cacheRate: "$0.2",
  },
];
