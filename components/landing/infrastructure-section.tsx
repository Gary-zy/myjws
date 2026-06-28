"use client";

import { useEffect, useState, useRef } from "react";

const locations = [
  { city: "Cloudflare 边缘网络", region: "全球 CDN · 就近接入", latency: "在线" },
  { city: "Anti-DDoS 防护", region: "Cloudflare · 自动防护", latency: "已启用" },
  { city: "全程 TLS 加密", region: "Cloudflare · 强制 HTTPS", latency: "已启用" },
  { city: "官方同源回源", region: "GPT / Claude · 直连", latency: "在线" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % locations.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              线路与防护
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Cloudflare
              <br />
              全球加速。
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              全站接入 Cloudflare 边缘网络，就近接入、自动防护、全程加密。
              回源直连 GPT 与 Claude 官方，稳定可靠，无需自备梯子。
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">CF</div>
                <div className="text-sm text-muted-foreground">全球边缘网络</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">接口可用率</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">TLS</div>
                <div className="text-sm text-muted-foreground">全程加密</div>
              </div>
            </div>
          </div>

          {/* Right: Location list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Header */}
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">线路与防护状态</span>
                <span className="flex items-center gap-2 text-xs font-mono text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  全部正常
                </span>
              </div>

              {/* Locations */}
              <div>
                {locations.map((location, index) => (
                  <div
                    key={location.city}
                    className={`px-6 py-5 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeLocation === index ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span 
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeLocation === index ? "bg-foreground" : "bg-foreground/20"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{location.city}</div>
                        <div className="text-sm text-muted-foreground">{location.region}</div>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">{location.latency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
