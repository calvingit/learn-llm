# AGENTS.md

## 项目概述

Learn-LLM — 面向普通人的大模型通识交互式学习网站。24 章、7 个单元，中文内容。

技术栈：Next.js 16 App Router + React 19 + TypeScript 6 + MDX + Tailwind CSS v4 + shadcn/ui (new-york) + Motion

## 常用命令

```bash
npm run dev        # 开发服务器
npm run build      # 生产构建
npm run typecheck  # tsc --noEmit
npm test           # vitest run
npm run format      # prettier --write .
```

## 代码约定

- Tailwind v4：无 `tailwind.config.*` 文件，主题通过 `src/app/globals.css` 中的 `@theme inline {}` 和 CSS 变量配置
- shadcn/ui：new-york 风格，`cn()` 工具函数位于 `@/lib/utils`
- 课程内容：MDX 文件位于 `src/content/courses/learn-llm/`，每章一个 `chapter-XX.mdx`
- MDX 文件不以 `# 标题` 开头（标题由页面 `<header>` 渲染，MDX 内容从 `## 核心问题` 开始）
- 交互组件映射：`mdx-components.tsx` 中注册，组件实现在 `src/components/course/`
- 课程元数据：`src/lib/courses.ts` 中 `learnLLMChapters` 数组
- 学习进度：`localStorage` 本地存储
- TypeScript strict 模式，`allowJs: false`
- 路径别名：`@/*` → `./src/*`

## 项目结构要点

```
src/app/courses/learn-llm/[chapter]/page.tsx  # 章节详情页（动态路由）
src/content/courses/learn-llm/chapter-XX.mdx  # 章节 MDX 内容
src/components/course/                         # 课程交互组件
src/lib/courses.ts                             # 课程数据 + 工具函数
src/lib/chapter-content.ts                     # MDX 动态加载
src/lib/course-interactions.ts                 # 交互逻辑
```

## Git 约定

- 分支命名：`feature/xxx` 或 `fix/xxx`
- Commit 信息：中文描述
- PR 合并到 `main`

## 内容规范

- 面向普通人，少术语，多比喻
- 先直觉，再概念
- 不写公式推导，不要求代码能力
- 每章解决一个核心问题
- 对 RAG、Agent、安全对齐的能力不做过度承诺
- 不展示可执行的危险步骤
- 高风险场景（医疗、法律、投资）明确要求人类复核
