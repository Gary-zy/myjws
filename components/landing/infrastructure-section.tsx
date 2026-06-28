"use client";

import { useEffect, useState, useRef } from "react";

const locations = [
  { city: "电信线路", region: "华东 · 默认接入", latency: "18ms" },
  { city: "联通线路", region: "华北 · 智能调度", latency: "22ms" },
  { city: "移动线路", region: "华南 · 智能调度", latency: "26ms" },
  { city: "香港节点", region: "亚太 · 海外加速", latency: "35ms" },
  { city: "新加坡节点", region: "亚太 · 海外加速", latency: "42ms" },
  { city: "美西节点", region: "北美 · 官方同源", latency: "60ms" },
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
              线路与节点
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              多线路
              <br />
              智能调度。
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              三大运营商线路全覆盖，海外节点官方同源直连。
              系统自动为每次请求选择最优路径，国内直连低延迟，无需自备梯子。
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">6+</div>
                <div className="text-sm text-muted-foreground">接入线路</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">接口可用率</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">&lt;1s</div>
                <div className="text-sm text-muted-foreground">首字延迟</div>
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
                <span className="text-sm font-mono text-muted-foreground">线路状态</span>
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
