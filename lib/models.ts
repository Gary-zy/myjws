export type ModelInfo = {
  name: string;
  provider: "OpenAI" | "Claude Code";
  category: string;
  // 价格：人民币 / 1M tokens，按官方公开价折算（汇率约 7.2），与官方一致
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
    inputRate: "¥9.0",
    outputRate: "¥72",
    cacheRate: "¥0.9",
    popular: true,
  },
  {
    name: "gpt-5.4",
    provider: "OpenAI",
    category: "通用 · 高性能",
    inputRate: "¥9.0",
    outputRate: "¥72",
    cacheRate: "¥0.9",
  },
  {
    name: "gpt-5.4-mini",
    provider: "OpenAI",
    category: "高性价比 · 轻量",
    inputRate: "¥1.8",
    outputRate: "¥14.4",
    cacheRate: "¥0.18",
  },
  // Claude Code
  {
    name: "claude-opus-4-8",
    provider: "Claude Code",
    category: "旗舰 · 编程",
    inputRate: "¥108",
    outputRate: "¥540",
    cacheRate: "¥10.8",
    popular: true,
  },
  {
    name: "claude-opus-4-7",
    provider: "Claude Code",
    category: "旗舰 · 编程",
    inputRate: "¥108",
    outputRate: "¥540",
    cacheRate: "¥10.8",
  },
  {
    name: "claude-opus-4-6",
    provider: "Claude Code",
    category: "旗舰 · 编程",
    inputRate: "¥108",
    outputRate: "¥540",
    cacheRate: "¥10.8",
  },
  {
    name: "claude-opus-4-5-20251101",
    provider: "Claude Code",
    category: "旗舰 · 编程",
    inputRate: "¥108",
    outputRate: "¥540",
    cacheRate: "¥10.8",
  },
  {
    name: "claude-sonnet-4-6",
    provider: "Claude Code",
    category: "通用 · 平衡",
    inputRate: "¥21.6",
    outputRate: "¥108",
    cacheRate: "¥2.16",
  },
  {
    name: "claude-sonnet-4-5-20250929",
    provider: "Claude Code",
    category: "通用 · 平衡",
    inputRate: "¥21.6",
    outputRate: "¥108",
    cacheRate: "¥2.16",
  },
  {
    name: "claude-haiku-4-5-20251001",
    provider: "Claude Code",
    category: "高性价比 · 轻量",
    inputRate: "¥7.2",
    outputRate: "¥36",
    cacheRate: "¥0.72",
  },
  {
    name: "claude-fable-5",
    provider: "Claude Code",
    category: "特色 · 写作",
    inputRate: "¥14.4",
    outputRate: "¥72",
    cacheRate: "¥1.44",
  },
];
