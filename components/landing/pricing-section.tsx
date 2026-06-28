"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "体验",
    description: "适合个人尝鲜与小项目",
    price: { monthly: 0, annual: 0 },
    features: [
      "注册即送体验额度",
      "GPT 与 Claude 全系可用",
      "按量计费 · 充值不过期",
      "兼容 OpenAI 接口",
      "社区交流支持",
    ],
    cta: "免费开始",
    popular: false,
  },
  {
    name: "标准",
    description: "适合个人开发者与小团队",
    price: { monthly: 50, annual: 42 },
    features: [
      "全系模型不限速",
      "多线路智能调度",
      "支持流式输出与高并发",
      "多 API Key 管理",
      "实时账单与用量明细",
      "优先工单支持",
      "充值赠送额度",
    ],
    cta: "立即充值",
    popular: true,
  },
  {
    name: "企业",
    description: "适合高并发与商用场景",
    price: { monthly: null, annual: null },
    features: [
      "包含标准版全部功能",
      "更高并发与专属限额",
      "专属客服与技术对接",
      "独立子账号与分组",
      "可签订合同与开票",
      "定制充值折扣",
      "用量报表导出",
      "SLA 可用性保障",
    ],
    cta: "联系商务",
    popular: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">
            价格
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            按量计费
            <br />
            <span className="text-stroke">透明无套路</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            充值不过期，用多少付多少。无隐藏费用，按官方倍率清晰计价。
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className={`text-sm transition-colors ${
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            按月
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 bg-foreground/10 rounded-full p-1 transition-colors hover:bg-foreground/20"
          >
            <div
              className={`w-5 h-5 bg-foreground rounded-full transition-transform duration-300 ${
                isAnnual ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-sm transition-colors ${
              isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            按年
          </span>
          {isAnnual && (
            <span className="ml-2 px-2 py-1 bg-foreground text-primary-foreground text-xs font-mono">
              省 17%
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative p-8 lg:p-12 bg-background ${
                plan.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
                  最受欢迎
                </span>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl text-foreground mt-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-foreground/10">
                {plan.price.monthly !== null ? (
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl lg:text-6xl text-foreground">
                      ¥{isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/月起</span>
                  </div>
                ) : (
                  <span className="font-display text-4xl text-foreground">定制</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                  plan.popular
                    ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                    : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          所有套餐均支持全系模型、按量计费与全程 HTTPS 加密。{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground transition-colors">
            查看完整计费说明
          </a>
        </p>
      </div>
    </section>
  );
}
