# Learn-LLM

面向普通人的大模型通识交互式学习网站，从“AI 到底是什么”讲到 Prompt、RAG、Agent、多模态和日常工作流，帮助非技术背景用户建立可复核、不过度迷信的 AI 使用判断。

![Learn-LLM 首页视觉](public/images/learn-llm-hero.png)

## 项目特点

- **零基础友好**：不要求数学、代码或算法背景，优先用生活问题、比喻和小互动解释概念。
- **课程结构完整**：当前包含 25 章正文内容和 7 个单元总结，覆盖 AI 基础、大模型生成机制、幻觉、RAG、Agent、Workflow、多模态等主题。
- **交互式学习**：章节内容使用 MDX 编写，可嵌入课程组件、小游戏、测验和可视化解释。
- **强调边界感**：对 RAG、Agent、安全对齐和高风险场景保持克制表达，明确人类复核的重要性。

## 技术栈

- Astro 7 静态站
- React 19
- TypeScript 6
- MDX
- Tailwind CSS v4
- shadcn/ui（new-york）
- Motion
- Vitest

## 本地运行

```bash
npm install
npm run dev
```

开发服务器默认运行在 `http://localhost:4321`。

## 常用命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 生产构建
npm run typecheck    # TypeScript 类型检查
npm test             # 运行测试
npm run format       # 格式化代码
npm run format:check # 检查格式
```

## 项目结构

```text
src/pages/
  courses/learn-llm/                 # 课程目录与章节页面
src/components/course/               # 课程交互组件、测验和可视化
src/components/mdx/                  # MDX 基础元素样式
src/content/courses/learn-llm/       # 课程 MDX 内容
src/lib/
  courses.ts                         # 课程元数据
  course-interactions.ts             # 交互逻辑
```

## 内容维护约定

- 每章内容放在 `src/content/courses/learn-llm/chapter-XX.mdx`。
- 单元总结放在 `src/content/courses/learn-llm/unit-XX-summary.mdx`。
- 章节标题由页面 header 渲染，MDX 文件不要以 `# 标题` 开头，正文从 `## 核心问题` 开始。
- 新增章节后，需要同步更新 `src/lib/courses.ts`。
- 新增可交互组件后，在使用它的 MDX 文件顶部显式 import，并使用 `client:visible`；组件实现放在 `src/components/course/`。

## 适合人群

- 想系统理解大模型但没有技术背景的普通用户
- 希望更稳妥使用 AI 的学生、职场人士、产品、运营和管理者
- 想补齐 LLM 通识框架的非 AI 工程师

## 许可证

本项目基于 [MIT License](LICENSE) 开源。
