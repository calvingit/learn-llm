---
name: lint-fix
description: Run Prettier formatting on changed files
---

对当前改动的文件运行 Prettier 格式化。

执行步骤：

1. 用 `git diff --name-only` 获取改动的 `.ts`、`.tsx`、`.mdx`、`.css` 文件列表
2. 对每个文件运行 `npx prettier --write <file>`
3. 报告格式化结果
