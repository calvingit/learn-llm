# Learn-LLM 插图生成提示词

> 统一风格：现代扁平化教育插图，暖色调为主，干净构图，适合数字教材。画面比例 16:9，留白适中，适合搭配中文标题和说明文字。风格参考：Notion、Linear、Stripe 的文档插图风格 —— 几何化、低饱和度、信息清晰、有呼吸感。
>
> 每章 1 张插图，命名规则：`chapter-XX-concept.png`，存放路径：`public/images/learn-llm/visuals/`

---

## 第 1 章：AI 到底是什么？

**文件名：** `chapter-01-ai-hierarchy.png`

**概念：** AI 工具箱 —— 一个分层包含的嵌套结构，显示 AI > 机器学习 > 深度学习 > 大模型的包含关系。

**提示词：**

```
A modern educational illustration showing AI concepts as nested layers.
The outermost layer is labeled "AI 人工智能" and contains various tools (a robot arm, speech bubble, chart, magnifying glass).
Inside it, a middle layer labeled "机器学习" shows a machine learning from labeled data examples.
Inside that, a deeper layer labeled "深度学习" shows a multi-layered neural network.
At the center, the innermost core labeled "大模型" glows warmly, connected to all outer layers.
Style: flat vector illustration, warm orange and blue palette, clean geometric shapes, soft gradients, generous white space, educational textbook style. 16:9 aspect ratio. No text other than the four Chinese labels.
```

---

## 第 2 章：机器学习

**文件名：** `chapter-02-learning-from-examples.png`

**概念：** 规则编程 vs 机器学习 —— 左侧一个人埋头写厚厚的规则手册，右侧机器从大量标注样本中归纳规律。

**提示词：**

```
A split-scene educational illustration. Left side: a person writing a thick rulebook labeled "规则手册", surrounded by crumpled papers, looking tired. Right side: a machine/system receiving many example cards with labels (✓ spam, ✗ normal), gradually forming a pattern recognition model that glows with understanding. A visual arrow shows the transition from "手工规则" to "从样本学习".
Style: flat vector illustration, warm orange and teal palette, clean geometric shapes, soft gradients, educational textbook style. 16:9 aspect ratio, generous white space.
```

---

## 第 3 章：深度学习

**文件名：** `chapter-03-feature-extraction.png`

**概念：** 多层神经网络逐层提取特征识别猫 —— 从边缘 → 形状 → 部件 → 整体。

**提示词：**

```
An educational illustration showing how a deep neural network recognizes a cat through layers. Left: a photo of a cat enters the network. The network is shown as 4 vertical layers (labeled in Chinese if needed but minimal): Layer 1 detects edges and lines (simple geometric fragments). Layer 2 combines them into shapes (ears, eyes). Layer 3 forms parts (cat face outline). Layer 4 outputs "猫" with high confidence. Each layer shows what it "sees" as increasingly complete visual features.
Style: flat vector illustration, warm purple and gold palette, clean geometric representation of neural network layers, educational textbook style. 16:9, clean and not cluttered.
```

---

## 第 4 章：GPT 路线

**文件名：** `chapter-04-generative-vs-understanding.png`

**概念：** 理解式路线（固定任务）vs 生成式路线（开放式续写）的对比。

**提示词：**

```
A comparison illustration with two panels. Left panel "理解式": a machine reading a document and outputting a single classification label (like a multiple-choice test answer). Rigid, narrow interface. Right panel "生成式": the same machine receiving a text prompt and generating flowing text that continues naturally, shown as luminous text stream expanding outward. The right panel is larger and more vibrant, showing the versatility.
Style: flat vector illustration, warm coral and navy palette, clean geometric shapes, educational textbook style. 16:9, clear visual contrast between the two approaches.
```

---

## 第 5 章：Token

**文件名：** `chapter-05-token-blocks.png`

**概念：** 一句完整的话被拆解成彩色 token 积木块。

**提示词：**

```
An educational illustration showing a complete Chinese sentence "我喜欢学习人工智能" floating above, then visually breaking apart into colorful building blocks below. Each block contains a small piece of text (tokens): "我", "喜欢", "学习", "人工", "智能". The blocks are stacked in a row, connected by subtle arrows showing the sequence. A magnifying glass hovers over one block showing it's made of numbers/vectors inside.
Style: flat vector illustration, warm colorful blocks (orange, blue, green, purple), playful but clean, educational textbook style. 16:9, generous white space.
```

---

## 第 6 章：上下文窗口

**文件名：** `chapter-06-context-window.png`

**概念：** 办公桌比喻 —— 桌面上同时摊开各种材料，但空间有限，旧的被推到一边。

**提示词：**

```
A top-down or isometric illustration of a desk as a metaphor for context window. On the desk: system prompt (a framed instruction card), user question (a sticky note), conversation history (a stack of papers), retrieved documents (open books), and the model's current answer being written. Some old papers are being pushed off the desk edge or stacked aside. A subtle glow highlights what's currently "visible" on the desk surface. The desk has finite space, clearly showing the constraint.
Style: flat vector isometric illustration, warm wood tones and paper colors, clean and organized but showing limits, educational textbook style. 16:9.
```

---

## 第 7 章：Token 账本

**文件名：** `chapter-07-token-ledger.png`

**概念：** Token 计费账本 —— 左侧"输入"（系统指令 + 对话历史 + 资料），右侧"输出"（模型回答），底部显示总费用。

**提示词：**

```
An educational illustration showing token cost accounting as a clean ledger or balance sheet. Left column "输入 Token": stacked items including a gear icon (system prompt), chat bubbles (conversation history), a document icon (uploaded files), each with a token count number. Right column "输出 Token": a growing text response with token count. A subtle scale or balance at the top shows inputs and outputs being weighed. Bottom shows a simple cost summary.
Style: flat vector illustration, financial/ledger aesthetic but friendly, warm amber and slate palette, clean geometric layout, educational textbook style. 16:9.
```

---

## 第 8 章：接下一句话

**文件名：** `chapter-08-next-token-prediction.png`

**概念：** Next-token prediction 的过程 —— 给定上文，预测下文，一步步接出完整回答。

**提示词：**

```
An educational illustration showing next-token prediction as a flowing chain. At the top, a context sentence "小明没带伞，外面正在下雨，他走到门口..." acts as input. Below, a probability distribution shows multiple possible next tokens branching out: "回去拿伞" (high probability, bright), "犹豫了一下" (medium), "冲了出去" (low, dim). One token is selected and added to the chain. The process repeats, showing how a full response is built token by token.
Style: flat vector illustration, warm blue and orange palette, clean branching diagram, flowing layout, educational textbook style. 16:9.
```

---

## 第 9 章：温度与随机性

**文件名：** `chapter-09-temperature.png`

**概念：** 温度控制候选 token 概率分布的集中与发散 —— 低温尖锐，高温平坦。

**提示词：**

```
An educational illustration showing temperature's effect on token selection. A central dial/thermometer labeled "温度" goes from low to high. Left side (low temp ≈ 0.2): a sharp probability distribution curve with one tall peak — predictable, stable output shown as identical neat text blocks. Right side (high temp ≈ 1.0): a flat distribution curve with multiple peaks — diverse, creative output shown as varied colorful text blocks. Center shows moderate temperature balance.
Style: flat vector illustration, gradient from cool blue (low temp) to warm orange/red (high temp), clean curves and probability charts, educational textbook style. 16:9.
```

---

## 第 10 章：推理

**文件名：** `chapter-10-reasoning-steps.png`

**概念：** 推理不是直接给答案，而是展示可检查的中间步骤 —— 像学生解题写过程。

**提示词：**

```
An educational illustration contrasting two approaches. Left: a person writes only a final answer "15" in a box — unclear if correct or guessed. Right: the same person writes step-by-step work on a whiteboard: "原来5个 → 吃掉2个 → 又买12个 → 5-2+12=15", with each step verifiable and clearly shown. The right side has a subtle checkmark overlay suggesting verifiability. The visual communicates that showing steps enables checking.
Style: flat vector illustration, warm academic tones (cream, navy, gold), clean whiteboard/notebook aesthetic, educational textbook style. 16:9.
```

---

## 第 11 章：更好的提问

**文件名：** `chapter-11-better-prompting.png`

**概念：** 模糊 Prompt → 结构化 Prompt 的转变 —— 从一句话变成包含背景、任务、边界、格式、检查要求的完整指令。

**提示词：**

```
An educational illustration showing the transformation of a prompt. Left side: a single vague sticky note saying "帮我写个总结" floating in empty space — the model has to guess everything. Right side: a structured card with labeled sections being filled in — "背景" (who you are), "任务" (what to do), "边界" (what not to do), "格式" (output format), "检查" (how to verify). Each section has an icon and filled example text. The structured version glows with clarity.
Style: flat vector illustration, warm blue and gold palette, clean card-based layout, educational textbook style. 16:9.
```

---

## 第 12 章：幻觉

**文件名：** `chapter-12-hallucination.png`

**概念：** 模型自信地"一本正经胡说八道" —— 演讲者侃侃而谈，但身后的信息板上混着错误事实。

**提示词：**

```
An educational illustration about AI hallucination. A confident speaker stands at a podium, speaking fluently. Behind them is an information board where some facts are real (solid, with source citations) and some are fabricated (translucent, flickering, with question marks). A small figure in the corner is fact-checking against a reference book, highlighting discrepancies. The visual shows that fluent speech ≠ factual accuracy.
Style: flat vector illustration, warm but slightly uneasy color palette (amber with purple accents for false info), clean composition, educational textbook style. 16:9.
```

---

## 第 13 章：RAG

**文件名：** `chapter-13-rag-open-book.png`

**概念：** RAG 像开卷考试 —— 先翻资料，再基于资料回答。

**提示词：**

```
An educational illustration showing RAG as an open-book exam. A student (representing the AI) sits at a desk with an exam paper showing a question. Around them, reference books and documents are open. A visual flow shows: Question → Search documents (magnifying glass over a knowledge base) → Find relevant passages (highlighted text cards) → Read and answer (writing a cited response). Each step is connected by arrows. The key message: the AI consults materials before answering.
Style: flat vector illustration, warm academic colors (cream paper, navy books, gold highlights), clean process flow, educational textbook style. 16:9.
```

---

## 第 14 章：Embedding

**文件名：** `chapter-14-embedding-space.png`

**概念：** 语义空间二维可视化 —— 意思相近的文本聚在一起，意思不同的远离。

**提示词：**

```
An educational illustration showing a semantic embedding space as a 2D map. Scattered across the space are text fragments as small cards. Similar meanings cluster together: "休假申请" "请假流程" "年假规定" form one cluster; "报销发票" "费用提交" "财务审批" form another cluster far away. A new question "怎么请假" appears and a dotted line shows it being mapped to the nearest cluster. Distance represents semantic similarity.
Style: flat vector illustration, deep space/navy background with warm glowing clusters, clean card labels, educational textbook style. 16:9, visually striking but clear.
```

---

## 第 15 章：对齐

**文件名：** `chapter-15-alignment.png`

**概念：** 模型训练的三个阶段：预训练（广泛阅读）→ 指令微调（学会当助手）→ 偏好对齐（学会安全边界）。

**提示词：**

```
An educational illustration showing model alignment as a three-stage progression. Stage 1 "预训练": a figure reading a massive pile of books — gaining knowledge. Stage 2 "指令微调": the same figure now at a desk, following instruction cards to produce proper responses. Stage 3 "偏好对齐": the figure now has a safety shield and a judgment scale, making balanced decisions — saying "我可以帮你..." for safe requests and "我建议你..." with alternatives for risky ones. The progression shows increasing capability AND increasing responsibility.
Style: flat vector illustration, evolving color palette from cool blue (training) to warm gold (aligned), clean three-panel layout, educational textbook style. 16:9.
```

---

## 第 16 章：Prompt

**文件名：** `chapter-16-prompt-as-context.png`

**概念：** Prompt 不是咒语，而是上下文控制面板 —— 背景、任务、边界、格式、检查。

**提示词：**

```
An educational illustration showing Prompt as a control panel, not a magic spell. A clean dashboard with labeled sections: "背景" (who/where), "任务" (what to do), "材料" (input materials), "边界" (constraints), "格式" (output format), "检查" (verification criteria). Each section has an icon and a short example text. The panel feeds into a model that produces a targeted, verifiable output. The visual communicates structure and control, not mysticism.
Style: flat vector illustration, clean dashboard/control panel aesthetic, warm slate and blue palette, organized layout, educational textbook style. 16:9.
```

---

## 第 17 章：工具调用

**文件名：** `chapter-17-tool-calling.png`

**概念：** 模型是调度台，不是执行者 —— 模型判断需要什么工具，外部系统负责执行。

**提示词：**

```
An educational illustration showing tool calling architecture. A central console/switchboard labeled "模型" (the model) sits in the middle. From it, connection lines go out to various tool modules arranged around it: a weather icon (天气查询), a database cylinder (数据库), a search magnifying glass (搜索), an email envelope (邮件), a code terminal (代码执行). Each tool has a small lock icon showing access control. The flow shows: model decides → tool executes → result returns → model responds. The model doesn't have hands — it delegates.
Style: flat vector illustration, clean tech/console aesthetic, warm navy and teal palette, hub-and-spoke layout, educational textbook style. 16:9.
```

---

## 第 18 章：Agent

**文件名：** `chapter-18-agent-loop.png`

**概念：** Agent 闭环 —— 目标 → 思考 → 行动 → 观察 → 再决策 → 停止。

**提示词：**

```
An educational illustration showing the Agent execution loop as a clear cycle diagram. Five connected nodes form a circle: "目标" (Goal) → "思考" (Think) → "行动" (Act, showing a tool being called) → "观察" (Observe, showing result feedback) → "决策" (Decide: continue or stop). The cycle can loop back from Observe to Think, or exit to "完成" (Done) with a checkmark. A stop condition icon (red stop sign) sits at the decision point. Clean, flowing, easy to follow.
Style: flat vector illustration, warm teal and gold palette, clean circular flow diagram, educational textbook style. 16:9.
```

---

## 第 19 章：Agent 失控

**文件名：** `chapter-19-agent-failures.png`

**概念：** Agent 四种失控类型 —— 目标漂移、重复循环、工具误用、伪造结果。

**提示词：**

```
An educational illustration showing four common Agent failure modes in a 2x2 grid. Top-left "目标漂移": a ship drifting off course from "查天气" to planning a vacation. Top-right "重复循环": a hamster wheel showing the agent calling the same tool endlessly. Bottom-left "工具误用": a figure using a hammer (wrong tool) on a screw, labeled with incompatible tool-task pairs. Bottom-right "伪造结果": a stage prop facade that looks real from the front but is hollow behind — the agent faked a successful result. A central icon suggests governance: permissions, logs, stop conditions.
Style: flat vector illustration, warm amber and alert-red palette, clean grid layout, educational textbook style. 16:9.
```

---

## 第 20 章：Workflow

**文件名：** `chapter-20-workflow.png`

**概念：** 复杂任务的工作流 —— 收集材料 → AI 草稿 → 人类审核 → 事实核对 → 改写定稿。

**提示词：**

```
An educational illustration showing a practical AI workflow as a horizontal pipeline with 5 stages. Stage 1 "收集材料": document gathering (icon: folder). Stage 2 "AI草稿": AI generates initial draft (icon: sparkle/robot). Stage 3 "人类审核": human reviews direction and priorities (icon: person with checkmark). Stage 4 "事实核对": fact verification against sources (icon: magnifying glass over document). Stage 5 "改写定稿": AI rewrites based on feedback (icon: polished document). Each stage shows who's responsible (AI, human, or both). Arrows connect the stages cleanly.
Style: flat vector illustration, warm coral and navy palette, clean pipeline/flow layout, educational textbook style. 16:9.
```

---

## 第 21 章：AI 协作边界

**文件名：** `chapter-21-collaboration-boundaries.png`

**概念：** 任务风险分类 —— 低风险（AI 多做）、中风险（AI+人审核）、高风险（人负责，AI 辅助）。

**提示词：**

```
An educational illustration showing AI collaboration boundaries as a spectrum or three-tier system. Left zone (green, "AI主导"): low-risk tasks like summarizing, drafting, translating — AI icon prominent. Middle zone (amber, "人机协作"): medium-risk tasks like client emails, proposals — AI and human icons side by side with a review checkpoint. Right zone (red, "人类负责"): high-risk tasks like medical diagnosis, legal decisions, investments — human icon prominent, AI as supporting assistant. A simple decision tree at the bottom: "可验证? 可撤回? 涉及权益?" guiding which zone a task belongs to.
Style: flat vector illustration, traffic-light color progression (green → amber → red), clean spectrum layout, educational textbook style. 16:9.
```

---

## 第 22 章：蒸馏

**文件名：** `chapter-22-distillation.png`

**概念：** 大模型（老师）教小模型（学生）—— 大模型输出示范，小模型学习模仿。

**提示词：**

```
An educational illustration showing knowledge distillation as a teacher-student relationship. Left: a large, complex "大模型" (teacher) represented as a substantial glowing figure or network, producing detailed, high-quality example answers on a blackboard. Right: a smaller, simpler "小模型" (student) represented as a compact figure, studying the teacher's examples and learning to produce similar but simpler answers. An arrow shows knowledge flowing from teacher to student. The student's output is correct but less detailed — the core meaning is preserved.
Style: flat vector illustration, warm amber and teal palette, mentorship/teaching aesthetic, clean left-right composition, educational textbook style. 16:9.
```

---

## 第 23 章：训练流程

**文件名：** `chapter-23-training-pipeline.png`

**概念：** 大模型训练的四个阶段 —— 预训练 → SFT → RL → RLHF。

**提示词：**

```
An educational illustration showing the LLM training pipeline as a 4-stage timeline. Stage 1 "预训练": a neural network icon absorbing massive text data from books, web, code — labeled "学语言, 打基础". Stage 2 "SFT 监督微调": the model receives question-answer pairs as training examples — labeled "学格式, 跟指令". Stage 3 "RL 强化学习": the model practices on verifiable tasks (code passes tests, math has answers) — labeled "练专精, 提能力". Stage 4 "RLHF 偏好对齐": the model learns human preferences — helpful, honest, safe — labeled "定边界, 学安全". The model icon evolves at each stage, becoming more refined.
Style: flat vector illustration, progressive color palette from cool blue (raw training) to warm gold (aligned assistant), clean timeline layout, educational textbook style. 16:9.
```

---

## 第 24 章：开源模型

**文件名：** `chapter-24-model-landscape.png`

**概念：** 模型选择的决策图 —— 不是最强最好，而是最匹配场景的才最好。

**提示词：**

```
An educational illustration showing the model selection landscape as a decision map or compass. At center: a user with a thought bubble "我的场景是什么?". Branching outward, three paths: Path 1 "商业闭源模型" (icon: cloud/API) — for general tasks, easy to use, no deployment needed. Path 2 "开源模型" (icon: server/local) — for privacy needs, customization, cost control, but requires technical capability. Path 3 "小型端侧模型" (icon: smartphone) — for offline use, low latency, simple tasks. Each path shows key trade-offs: capability vs cost vs privacy vs complexity. Not a ranking — different scenarios need different choices.
Style: flat vector illustration, warm neutral palette with color-coded paths, clean decision-tree/map layout, educational textbook style. 16:9.
```

---

## 生成建议

- **统一风格：** 所有插图用同一套提示词风格模板（flat vector illustration, warm palette, educational textbook style, 16:9）
- **色彩统一：** 主色调控制在暖橙/蓝/紫/金范围内，避免高饱和度碰撞色
- **文字极简：** 图内仅保留必要的中文标签（2-5 个字），避免大段文字嵌入图片
- **留白充足：** 构图留出呼吸空间，不要填满整个画面
- **无人物面孔细节：** 人物用几何化/抽象化表达，避免具体面部特征
- **每张图单独生成：** 根据每章概念微调，保持系列感但各有特色
- **输出格式：** PNG, 2x 分辨率（2880×1620 或更高），便于在高分辨率屏幕上清晰显示
