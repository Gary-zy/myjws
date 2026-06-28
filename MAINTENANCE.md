# MY JARVIS 项目维护指南

> 这份文档说明项目的结构、改动方式和「别碰会出事」的地方。后续自己维护时，先读这一份再动手，能避免越改越乱。

---

## 1. 技术栈

| 项目 | 说明 |
| --- | --- |
| 框架 | Next.js 16（App Router） |
| 语言 | TypeScript + React 19 |
| 样式 | Tailwind CSS v4（**无 tailwind.config**，主题写在 `app/globals.css`） |
| UI 组件库 | shadcn/ui（在 `components/ui/`） |
| 图表 | Recharts（通过 shadcn 的 chart 封装） |
| 数据请求 | SWR（仅「降智雷达」用到） |
| 主题切换 | 自建 ThemeProvider（明/暗模式，写入 `<html class="dark">`） |

启动：`pnpm install` → `pnpm dev`，构建：`pnpm build`。

---

## 2. 目录结构与职责

```
app/
  layout.tsx          # 全局布局：字体、<html>、主题 Provider、SEO 元信息
  page.tsx            # 首页：按顺序拼装各个 landing 区块
  globals.css         # ★ 主题色 token + 全局动画（改配色只动这里）
  models/page.tsx     # 「模型广场」页面
  api/codex-ratings/route.ts   # 降智雷达的后端接口（返回评分 JSON）

components/
  landing/            # ★ 首页的各个区块（你日常改动最多的地方）
    navigation.tsx        # 顶部导航 + 移动端菜单
    hero-section.tsx      # 首屏大标题、轮播词、统计数字
    features-section.tsx  # 功能特性
    how-it-works-section.tsx
    metrics-section.tsx
    infrastructure-section.tsx
    integrations-section.tsx
    security-section.tsx
    codex-radar-section.tsx  # 降智雷达（图表，用 SWR 拉 API）
    cta-section.tsx       # 底部「现在就开始」+ 联系客服按钮
    footer-section.tsx    # 页脚（QQ 链接在这里）
    animated-*.tsx        # 三个纯装饰动画（球体/四面体/波浪）
  models/
    models-explorer.tsx   # ★ 模型广场表格（搜索/筛选/价格/复制ID）
  brand-icons.tsx     # OpenAI / Claude 品牌图标（内联 SVG）
  theme-provider.tsx  # 主题状态
  theme-toggle.tsx    # 明暗切换按钮
  ui/                 # ★★ shadcn 自动生成的基础组件（一般别手改）

lib/
  models.ts           # ★ 模型清单 + 价格数据（改价格只动这里）
  utils.ts            # cn() 等工具函数
```

★ = 常改；★★ = 谨慎。

---

## 3. 页面是怎么拼出来的

- **首页 `app/page.tsx`**：就是把 `components/landing/` 里的区块**按顺序排列**。想调整首页板块顺序/增删，改这里的 JSX 顺序即可，不要去区块内部找。
- **每个区块是独立文件**：改某一屏内容，先在 `page.tsx` 找到对应组件名，再去 `components/landing/` 里改那个文件。**一个区块 = 一个文件**，不要把多个区块塞进一个文件。
- **导航和页脚**在首页和模型页都用到，改一次两处都生效。

---

## 4. 常见改动「去哪改」速查

| 想改什么 | 改哪个文件 |
| --- | --- |
| 模型价格 / 增删模型 | `lib/models.ts` |
| 模型表格的列、样式、复制按钮 | `components/models/models-explorer.tsx` |
| 顶部导航菜单项、按钮 | `components/landing/navigation.tsx`（`navLinks` 数组） |
| 首屏标题 / 轮播词 / 统计数字 | `components/landing/hero-section.tsx` |
| 底部 CTA 文案 / 联系客服链接 | `components/landing/cta-section.tsx` |
| 页脚文案 / QQ 群链接 | `components/landing/footer-section.tsx` |
| 全站配色（明/暗） | `app/globals.css` 的 `:root` 和 `:root.dark` |
| 网页标题 / SEO 描述 | `app/layout.tsx`（首页）、各 `page.tsx` 的 `metadata` |
| 降智雷达评分数据来源 | `app/api/codex-ratings/route.ts` |

---

## 5. ⚠️ 容易改乱的地方（重点看）

1. **配色一定走 token，别写死颜色**
   - 用 `bg-background` `text-foreground` `text-muted-foreground` `border-border` 这类语义类名。
   - **不要**写 `bg-white` `text-black` `bg-[#fff]`，否则暗色模式会瞎。
   - 改主题色只改 `globals.css` 里的 CSS 变量，全站自动生效。

2. **`components/ui/` 下的文件尽量别手动改**
   - 这些是 shadcn 生成的基础组件，被到处引用。改坏一个，多个页面跟着崩。
   - 要定制样式，优先在使用处加 className，而不是改 ui 组件本体。

3. **`lib/models.ts` 的字段结构要保持一致**
   - 每个模型对象的字段（`name` `provider` `inputRate` 等）是表格直接读取的。
   - 删字段或改名会导致表格报错或显示空白。加模型时照抄现有对象的结构。
   - 价格统一带 `$` 前缀的字符串（如 `"$5"`），表格直接原样显示。
   - `comingSoon: true` 会让该模型显示「暂未开放」并把价格显示为「—」。

4. **删代码的顺序**：先删「用到的地方」，再删「import」。反过来会报「未使用变量/找不到模块」。

5. **`"use client"`**：文件顶部有这行的是客户端组件（能用 useState、事件、动画）。纯展示的区块没有这行。加交互（点击、悬停状态）时记得确认文件顶部有 `"use client"`。

6. **字体在 `app/layout.tsx` 配置**，通过 `font-sans` / `font-mono` / `font-display` 类名使用。不要在组件里硬塞别的字体。

---

## 6. 数据与接口

- **降智雷达**是唯一有「实时数据」的模块：
  - 前端 `codex-radar-section.tsx` 用 SWR 每 5 分钟请求 `/api/codex-ratings`。
  - 后端 `app/api/codex-ratings/route.ts` 返回评分 JSON。要换数据源/算法改这个文件。
- 其余所有内容（价格、文案、模型清单）都是**写死在代码里的静态数据**，改了刷新即可，无需数据库。

---

## 7. 合规提醒

- 页脚和联系方式目前用 **QQ 群链接**（`https://qm.qq.com/q/jt5yll2TcY`），新窗口打开。
- 之前的微信二维码已移除（防被举报）。如要再加联系方式，注意平台合规，别放二维码图片。

---

## 8. 改动后自检清单

- [ ] 明暗两种模式都看一遍（右上角切换按钮）
- [ ] 手机宽度看一遍（导航会变成汉堡菜单）
- [ ] 改了 `models.ts` 后，打开 `/models` 确认表格没报错
- [ ] 删组件后，确认 `page.tsx` 里对应的引用也删了
- [ ] `pnpm build` 能通过再部署
