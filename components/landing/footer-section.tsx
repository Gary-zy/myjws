"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  产品: [
    { name: "功能特性", href: "/#features" },
    { name: "接入流程", href: "/#how-it-works" },
    { name: "模型广场", href: "/models" },
    { name: "价格", href: "/models" },
  ],
  开发者: [
    { name: "接入文档", href: "/#developers" },
    { name: "API 参考", href: "#" },
    { name: "模型与价格", href: "/models" },
    { name: "服务状态", href: "#" },
  ],
  帮助: [
    { name: "充值说明", href: "/models" },
    { name: "常见问题", href: "#" },
    { name: "联系客服", href: "#", badge: "在线" },
    { name: "加入交流群", href: "#" },
  ],
  条款: [
    { name: "隐私政策", href: "#" },
    { name: "服务条款", href: "#" },
    { name: "安全与隐私", href: "#security" },
  ],
};

const socialLinks = [
  { name: "微信", href: "#", qr: "/wechat-qr.png" },
  { name: "Telegram", href: "#" },
  { name: "邮箱", href: "#" },
];

export function FooterSection() {
  const [showQr, setShowQr] = useState(false);

  return (
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <img src="/myjarvis-icon.png" alt="MY JARVIS" className="h-9 w-9 dark:invert" />
                <span className="text-2xl font-display">MY JARVIS</span>
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                专注 GPT 与 Claude Code 的 API 中转站。官方同源、稳定直连、按量计费。
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) =>
                  "qr" in link && link.qr ? (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setShowQr(true)}
                      onMouseLeave={() => setShowQr(false)}
                    >
                      <button
                        type="button"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3" />
                      </button>

                      {/* Hover QR popover */}
                      <div
                        className={`absolute bottom-full left-0 mb-3 w-56 origin-bottom-left transition-all duration-200 z-20 ${
                          showQr
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 translate-y-1 pointer-events-none"
                        }`}
                      >
                        <div className="rounded-2xl border border-foreground/10 bg-background p-3 shadow-xl">
                          <img
                            src={link.qr || "/placeholder.svg"}
                            alt="微信二维码"
                            className="w-full rounded-lg"
                          />
                          <p className="mt-2 text-center text-xs text-muted-foreground">
                            扫码添加，咨询与充值
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 MY JARVIS. 保留所有权利。
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
