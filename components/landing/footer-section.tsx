"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="max-w-md">
            {/* Brand */}
            <a href="#" className="inline-flex items-center gap-2.5 mb-6">
              <img src="/myjarvis-icon.png" alt="我的贾维斯" className="h-12 w-12 dark:invert" />
              <span className="text-2xl font-display">我的贾维斯</span>
            </a>

            <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
              专注 GPT 与 Claude Code 的 API 中转站。官方同源、稳定直连、按量计费。
            </p>

            {/* Social Links */}
            <div className="flex gap-6">
              <a
                href="https://qm.qq.com/q/jt5yll2TcY"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
              >
                QQ 交流群
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 我的贾维斯. 保留所有权利。
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              所有服务运行正常
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
