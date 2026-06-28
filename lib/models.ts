export type ModelInfo = {
  name: string;
  provider: "OpenAI" | "Claude Code";
  category: string;
  // 计费倍率：相对官方价的倍数，全站统一 1.0×（即与官方完全一致）
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
    inputRate: "1.0×",
    outputRate: "1.0×",
    cacheRate: "1.0×",
    popular: true,
  },
  {
    name: "gpt-5.4",
    provider: "OpenAI",
    category: "通用 · 高性能",
    inputRate: "1.0×",
    outputRate: "1.0×",
    cacheRate: "1.0×",
  },
  {
    name: "gpt-5.4-mini",
    provider: "OpenAI",
    category: "高性价比 · 轻量",
    inputRate: "1.0×",
    outputRate: "1.0×",
    cacheRate: "1.0×",
  },
  // Claude Code
  {
    name: "claude-opus-4-8",
    provider: "Claude Code",
    category: "旗舰 · 编程",
    inputRate: "1.0×",
    outputRate: "1.0×",
    cacheRate: "1.0×",
    popular: true,
  },
  {
    name: "claude-opus-4-7",
    provider: "Claude Code",
    category: "旗舰 · 编程",
    inputRate: "1.0×",
    outputRate: "1.0×",
    cacheRate: "1.0×",
  },
  {
    name: "claude-opus-4-6",
    provider: "Claude Code",
    category: "旗舰 · 编程",
    inputRate: "1.0×",
    outputRate: "1.0×",
    cacheRate: "1.0×",
  },
  {
    name: "claude-opus-4-5-20251101",
    provider: "Claude Code",
    category: "旗舰 · 编程",
    inputRate: "1.0×",
    outputRate: "1.0×",
    cacheRate: "1.0×",
  },
  {
    name: "claude-sonnet-4-6",
    provider: "Claude Code",
    category: "通用 · 平衡",
    inputRate: "1.0×",
    outputRate: "1.0×",
    cacheRate: "1.0×",
  },
  {
    name: "claude-sonnet-4-5-20250929",
    provider: "Claude Code",
    category: "通用 · 平衡",
    inputRate: "1.0×",
    outputRate: "1.0×",
    cacheRate: "1.0×",
  },
  {
    name: "claude-haiku-4-5-20251001",
    provider: "Claude Code",
    category: "高性价比 · 轻量",
    inputRate: "1.0×",
    outputRate: "1.0×",
    cacheRate: "1.0×",
  },
  {
    name: "claude-fable-5",
    provider: "Claude Code",
    category: "特色 · 写作",
    inputRate: "1.0×",
    outputRate: "1.0×",
    cacheRate: "1.0×",
  },
];
