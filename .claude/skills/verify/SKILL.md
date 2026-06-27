---
name: verify
description: Run typecheck and tests to verify changes don't break anything
---

运行项目的类型检查和测试，验证当前改动没有引入错误。

执行步骤：

1. 运行 `npm run typecheck` — TypeScript 类型检查
2. 运行 `npm test` — Vitest 测试套件（含 jsdom DOM 测试）
3. 汇总两项结果，报告通过/失败状态

如果任一命令失败，列出具体错误文件和行号。
