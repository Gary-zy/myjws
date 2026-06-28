import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ModelsExplorer } from "@/components/models/models-explorer";
import { CodexRadarSection } from "@/components/landing/codex-radar-section";

export const metadata: Metadata = {
  title: "模型广场 - MY JARVIS",
  description:
    "MY JARVIS 模型广场，提供 OpenAI GPT 与 Claude Code 全系官方同源模型的输入、输出与缓存计费倍率。",
};

export default function ModelsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            模型广场
          </span>
          <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-6 text-balance">
            全部模型与价格
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            专注 OpenAI GPT 与 Claude Code 两家官方同源模型。
            下表为各模型的输入、输出与缓存计费倍率，按量计费、充值不过期。
          </p>
        </div>
      </section>

      <section className="relative pb-16">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <ModelsExplorer />
        </div>
      </section>

      <CodexRadarSection />

      <FooterSection />
    </main>
  );
}
