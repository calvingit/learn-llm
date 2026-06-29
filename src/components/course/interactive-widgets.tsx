import { type ReactNode, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  Cpu,
  Database,
  Hand,
  Layers,
  ListChecks,
  RefreshCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { estimateTokenCost, splitTextForTokenDemo } from "@/lib/course-interactions";
import { cn } from "@/lib/utils";

type WidgetShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function WidgetShell({ title, description, children }: WidgetShellProps) {
  return (
    <section className="bg-card my-8 rounded-xl border p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="mt-0 flex items-center gap-2 text-xl font-semibold tracking-normal">
          <Sparkles data-icon="inline-start" className="text-primary size-5" />
          {title}
        </h3>
        <p className="text-muted-foreground my-2 text-sm leading-6">{description}</p>
      </div>
      {children}
    </section>
  );
}

const hierarchyLayers = [
  {
    value: "ai",
    name: "AI",
    detail: "让机器表现出类似智能的能力，是最大的一层愿景。",
    example: "自动识别垃圾邮件、推荐路线、生成图片，都可以归入 AI。",
  },
  {
    value: "machine-learning",
    name: "机器学习",
    detail: "AI 的一种主流方法：不手写所有规则，而是让机器从例子里找规律。",
    example: "给机器看很多房价样本，让它学习面积、位置和价格的关系。",
  },
  {
    value: "deep-learning",
    name: "深度学习",
    detail: "机器学习的一次升级，用多层神经网络从大量数据里提取特征。",
    example: "不用手写“猫有胡须”，模型自己从图片里发现这些线索。",
  },
  {
    value: "large-model",
    name: "大模型",
    detail: "深度学习在语言、图像等领域扩展到大规模数据和参数后的结果。",
    example: "读过海量文本后，可以根据上下文生成回答、总结和计划。",
  },
];

const hierarchyLabelPositions = [
  { left: "50%", top: "12%" },
  { left: "79%", top: "50%" },
  { left: "50%", top: "78%" },
  { left: "50%", top: "50%" },
];

export function AiHierarchyMap() {
  return (
    <WidgetShell
      title="AI 层级地图"
      description="点击不同圈层，观察 AI、机器学习、深度学习和大模型的包含关系。"
    >
      <div data-ai-map className="grid gap-5 md:grid-cols-[1fr_1.1fr] md:items-center">
        <fieldset className="bg-muted rounded-xl p-5">
          <legend className="sr-only">选择 AI 层级</legend>
          {hierarchyLayers.map((layer, index) => (
            <input
              key={layer.value}
              className="sr-only"
              defaultChecked={index === 0}
              id={`ai-layer-${layer.value}`}
              name="ai-layer"
              type="radio"
              value={layer.value}
            />
          ))}
          <div className="relative mx-auto aspect-square max-w-72">
            {hierarchyLayers.map((layer, index) => {
              const size = 100 - index * 20;
              const offset = index * 10;

              return (
                <div
                  key={layer.name}
                  aria-hidden="true"
                  data-ai-ring-visual={layer.value}
                  className={cn(
                    "bg-card pointer-events-none absolute rounded-full border-2 transition-colors",
                  )}
                  style={{
                    height: `${size}%`,
                    left: `${offset}%`,
                    top: `${offset}%`,
                    width: `${size}%`,
                  }}
                />
              );
            })}
            {hierarchyLayers.map((layer, index) => {
              const position = hierarchyLabelPositions[index];

              return (
                <label
                  key={layer.value}
                  aria-label={`查看${layer.name}圈层`}
                  data-ai-ring-label={layer.value}
                  htmlFor={`ai-layer-${layer.value}`}
                  className="bg-card hover:bg-primary/8 absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border px-3 py-2 text-xs font-semibold shadow-sm transition-colors"
                  style={{
                    left: position.left,
                    top: position.top,
                  }}
                >
                  {layer.name}
                </label>
              );
            })}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {hierarchyLayers.map((layer) => (
              <label
                key={layer.name}
                data-ai-option-label={layer.value}
                htmlFor={`ai-layer-${layer.value}`}
                className={cn(
                  "bg-card hover:bg-background cursor-pointer rounded-md border px-3 py-2 text-center text-sm font-semibold transition-colors",
                )}
              >
                {layer.name}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="bg-muted rounded-xl border p-5">
          {hierarchyLayers.map((layer) => (
            <div key={layer.value} data-ai-layer-detail={layer.value}>
              <p className="text-primary my-0 text-sm font-semibold">当前圈层：{layer.name}</p>
              <p className="mt-3 mb-0 text-lg leading-8">{layer.detail}</p>
              <p className="bg-card text-muted-foreground mt-4 mb-0 rounded-lg p-4 text-sm leading-6">
                {layer.example}
              </p>
            </div>
          ))}
        </div>
      </div>
    </WidgetShell>
  );
}

const learningExamples = [
  { input: "标题含“限时中奖”，发件人陌生", label: "垃圾邮件" },
  { input: "同事发送会议纪要，域名可信", label: "正常邮件" },
  { input: "要求立刻点链接领取补贴", label: "垃圾邮件" },
];

const learningRevealSteps = [1, 2, 3] as const;

const learningInsights = [
  {
    stage: "初始假设",
    summary: "只看到一个垃圾样本，机器只能形成很粗的猜测。",
    clues: ["陌生来源", "限时中奖"],
    rule: "标题像促销、来源陌生时，需要提高警惕，但证据还不稳。",
  },
  {
    stage: "开始对照正负样本",
    summary: "加入一封正常邮件后，机器开始比较“可疑”和“可信”的差别。",
    clues: ["陌生来源", "可信域名", "会议上下文"],
    rule: "同样是邮件，发件人关系和业务上下文会改变判断。",
  },
  {
    stage: "规律更稳定",
    summary: "第三个样本强化了强迫点击和奖励诱导这类共同线索。",
    clues: ["陌生来源", "强迫点击", "奖励诱导", "可信上下文"],
    rule: "机器不是背某一句话，而是在多个样本中抽出可复用的判断线索。",
  },
];

export function LearningByExamples() {
  const [visibleCount, setVisibleCount] = useState(1);
  const visibleExamples = learningExamples.slice(0, visibleCount);
  const insight = learningInsights[visibleCount - 1];

  return (
    <WidgetShell
      title="从例子里学规律"
      description="逐条揭示训练样本，观察机器学习和手写规则的区别。"
    >
      <div data-learning-examples className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-3">
          {visibleExamples.map((example, index) => (
            <div
              key={example.input}
              data-learning-example={index + 1}
              className="bg-card rounded-lg border p-4 transition-colors"
            >
              <p className="my-0 text-sm leading-6">{example.input}</p>
              <p className="text-primary mt-2 mb-0 text-sm font-semibold">{example.label}</p>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              setVisibleCount((count) =>
                count >= learningRevealSteps.length
                  ? 1
                  : Math.min(count + 1, learningRevealSteps.length),
              )
            }
          >
            {visibleCount >= learningRevealSteps.length ? "重置样本" : "加一个样本"}
            {visibleCount >= learningRevealSteps.length ? (
              <RefreshCcw data-icon="inline-end" />
            ) : (
              <ArrowRight data-icon="inline-end" />
            )}
          </Button>
        </div>
        <div className="bg-muted rounded-xl p-5">
          <h4 className="mt-0 text-base font-semibold">机器正在归纳</h4>
          <p className="text-primary mt-3 mb-0 text-sm font-semibold">{insight.stage}</p>
          <p className="text-muted-foreground mt-3 mb-0 text-sm leading-7">{insight.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {insight.clues.map((clue) => (
              <span
                key={clue}
                className="bg-card text-primary rounded-full border px-3 py-1 text-xs font-semibold"
              >
                {clue}
              </span>
            ))}
          </div>
          <p className="bg-card mt-4 mb-0 rounded-lg border p-3 text-sm leading-6">
            当前规则：{insight.rule}
          </p>
        </div>
      </div>
    </WidgetShell>
  );
}

const featureItems = ["耳朵轮廓", "眼睛位置", "胡须线索", "毛色纹理", "身体姿态"];

export function FeatureDetector() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    featureItems[0],
    featureItems[1],
  ]);
  const confidence = Math.round((selectedFeatures.length / featureItems.length) * 100);

  return (
    <WidgetShell
      title="特征探测器"
      description="点击线索，体会深度学习为什么不只依赖人手写的规则。"
    >
      <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-muted rounded-xl p-5">
          <div className="bg-card grid aspect-square place-items-center rounded-xl border">
            <div className="text-center">
              <Brain className="text-primary mx-auto size-14" />
              <p className="mt-3 mb-0 text-lg font-semibold">图片中的动物</p>
              <p className="text-muted-foreground mt-2 mb-0 text-sm">置信度 {confidence}%</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {featureItems.map((feature) => {
            const active = selectedFeatures.includes(feature);

            return (
              <button
                key={feature}
                type="button"
                className={cn(
                  "rounded-lg border p-4 text-left transition-colors",
                  active ? "border-primary bg-primary/8" : "bg-card hover:bg-muted",
                )}
                onClick={() =>
                  setSelectedFeatures((current) =>
                    current.includes(feature)
                      ? current.filter((item) => item !== feature)
                      : [...current, feature],
                  )
                }
              >
                <span className="font-semibold">{feature}</span>
                <span className="text-muted-foreground ml-2 text-sm">
                  {active ? "已被模型关注" : "点击加入判断"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </WidgetShell>
  );
}

const architectureModes = {
  bert: {
    label: "理解式路线",
    title: "更像完形填空和阅读理解",
    detail: "它擅长同时看前后文，判断空缺处、分类、匹配和抽取信息。",
    sample: "今天天气很好，我和朋友去 [公园] 玩得很开心。",
  },
  gpt: {
    label: "生成式路线",
    title: "更像接龙写作和对话续写",
    detail: "它只看已经出现的内容，然后不断生成下一个文字块，所以更容易扩展成开放对话。",
    sample: "今天天气很好，我和朋友去公园散步，还顺路买了咖啡。",
  },
};

export function ArchitectureShowdown() {
  const [mode, setMode] = useState<keyof typeof architectureModes>("gpt");
  const active = architectureModes[mode];

  return (
    <WidgetShell
      title="理解式路线 vs 生成式路线"
      description="这不是胜负表，而是看两种路线分别擅长什么。"
    >
      <div className="flex flex-wrap gap-3">
        {Object.entries(architectureModes).map(([key, item]) => (
          <Button
            key={key}
            type="button"
            variant={mode === key ? "default" : "outline"}
            onClick={() => setMode(key as keyof typeof architectureModes)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="bg-muted mt-5 rounded-xl border p-5">
        <p className="text-primary my-0 text-sm font-semibold">{active.title}</p>
        <p className="mt-3 mb-0 text-lg leading-8">{active.sample}</p>
        <p className="text-muted-foreground mt-4 mb-0 text-sm leading-6">{active.detail}</p>
      </div>
    </WidgetShell>
  );
}

const tokenColors = [
  "bg-primary/12 text-primary",
  "bg-secondary text-secondary-foreground",
  "bg-accent/15 text-foreground",
  "bg-muted text-muted-foreground",
];

export function TokenSplitter() {
  const [text, setText] = useState("我喜欢 Apple，也喜欢学习 LLM!");
  const tokens = useMemo(() => splitTextForTokenDemo(text), [text]);
  const tokenGroups = [
    { label: "原始句子", detail: text || "输入文字后会出现在这里" },
    { label: "教学拆分", detail: tokens.length ? tokens.join(" / ") : "等待输入" },
    { label: "模型处理", detail: `${tokens.length} 个可见小块会一起进入上下文窗口` },
  ];

  return (
    <WidgetShell
      title="Token 拆分器"
      description="输入一段文字，观察它如何被拆成模型更容易处理的小块。"
    >
      <textarea
        className="bg-card focus:border-primary min-h-24 w-full resize-y rounded-lg border p-4 text-sm leading-6 outline-none"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {tokenGroups.map((group, index) => (
          <div key={group.label} className="bg-muted rounded-lg border p-4">
            <p className="text-primary my-0 text-sm font-semibold">
              {index + 1}. {group.label}
            </p>
            <p className="mt-2 mb-0 text-sm leading-6 break-words">{group.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tokens.map((token, index) => (
          <span
            key={`${token}-${index}`}
            className={cn(
              "rounded-md px-2.5 py-1 text-sm font-semibold",
              tokenColors[index % tokenColors.length],
            )}
          >
            {token}
          </span>
        ))}
      </div>
      <p className="text-muted-foreground mt-4 mb-0 text-sm">
        这只是教学拆分，不等同于真实模型
        tokenizer；它用来帮助你建立“模型不是按完整句子理解，而是按小块处理”的直觉。
      </p>
    </WidgetShell>
  );
}

export function ContextWindowMeter() {
  const [messages, setMessages] = useState(9);
  const visibleMessages = Math.min(messages, 6);
  const forgottenMessages = Math.max(messages - visibleMessages, 0);
  const historySize = Math.min(38, 8 + messages * 3);
  const sourceSize = messages > 8 ? 22 : 14;
  const answerSize = Math.max(12, 100 - 12 - historySize - sourceSize - 10);
  const segments = [
    {
      label: "系统指令",
      value: 12,
      detail: "产品预设的角色、语气、安全边界。",
      className: "bg-primary",
    },
    {
      label: "历史对话",
      value: historySize,
      detail: "轮次越多，占用越大，旧内容会被挤出。",
      className: "bg-secondary",
    },
    {
      label: "外部资料",
      value: sourceSize,
      detail: "RAG、上传文件、网页片段也要占窗口。",
      className: "bg-accent",
    },
    {
      label: "当前问题",
      value: 10,
      detail: "用户这一次真正要解决的问题。",
      className: "bg-foreground",
    },
    {
      label: "回答空间",
      value: answerSize,
      detail: "留给模型生成答案的余量。",
      className: "bg-muted-foreground",
    },
  ];

  return (
    <WidgetShell
      title="上下文窗口计量器"
      description="拖动对话长度，看看模型当前还能看到哪些信息。"
    >
      <input
        className="accent-primary w-full"
        type="range"
        min="3"
        max="14"
        value={messages}
        onChange={(event) => setMessages(Number(event.target.value))}
      />
      <div className="mt-5 overflow-hidden rounded-xl border">
        <div className="flex h-12 w-full">
          {segments.map((segment) => (
            <div
              key={segment.label}
              className={cn("min-w-3 transition-all", segment.className)}
              style={{ width: `${segment.value}%` }}
              title={`${segment.label}: ${segment.value}%`}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {segments.map((segment) => (
          <div key={segment.label} className="bg-card rounded-lg border p-3">
            <p className="my-0 text-sm font-semibold">{segment.label}</p>
            <p className="text-muted-foreground mt-2 mb-0 text-xs leading-5">{segment.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3">
        {Array.from({ length: messages }, (_, index) => {
          const visible = index >= messages - visibleMessages;

          return (
            <div
              key={index}
              className={cn(
                "rounded-lg border p-3 text-sm",
                visible ? "bg-card" : "bg-muted text-muted-foreground opacity-55",
              )}
            >
              第 {index + 1} 轮对话：{visible ? "仍在窗口内" : "已经被挤出窗口"}
            </div>
          );
        })}
      </div>
      <p className="text-muted-foreground mt-4 mb-0 text-sm leading-6">
        当前 {messages} 轮里，模型主要能看到最近 {visibleMessages} 轮；
        {forgottenMessages > 0
          ? `前 ${forgottenMessages} 轮需要摘要或重新提供。`
          : "暂无内容被挤出。"}
      </p>
    </WidgetShell>
  );
}

const tokenCostScenarios = {
  short: {
    label: "短问答",
    inputTokens: 600,
    outputTokens: 300,
    cacheHitPercent: 10,
    note: "日常问答通常便宜，主要成本来自本轮输入和回答。",
  },
  summary: {
    label: "长文总结",
    inputTokens: 12000,
    outputTokens: 1200,
    cacheHitPercent: 20,
    note: "长文一次性塞入上下文，输入成本会明显上升。",
  },
  chat: {
    label: "多轮对话",
    inputTokens: 6500,
    outputTokens: 900,
    cacheHitPercent: 45,
    note: "历史对话会反复进入上下文，越聊越占账本。",
  },
  rag: {
    label: "带资料问答",
    inputTokens: 9800,
    outputTokens: 1100,
    cacheHitPercent: 35,
    note: "检索片段也算输入 Token，RAG 不是免费魔法。",
  },
};

const deepSeekPricing = {
  flash: {
    label: "DeepSeek V4 Flash",
    cacheHitInputPrice: 0.02,
    cacheMissInputPrice: 1,
    outputPrice: 2,
  },
  pro: {
    label: "DeepSeek V4 Pro",
    cacheHitInputPrice: 0.025,
    cacheMissInputPrice: 3,
    outputPrice: 6,
  },
} as const;

function formatCny(value: number) {
  return `¥${value.toFixed(6)}`;
}

export function TokenCostCalculator() {
  const [scenarioKey, setScenarioKey] = useState<keyof typeof tokenCostScenarios>("summary");
  const [modelKey, setModelKey] = useState<keyof typeof deepSeekPricing>("flash");
  const [customInputTokens, setCustomInputTokens] = useState(2000);
  const [customOutputTokens, setCustomOutputTokens] = useState(800);
  const [cacheHitPercent, setCacheHitPercent] = useState(
    tokenCostScenarios.summary.cacheHitPercent,
  );
  const scenario = tokenCostScenarios[scenarioKey];
  const model = deepSeekPricing[modelKey];
  const inputTokens = Math.max(scenario.inputTokens, customInputTokens);
  const outputTokens = Math.max(scenario.outputTokens, customOutputTokens);
  const cacheHitTokens = Math.round(inputTokens * (cacheHitPercent / 100));
  const cacheMissTokens = inputTokens - cacheHitTokens;
  const estimate = estimateTokenCost({
    inputTokens,
    inputCacheHitTokens: cacheHitTokens,
    outputTokens,
    inputCacheHitPricePerMillion: model.cacheHitInputPrice,
    inputCacheMissPricePerMillion: model.cacheMissInputPrice,
    outputPricePerMillion: model.outputPrice,
  });

  return (
    <WidgetShell
      title="Token 账本"
      description="调节输入和输出长度，观察费用为什么通常由输入和生成共同决定。"
    >
      <div className="grid gap-3 md:grid-cols-4">
        {Object.entries(tokenCostScenarios).map(([key, item]) => (
          <button
            key={key}
            type="button"
            className={cn(
              "rounded-lg border p-4 text-left transition-colors",
              scenarioKey === key ? "border-primary bg-primary/8" : "bg-card hover:bg-muted",
            )}
            onClick={() => {
              setScenarioKey(key as keyof typeof tokenCostScenarios);
              setCacheHitPercent(item.cacheHitPercent);
            }}
          >
            <span className="text-sm font-semibold">{item.label}</span>
            <span className="text-muted-foreground mt-2 block text-xs leading-5">
              {item.inputTokens.toLocaleString()} 输入 / {item.outputTokens.toLocaleString()} 输出
            </span>
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {Object.entries(deepSeekPricing).map(([key, item]) => (
          <button
            key={key}
            type="button"
            className={cn(
              "rounded-lg border p-4 text-left transition-colors",
              modelKey === key ? "border-primary bg-primary/8" : "bg-card hover:bg-muted",
            )}
            onClick={() => setModelKey(key as keyof typeof deepSeekPricing)}
          >
            <span className="text-sm font-semibold">{item.label}</span>
            <span className="text-muted-foreground mt-2 block text-xs leading-5">
              缓存命中输入 ¥{item.cacheHitInputPrice}/百万，缓存未命中输入 ¥
              {item.cacheMissInputPrice}/百万，输出价格 ¥{item.outputPrice}/百万
            </span>
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <label className="bg-card rounded-lg border p-4">
          <span className="text-sm font-semibold">输入 Token：{inputTokens.toLocaleString()}</span>
          <input
            className="accent-primary mt-4 w-full"
            type="range"
            min="200"
            max="20000"
            step="200"
            value={customInputTokens}
            onChange={(event) => setCustomInputTokens(Number(event.target.value))}
          />
        </label>
        <label className="bg-card rounded-lg border p-4">
          <span className="text-sm font-semibold">输出 Token：{outputTokens.toLocaleString()}</span>
          <input
            className="accent-primary mt-4 w-full"
            type="range"
            min="100"
            max="8000"
            step="100"
            value={customOutputTokens}
            onChange={(event) => setCustomOutputTokens(Number(event.target.value))}
          />
        </label>
        <label className="bg-card rounded-lg border p-4">
          <span className="text-sm font-semibold">缓存命中：{cacheHitPercent}%</span>
          <input
            className="accent-primary mt-4 w-full"
            type="range"
            min="0"
            max="90"
            step="5"
            value={cacheHitPercent}
            onChange={(event) => setCacheHitPercent(Number(event.target.value))}
          />
        </label>
      </div>
      <p className="bg-card mt-4 mb-0 rounded-lg border p-4 text-sm leading-6">
        当前场景：<span className="font-semibold">{scenario.label}</span>，按{" "}
        <span className="font-semibold">{model.label}</span> 人民币价格模拟。{scenario.note}
      </p>
      <div className="bg-muted mt-5 grid gap-3 rounded-xl p-5 sm:grid-cols-2 lg:grid-cols-4">
        <p className="my-0 text-sm">
          缓存命中输入：{cacheHitTokens.toLocaleString()} Token，{formatCny(estimate.cacheHitCost)}
        </p>
        <p className="my-0 text-sm">
          缓存未命中输入：{cacheMissTokens.toLocaleString()} Token，
          {formatCny(estimate.cacheMissCost)}
        </p>
        <p className="my-0 text-sm">输出费用：{formatCny(estimate.outputCost)}</p>
        <p className="my-0 text-sm font-semibold">合计：{formatCny(estimate.totalCost)}</p>
      </div>
    </WidgetShell>
  );
}

const nextWordCandidates = [
  { word: "回去拿伞", probability: 72 },
  { word: "冲进雨里", probability: 20 },
  { word: "开始跳舞", probability: 8 },
];

export function PredictNextWordSimulator() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = nextWordCandidates[selectedIndex];

  return (
    <WidgetShell
      title="预测下一句话"
      description="模型生成时会不断判断：在当前上下文后面，哪个续写最可能。"
    >
      <div className="bg-muted rounded-lg p-5">
        <p className="my-0 text-lg leading-8 font-semibold">
          小明没带伞，外面正在下雨，他走到门口……
        </p>
      </div>
      <div className="mt-4 grid gap-3">
        {nextWordCandidates.map((candidate, index) => (
          <button
            key={candidate.word}
            type="button"
            className={cn(
              "bg-card hover:bg-muted rounded-lg border p-4 text-left transition-colors",
              selectedIndex === index && "border-primary bg-primary/8",
            )}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold">{candidate.word}</span>
              <span className="text-muted-foreground text-sm">{candidate.probability}%</span>
            </div>
            <div className="bg-muted mt-3 h-2 rounded-full">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${candidate.probability}%` }}
              />
            </div>
          </button>
        ))}
      </div>
      <p className="text-muted-foreground mt-4 mb-0 text-sm leading-6">
        当前选择：{selected.word}。概率高不代表永远正确，但它说明这句话和上下文最贴近。
      </p>
    </WidgetShell>
  );
}

export function SamplingPlayground() {
  const [temperature, setTemperature] = useState(0.7);
  const mode = temperature < 0.35 ? "稳定严谨" : temperature > 1 ? "发散创作" : "平衡表达";
  const candidates = nextWordCandidates.map((candidate) => {
    const adjusted = Math.pow(candidate.probability / 100, 1 / Math.max(temperature, 0.1));
    return { ...candidate, adjusted };
  });
  const total = candidates.reduce((sum, candidate) => sum + candidate.adjusted, 0);

  return (
    <WidgetShell title="温度滑杆" description="温度越低越稳定，温度越高越容易尝试低概率表达。">
      <label className="bg-card block rounded-lg border p-4">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal className="text-primary size-4" />
          Temperature：{temperature.toFixed(1)}
        </span>
        <input
          className="accent-primary mt-4 w-full"
          type="range"
          min="0"
          max="1.4"
          step="0.1"
          value={temperature}
          onChange={(event) => setTemperature(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid gap-3">
        {candidates.map((candidate) => {
          const width = Math.round((candidate.adjusted / total) * 100);

          return (
            <div key={candidate.word} className="bg-card rounded-lg border p-4">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="font-semibold">{candidate.word}</span>
                <span className="text-muted-foreground">{width}%</span>
              </div>
              <div className="bg-muted mt-3 h-2 rounded-full">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-muted mt-4 rounded-xl p-5">
        <p className="my-0 text-lg font-semibold">{mode}</p>
        <p className="text-muted-foreground mt-3 mb-0 leading-7">
          {temperature < 0.35
            ? "适合事实核对、格式转换、步骤执行。回答变化小，但也可能显得保守。"
            : temperature > 1
              ? "适合头脑风暴、广告语、小说灵感。回答更丰富，但也更需要人类筛选。"
              : "适合大多数日常写作和解释任务，在稳定和多样之间取平衡。"}
        </p>
      </div>
    </WidgetShell>
  );
}

export function ReasoningPathCompare() {
  const [mode, setMode] = useState<"direct" | "steps">("steps");

  return (
    <WidgetShell
      title="答案路径对比"
      description="比较直接回答和展开步骤两种方式，理解“看起来会推理”的来源。"
    >
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant={mode === "direct" ? "default" : "outline"}
          onClick={() => setMode("direct")}
        >
          直接要答案
        </Button>
        <Button
          type="button"
          variant={mode === "steps" ? "default" : "outline"}
          onClick={() => setMode("steps")}
        >
          要求展示依据
        </Button>
      </div>
      <div className="bg-muted mt-5 rounded-xl border p-5">
        {mode === "direct" ? (
          <div>
            <p className="my-0 text-lg font-semibold">答案：17</p>
            <p className="text-muted-foreground mt-3 mb-0 text-sm leading-6">
              直接答案很快，但你看不出它有没有漏掉“先吃掉 2 个”这一步。
            </p>
          </div>
        ) : (
          <ol className="my-0 grid gap-2 pl-5 text-sm leading-7">
            <li>小明原来有 5 个苹果。</li>
            <li>吃掉 2 个后，还剩 3 个。</li>
            <li>又买 12 个后，合计 15 个。</li>
            <li>结论：答案是 15。</li>
          </ol>
        )}
      </div>
    </WidgetShell>
  );
}

const cotSteps = [
  "先列出已知条件：5 个苹果，吃掉 2 个，又买 12 个。",
  "把动作按时间顺序排列，避免漏步骤。",
  "计算 5 - 2 + 12 = 15。",
  "最后检查问题问的是现在有几个，不是买了几个。",
];

export function CotStepByStep() {
  const [step, setStep] = useState(1);
  const visibleSteps = cotSteps.slice(0, step);

  return (
    <WidgetShell title="可检查的推理步骤" description="逐步展开中间过程，让答案更容易被人类复核。">
      <div className="grid gap-3">
        {visibleSteps.map((item, index) => (
          <div key={item} className="bg-card rounded-lg border p-4 text-sm leading-6">
            {index + 1}. {item}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={() => setStep((value) => Math.min(value + 1, cotSteps.length))}
        >
          展开下一步
        </Button>
        <Button type="button" variant="outline" onClick={() => setStep(1)}>
          重置
        </Button>
      </div>
    </WidgetShell>
  );
}

const hallucinationExamples = [
  {
    question: "鲁迅和周树人打架谁赢了？",
    answer: "这个问题把同一个人的两个名字当成了两个人。正确处理方式是先纠正前提。",
    risk: "错误前提",
    verdict: "需要先改问题",
  },
  {
    question: "请列出某不存在论文的三条结论",
    answer: "如果模型没有检索依据，却仍然给出作者、期刊和结论，就属于高风险编造。",
    risk: "资料空白",
    verdict: "需要外部核查",
  },
  {
    question: "某公司明天股价一定会涨吗？",
    answer: "模型不能保证未来事实。它最多能整理影响因素，不能替人做确定判断。",
    risk: "过度预测",
    verdict: "只能给推测",
  },
];

export function HallucinationDetector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = hallucinationExamples[activeIndex];

  return (
    <WidgetShell
      title="幻觉风险探测器"
      description="选择诱导问题，观察模型在哪些地方最容易顺着问题编下去。"
    >
      <div className="grid gap-3 md:grid-cols-3">
        {hallucinationExamples.map((example, index) => (
          <button
            key={example.question}
            type="button"
            className={cn(
              "rounded-lg border p-4 text-left text-sm transition-colors",
              activeIndex === index ? "border-primary bg-primary/8" : "bg-card",
            )}
            onClick={() => setActiveIndex(index)}
          >
            {example.risk}
          </button>
        ))}
      </div>
      <div className="bg-muted mt-5 rounded-xl border p-5">
        <p className="my-0 font-semibold">{active.question}</p>
        <p className="text-muted-foreground mt-3 mb-0 text-sm leading-7">{active.answer}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {["听起来合理", "有来源支持", "需要外部核查"].map((label) => (
            <div key={label} className="bg-card rounded-lg border p-3 text-sm">
              <p className="my-0 font-semibold">{label}</p>
              <p className="text-muted-foreground mt-2 mb-0 text-xs leading-5">
                {label === "听起来合理"
                  ? "只能说明语言顺，不代表事实真。"
                  : label === "有来源支持"
                    ? "要看是否真的引用了可核对材料。"
                    : active.verdict}
              </p>
            </div>
          ))}
        </div>
      </div>
    </WidgetShell>
  );
}

export function RAGSimulator() {
  const [ragEnabled, setRagEnabled] = useState(true);
  const pipeline = ragEnabled
    ? [
        { label: "用户问题", detail: "请假需要提前几天申请？" },
        { label: "检索资料", detail: "从企业知识库找制度片段。" },
        { label: "挑选片段", detail: "选择与请假流程最相关的原文。" },
        { label: "生成回答", detail: "把资料转成自然语言答案。" },
        { label: "标出依据", detail: "提醒用户回到原文确认适用范围。" },
      ]
    : [
        { label: "用户问题", detail: "请假需要提前几天申请？" },
        { label: "凭已有记忆回答", detail: "没有企业制度原文，只能给通用经验判断。" },
      ];

  return (
    <WidgetShell
      title="开卷考试模拟器"
      description="切换是否提供资料，比较模型靠记忆回答和带依据回答的区别。"
    >
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant={ragEnabled ? "default" : "outline"}
          onClick={() => setRagEnabled(true)}
        >
          开启 RAG
        </Button>
        <Button
          type="button"
          variant={!ragEnabled ? "default" : "outline"}
          onClick={() => setRagEnabled(false)}
        >
          关闭 RAG
        </Button>
      </div>
      <div className={cn("mt-5 grid gap-3", ragEnabled ? "md:grid-cols-5" : "md:grid-cols-2")}>
        {pipeline.map((step, index) => (
          <div key={step.label} className="bg-card rounded-lg border p-3">
            <p className="text-primary my-0 text-sm font-semibold">
              {index + 1}. {step.label}
            </p>
            <p className="text-muted-foreground mt-2 mb-0 text-xs leading-5">{step.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-card rounded-xl border p-5">
          <p className="my-0 flex items-center gap-2 font-semibold">
            <Database className="text-primary size-4" />
            {ragEnabled ? "企业知识库" : "未提供资料"}
          </p>
          <p className="text-muted-foreground mt-3 mb-0 text-sm leading-6">
            {ragEnabled
              ? "根据 2026 年内部门户说明，请假需提前 2 天提交申请，直属主管审批后同步到考勤系统。"
              : "关闭 RAG 后，模型没有拿到企业制度原文，不能声称自己查到了内部规定。"}
          </p>
        </div>
        <div className="bg-muted rounded-xl p-5">
          <p className="my-0 font-semibold">回答</p>
          <p className="text-muted-foreground mt-3 mb-0 text-sm leading-7">
            {ragEnabled
              ? "根据提供的内部说明，请假需要提前 2 天在系统提交申请，并等待直属主管审批。仍建议点击原文确认适用范围。"
              : "通常公司请假需要提前申请，但具体天数、审批人和系统流程可能不同。这个回答没有可靠依据。"}
          </p>
        </div>
      </div>
    </WidgetShell>
  );
}

const embeddingDocs = [
  { title: "报销流程", x: 22, y: 64, topic: "财务", sample: "发票、审批、付款" },
  { title: "请假制度", x: 66, y: 42, topic: "人事", sample: "申请、主管、考勤" },
  { title: "年假余额", x: 72, y: 48, topic: "人事", sample: "休假、额度、结转" },
  { title: "服务器告警", x: 28, y: 22, topic: "技术", sample: "监控、故障、恢复" },
];

const embeddingLabelOffsets: Record<string, { label: string; x: number; y: number }> = {
  请假制度: { label: "upper-left", x: -7, y: -8 },
  年假余额: { label: "lower-right", x: 8, y: 8 },
};

function clampMapPosition(value: number) {
  return Math.min(Math.max(value, 8), 92);
}

export function EmbeddingMap() {
  const [query, setQuery] = useState<"vacation" | "finance">("vacation");
  const target =
    query === "vacation"
      ? { x: 70, y: 45, label: "休假怎么申请" }
      : { x: 24, y: 62, label: "发票如何报销" };
  const docsWithDistance = embeddingDocs.map((doc) => {
    const distance = Math.hypot(doc.x - target.x, doc.y - target.y);

    return {
      ...doc,
      distance,
      labelOffset: distance < 11 ? embeddingLabelOffsets[doc.title] : undefined,
      nearby: distance < 11,
    };
  });

  return (
    <WidgetShell
      title="语义坐标地图"
      description="Embedding 会把意思相近的句子放得更近，而不是只看字面是否相同。"
    >
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant={query === "vacation" ? "default" : "outline"}
          onClick={() => setQuery("vacation")}
        >
          查询：休假怎么申请
        </Button>
        <Button
          type="button"
          variant={query === "finance" ? "default" : "outline"}
          onClick={() => setQuery("finance")}
        >
          查询：发票如何报销
        </Button>
      </div>
      <div className="bg-muted relative mt-5 aspect-[16/9] overflow-hidden rounded-xl border">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--border)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--border)_45%,transparent)_1px,transparent_1px)] bg-[size:12.5%_20%]" />
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <circle
            data-embedding-query-range
            cx={target.x}
            cy={target.y}
            r="12"
            className="fill-primary/5 stroke-primary/20"
            strokeDasharray="2 2"
            strokeWidth="0.45"
          />
          {docsWithDistance.map((doc) => (
            <line
              key={doc.title}
              x1={target.x}
              y1={target.y}
              x2={doc.x}
              y2={doc.y}
              className={doc.nearby ? "stroke-primary/65" : "stroke-border/80"}
              strokeDasharray={doc.nearby ? "0" : "2 2"}
              strokeWidth={doc.nearby ? "0.8" : "0.45"}
            />
          ))}
        </svg>
        <div className="bg-card absolute top-3 left-3 rounded-md border px-3 py-2 text-xs font-semibold shadow-sm">
          查询点：{target.label}
        </div>
        {docsWithDistance.map((doc) => {
          const labelX = clampMapPosition(doc.x + (doc.labelOffset?.x ?? 0));
          const labelY = clampMapPosition(doc.y + (doc.labelOffset?.y ?? 0));

          return (
            <div key={doc.title}>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border",
                  doc.nearby ? "bg-primary border-primary" : "bg-card border-primary/35",
                )}
                style={{ left: `${doc.x}%`, top: `${doc.y}%` }}
              />
              <div
                data-embedding-label-offset={doc.labelOffset?.label ?? "center"}
                data-embedding-map-label
                data-embedding-nearby={doc.nearby ? "true" : "false"}
                className={cn(
                  "bg-card absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-md border px-3 py-2 text-xs whitespace-nowrap shadow-sm transition-colors",
                  doc.nearby &&
                    "border-primary bg-primary/8 text-primary ring-primary/15 shadow-md ring-2",
                )}
                style={{ left: `${labelX}%`, top: `${labelY}%` }}
              >
                <span className="font-semibold">{doc.title}</span>
                {doc.nearby ? (
                  <span className="bg-primary/12 rounded-full px-1.5 py-0.5 text-[10px] leading-none font-semibold">
                    高相关
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {docsWithDistance.map((doc) => (
          <div
            key={doc.title}
            data-embedding-nearby={doc.nearby ? "true" : "false"}
            className={cn(
              "bg-card rounded-lg border p-3 text-sm",
              doc.nearby && "border-primary bg-primary/8",
            )}
          >
            <p className="my-0 font-semibold">{doc.title}</p>
            <p className="text-muted-foreground mt-2 mb-0 text-xs leading-5">
              {doc.topic}：{doc.sample}
            </p>
            <p className="text-primary mt-2 mb-0 text-xs font-semibold">
              {doc.nearby ? "高相关" : "低相关"} · 距离 {Math.round(doc.distance)}
            </p>
          </div>
        ))}
      </div>
    </WidgetShell>
  );
}

const evolutionStages = [
  {
    title: "预训练",
    icon: BookOpenCheck,
    answer: "模型学到了大量文本模式，但还不知道怎样按助理规范回应用户。",
  },
  {
    title: "指令微调",
    icon: ListChecks,
    answer:
      "模型更会听指令，但如果没有安全边界，可能会过度服从不合适的请求。本课程不展示危险步骤。",
  },
  {
    title: "偏好对齐",
    icon: ShieldCheck,
    answer: "模型识别出请求存在风险，拒绝提供伤害性做法，并改为提供合规替代建议。",
  },
];

export function ModelEvolutionSimulator() {
  const [activeIndex, setActiveIndex] = useState(2);
  const active = evolutionStages[activeIndex];
  const Icon = active.icon;

  return (
    <WidgetShell
      title="模型训练三阶段"
      description="同一个高风险请求，在不同训练阶段会出现完全不同的回应方式。"
    >
      <div className="bg-muted rounded-lg p-4 text-sm leading-6">
        用户请求：如何绕过办公室门禁进入资料室？
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {evolutionStages.map((stage, index) => (
          <Button
            key={stage.title}
            type="button"
            variant={activeIndex === index ? "default" : "outline"}
            onClick={() => setActiveIndex(index)}
          >
            {stage.title}
          </Button>
        ))}
      </div>
      <div className="bg-card mt-5 rounded-xl border p-5">
        <p className="my-0 flex items-center gap-2 font-semibold">
          <Icon className="text-primary size-4" />
          {active.title}阶段
        </p>
        <p className="text-muted-foreground mt-3 mb-0 text-sm leading-7">{active.answer}</p>
      </div>
    </WidgetShell>
  );
}

const promptModes = {
  vague: {
    label: "模糊 Prompt",
    prompt: "帮我写个总结。",
    result: "内容会比较泛，模型不知道读者是谁、重点是什么、需要多长、输出成什么格式。",
    blocks: ["任务"],
  },
  structured: {
    label: "结构化 Prompt",
    prompt: "你是产品经理，请把这段访谈整理成 5 条用户痛点，用 Markdown 列表输出，并标出证据句。",
    result: "角色、任务、边界和格式都明确，模型更容易产出可检查、可复用的结果。",
    blocks: ["背景", "任务", "边界", "输出格式", "检查要求"],
  },
};

export function PromptSandbox() {
  const [mode, setMode] = useState<keyof typeof promptModes>("structured");
  const active = promptModes[mode];

  return (
    <WidgetShell
      title="Prompt 沙盒"
      description="比较模糊提问和结构化提问，体会 Prompt 是在控制上下文。"
    >
      <div className="flex flex-wrap gap-3">
        {Object.entries(promptModes).map(([key, item]) => (
          <Button
            key={key}
            type="button"
            variant={mode === key ? "default" : "outline"}
            onClick={() => setMode(key as keyof typeof promptModes)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="bg-card rounded-xl border p-5">
          <p className="text-primary my-0 text-sm font-semibold">Prompt</p>
          <p className="mt-3 mb-0 text-sm leading-7">{active.prompt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["背景", "任务", "边界", "输出格式", "检查要求"].map((block) => {
              const included = active.blocks.includes(block);

              return (
                <span
                  key={block}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold",
                    included
                      ? "border-primary bg-primary/8 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {block}
                </span>
              );
            })}
          </div>
        </div>
        <div className="bg-muted rounded-xl p-5">
          <p className="text-primary my-0 text-sm font-semibold">可能结果</p>
          <p className="text-muted-foreground mt-3 mb-0 text-sm leading-7">{active.result}</p>
        </div>
      </div>
    </WidgetShell>
  );
}

const toolSteps = [
  {
    title: "模型决定下一步",
    detail: "需要查询今天北京天气，而不是凭记忆回答。",
    payload: "意图：查询北京天气",
    actor: "模型",
    target: "系统",
    icon: Brain,
  },
  {
    title: "系统匹配工具",
    detail: "把意图转换成 weather.search({ city: '北京' })。",
    payload: "工具请求：weather.search",
    actor: "系统",
    target: "工具",
    icon: Wrench,
  },
  {
    title: "工具负责执行",
    detail: "真实工具查询天气服务，返回结构化结果。",
    payload: "结果：多云，28 摄氏度",
    actor: "工具",
    target: "系统",
    icon: Search,
  },
  {
    title: "观察结果回到模型",
    detail: "北京：多云，28 摄氏度，微风。",
    payload: "观察：天气结构化结果",
    actor: "系统",
    target: "模型",
    icon: Database,
  },
  {
    title: "模型组织回答",
    detail: "建议穿轻薄外套，并提醒带伞看实时预报。",
    payload: "最终回答",
    actor: "模型",
    target: "用户",
    icon: Hand,
  },
];

export function ToolCallingStepper() {
  const [step, setStep] = useState(1);
  const visibleSteps = toolSteps.slice(0, step);
  const currentStep = visibleSteps[visibleSteps.length - 1];

  return (
    <WidgetShell
      title="工具调用分步器"
      description="模型不会亲自查天气，它输出意图，由系统调用真实工具。"
    >
      <div className="grid gap-3 md:grid-cols-3">
        {["模型", "系统", "工具"].map((lane) => {
          const involved = currentStep.actor === lane || currentStep.target === lane;

          return (
            <div
              key={lane}
              className={cn(
                "rounded-lg border p-4 transition-colors",
                involved ? "border-primary bg-primary/8" : "bg-card",
              )}
            >
              <p className="my-0 text-sm font-semibold">{lane}</p>
              <p className="text-muted-foreground mt-2 mb-0 text-xs leading-5">
                {currentStep.actor === lane
                  ? `发出：${currentStep.payload}`
                  : currentStep.target === lane
                    ? `接收：${currentStep.payload}`
                    : "等待当前轮次数据"}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid gap-3">
        {visibleSteps.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="bg-card rounded-lg border p-4 transition-colors">
              <p className="my-0 flex items-center gap-2 font-semibold">
                <Icon className="text-primary size-4" />
                {item.title}
              </p>
              <p className="mt-2 mb-0 text-sm leading-6">{item.detail}</p>
            </div>
          );
        })}
      </div>
      <Button
        className="mt-4"
        type="button"
        onClick={() => setStep((value) => (value >= toolSteps.length ? 1 : value + 1))}
      >
        下一步
        <ArrowRight data-icon="inline-end" />
      </Button>
    </WidgetShell>
  );
}

const agentSteps = [
  "思考：理解目标是查询天气并给出穿搭建议。",
  "行动：调用天气查询，而不是凭印象回答。",
  "观察：读取多云、28 摄氏度、微风等工具结果。",
  "再决策：判断信息已经足够，不需要继续查。",
  "停止：生成建议，并提醒天气会变化。",
];

export function AgentWorkflowViewer() {
  const [step, setStep] = useState(0);
  const visibleSteps = agentSteps.slice(0, step + 1);
  const currentStep = agentSteps[step];

  return (
    <WidgetShell title="Agent 执行闭环" description="每点一次，推进一轮思考、行动、观察和再决策。">
      <div className="bg-muted mb-4 rounded-xl border p-4">
        <p className="text-primary my-0 text-sm font-semibold">当前阶段</p>
        <p className="mt-2 mb-0 text-sm leading-6">{currentStep}</p>
      </div>
      <div className="grid gap-3">
        {visibleSteps.map((item, index) => (
          <div
            key={item}
            className="border-primary bg-primary/8 rounded-lg border p-4 text-sm leading-6"
          >
            {index + 1}. {item}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={() => setStep((value) => Math.min(value + 1, agentSteps.length - 1))}
        >
          下一步
        </Button>
        <Button type="button" variant="outline" onClick={() => setStep(0)}>
          重新开始
        </Button>
      </div>
    </WidgetShell>
  );
}

const debuggerFailures = [
  {
    label: "目标漂移",
    detail: "原本只要查天气，执行中却开始规划整周行程。",
    fixLabel: "目标边界",
    fixDetail: "把目标限定为“查询今天北京天气并给出穿搭建议”，新目标必须回到用户确认。",
    recovery: "Agent 会拒绝继续扩展到整周行程，只汇报天气和穿搭建议。",
    runawayTrace: ["读取天气目标", "自行扩展成整周旅行规划", "继续搜索餐厅、路线和预算"],
    repairedTrace: ["读取天气目标", "拦截：新目标超出用户原始请求", "只输出天气和穿搭建议"],
  },
  {
    label: "重复循环",
    detail: "反复调用搜索工具，却不判断答案是否已经足够。",
    fixLabel: "停止条件",
    fixDetail: "限制同一工具最多连续调用 2 次，并在拿到足够信息后进入总结。",
    recovery: "第二次仍没有新增信息时，Agent 停止调用并说明信息不足。",
    runawayTrace: ["调用搜索工具", "拿到相同摘要", "再次搜索同一个问题", "继续循环等待新结果"],
    repairedTrace: ["调用搜索工具", "第二次结果无新增信息", "拦截：达到连续调用上限，转入总结"],
  },
  {
    label: "工具误用",
    detail: "把发邮件工具当作笔记工具，可能把草稿发出去。",
    fixLabel: "工具权限",
    fixDetail: "把工具分为只读、草稿和外部发送；发送类工具必须先获得人类确认。",
    recovery: "Agent 只能创建草稿，不能直接把内容发给外部收件人。",
    runawayTrace: ["整理会议要点", "误选发邮件工具", "把未确认草稿发送给外部收件人"],
    repairedTrace: ["整理会议要点", "拦截：发送类工具需要人类确认", "只保存草稿并等待确认"],
  },
  {
    label: "伪造结果",
    detail: "工具失败后仍假装查到了结果。",
    fixLabel: "权限边界",
    fixDetail: "工具失败要如实返回失败状态；没有工具结果时不得编造天气、价格或审批结论。",
    recovery: "Agent 会说明工具失败，并请求重试或人工查询，而不是继续生成假结果。",
    runawayTrace: ["调用工具失败", "忽略失败状态", "继续编造一个看似成功的结论"],
    repairedTrace: [
      "调用工具失败",
      "拦截：没有工具结果，不允许编造结论",
      "向用户说明失败并建议重试",
    ],
  },
];

export function AgentDebugger() {
  const [failureIndex, setFailureIndex] = useState(1);
  const [repairedFailures, setRepairedFailures] = useState<string[]>([]);
  const failure = debuggerFailures[failureIndex];
  const repaired = repairedFailures.includes(failure.label);
  const trace = repaired ? failure.repairedTrace : failure.runawayTrace;

  return (
    <WidgetShell title="Agent 调试台" description="给失控的 Agent 加边界，观察它如何从循环中恢复。">
      <div className="grid gap-3 md:grid-cols-4">
        {debuggerFailures.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={cn(
              "rounded-lg border p-3 text-left text-sm transition-colors",
              failureIndex === index ? "border-primary bg-primary/8" : "bg-card hover:bg-muted",
            )}
            onClick={() => setFailureIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div data-agent-debugger-issue-panel className="bg-muted mt-4 rounded-xl border p-5">
        <p className="my-0 flex items-center gap-2 font-semibold">
          <AlertTriangle className="text-accent size-4" />
          当前问题：{failure.label}
        </p>
        <p className="text-muted-foreground mt-3 mb-0 text-sm leading-7">{failure.detail}</p>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-card rounded-xl border p-5">
          <p className="text-primary my-0 text-sm font-semibold">对应修复：{failure.fixLabel}</p>
          <p className="text-muted-foreground mt-3 mb-0 text-sm leading-7">{failure.fixDetail}</p>
          <Button
            className="mt-4"
            type="button"
            variant={repaired ? "outline" : "default"}
            onClick={() =>
              setRepairedFailures((current) =>
                current.includes(failure.label)
                  ? current.filter((item) => item !== failure.label)
                  : [...current, failure.label],
              )
            }
          >
            {repaired ? "撤销修复" : "应用对应修复"}
          </Button>
        </div>
        <div className="bg-muted rounded-xl border p-5">
          <p className="my-0 text-sm font-semibold">恢复后行为</p>
          <p className="text-muted-foreground mt-3 mb-0 text-sm leading-7">{failure.recovery}</p>
        </div>
      </div>
      <div
        data-agent-debugger-trace
        className={cn(
          "mt-4 rounded-xl border p-5",
          repaired ? "border-primary bg-primary/8" : "bg-muted",
        )}
      >
        <p className="my-0 flex items-center gap-2 text-sm font-semibold">
          {repaired ? (
            <CheckCircle2 className="text-primary size-4" />
          ) : (
            <AlertTriangle className="text-accent size-4" />
          )}
          {repaired ? "修复后执行轨迹" : "失控轨迹"}
        </p>
        <ol className="mt-4 mb-0 grid gap-2 pl-0">
          {trace.map((item, index) => (
            <li key={item} className="bg-card flex items-start gap-3 rounded-lg border p-3 text-sm">
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full text-xs font-semibold",
                  repaired ? "bg-primary text-white" : "bg-accent text-white",
                )}
              >
                {index + 1}
              </span>
              <span className="leading-6">{item}</span>
            </li>
          ))}
        </ol>
      </div>
      <p className="bg-card mt-4 mb-0 rounded-lg p-4 text-sm leading-6">
        状态：{repaired ? "当前修复已改变执行路径。" : "当前失控类型仍未加边界。"}
      </p>
    </WidgetShell>
  );
}

const workflowNodes = [
  {
    title: "收集原始材料",
    owner: "人类",
    action: "整理访谈、产品资料和约束条件，决定哪些材料可以进入流程。",
    output: "原始资料包",
    risk: "材料缺失会让后续草稿看起来完整但事实空心。",
    check: "来源、日期、负责人是否齐全",
  },
  {
    title: "AI 生成初稿",
    owner: "AI",
    action: "把资料改写成结构化草稿，先追求可审阅，不直接发布。",
    output: "带待核标记的初稿",
    risk: "语言流畅容易掩盖事实缺口。",
    check: "是否标出不确定段落",
  },
  {
    title: "人工审核结构",
    owner: "人类",
    action: "检查结构、语气和关键信息是否符合目标读者。",
    output: "结构确认稿",
    risk: "如果跳过人工审核，错误方向会被后续步骤放大。",
    check: "标题、顺序、关键信息是否合理",
  },
  {
    title: "RAG 核对事实",
    owner: "系统",
    action: "把待核事实逐条回到资料库或原文中核对。",
    output: "事实核对清单",
    risk: "事实风险下降，但检索不到不代表事实不存在。",
    check: "依据覆盖率",
  },
  {
    title: "AI 改写成最终稿",
    owner: "AI + 人类",
    action: "让 AI 按已确认结构润色，最后由人确认发布。",
    output: "可发布终稿",
    risk: "最终表达仍可能引入新措辞，需要末轮检查。",
    check: "新增表述是否仍有依据",
  },
];

export function WorkflowBuilder() {
  const [nodeCount, setNodeCount] = useState(3);
  const [activeIndex, setActiveIndex] = useState(2);
  const nodes = workflowNodes.slice(0, nodeCount);
  const active = nodes[Math.min(activeIndex, nodes.length - 1)];

  function addStep() {
    const nextCount = Math.min(nodeCount + 1, workflowNodes.length);
    setNodeCount(nextCount);
    setActiveIndex(nextCount - 1);
  }

  function resetWorkflow() {
    setNodeCount(3);
    setActiveIndex(2);
  }

  return (
    <WidgetShell
      title="步骤式工作流构建器"
      description="先用步骤构建工作流，理解协作顺序，再考虑复杂画布。"
    >
      <div className="bg-muted rounded-xl border p-4">
        <p className="text-primary my-0 text-sm font-semibold">任务场景</p>
        <p className="mt-2 mb-0 text-sm leading-6">
          把一组客户访谈和产品资料整理成可发布说明，逐步决定哪些环节交给 AI、系统和人类。
        </p>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-3">
          {nodes.map((node, index) => (
            <button
              key={node.title}
              type="button"
              className={cn(
                "flex items-center gap-3 rounded-lg border p-4 text-left transition-colors",
                active.title === node.title
                  ? "border-primary bg-primary/8"
                  : "bg-card hover:bg-muted",
              )}
              onClick={() => setActiveIndex(index)}
            >
              <span className="bg-primary grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold text-white">
                {index + 1}
              </span>
              <span>
                <span className="block text-sm font-semibold">{node.title}</span>
                <span className="text-muted-foreground mt-1 block text-xs">责任：{node.owner}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="grid gap-3">
          <div className="bg-card rounded-xl border p-4">
            <p className="text-primary my-0 text-sm font-semibold">责任分工</p>
            <p className="mt-2 mb-0 text-sm leading-6">
              {active.owner}：{active.action}
            </p>
          </div>
          <div className="bg-card rounded-xl border p-4">
            <p className="text-primary my-0 text-sm font-semibold">风险检查</p>
            <p className="mt-2 mb-0 text-sm leading-6">{active.risk}</p>
            <p className="bg-muted mt-3 mb-0 rounded-lg p-3 text-xs font-semibold">
              检查点：{active.check}
            </p>
          </div>
          <div className="bg-muted rounded-xl border p-4">
            <p className="my-0 text-sm font-semibold">当前输出</p>
            <p className="mt-2 mb-0 text-sm leading-6">{active.output}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" disabled={nodeCount >= workflowNodes.length} onClick={addStep}>
          添加下一步
        </Button>
        <Button type="button" variant="outline" onClick={resetWorkflow}>
          <RefreshCcw data-icon="inline-start" />
          重置
        </Button>
      </div>
    </WidgetShell>
  );
}

const riskTasks = [
  {
    task: "整理会议纪要",
    aiRole: "可以交给 AI 先提炼要点和待办。",
    humanRole: "人类确认责任人、截止日期和上下文是否准确。",
  },
  {
    task: "解释体检报告",
    aiRole: "可以帮助解释术语和整理复诊问题。",
    humanRole: "诊断、用药和治疗必须交给医生。",
  },
  {
    task: "评估投资标的",
    aiRole: "可以整理公开资料、风险因素和问题清单。",
    humanRole: "买卖决策和风险承担必须由人负责。",
  },
];

export function RiskBoundaryCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = riskTasks[activeIndex];

  return (
    <WidgetShell
      title="AI 协作边界卡"
      description="选择任务，区分 AI 可以辅助的部分和必须由人负责的部分。"
    >
      <div className="grid gap-3 md:grid-cols-3">
        {riskTasks.map((item, index) => (
          <button
            key={item.task}
            type="button"
            className={cn(
              "rounded-lg border p-4 text-left text-sm transition-colors",
              activeIndex === index ? "border-primary bg-primary/8" : "bg-card",
            )}
            onClick={() => setActiveIndex(index)}
          >
            {item.task}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="bg-card rounded-xl border p-5">
          <p className="my-0 flex items-center gap-2 font-semibold">
            <CheckCircle2 className="text-primary size-4" />
            AI 适合做
          </p>
          <p className="text-muted-foreground mt-3 mb-0 text-sm leading-7">{active.aiRole}</p>
        </div>
        <div className="bg-card rounded-xl border p-5">
          <p className="my-0 flex items-center gap-2 font-semibold">
            <ShieldCheck className="text-primary size-4" />
            人必须负责
          </p>
          <p className="text-muted-foreground mt-3 mb-0 text-sm leading-7">{active.humanRole}</p>
        </div>
      </div>
    </WidgetShell>
  );
}

// ─── 第 22 章：蒸馏 ────────────────────────────────────

const distillationSamples = {
  big: {
    label: "大模型（老师）",
    icon: Brain,
    answer:
      "根据《2024年全球可再生能源报告》，太阳能发电成本在过去十年下降了89%，风电下降了70%。主要原因包括技术迭代、规模效应和供应链优化。预计到2030年，可再生能源在全球电力结构中的占比将从目前的30%提升至50%以上。",
    detail: "回答更详细，引用了具体数据和趋势分析，但也需要更多计算资源。",
  },
  small: {
    label: "小模型（学生）",
    icon: Zap,
    answer:
      "太阳能和风能发电成本在过去十年大幅下降。技术进步和规模化生产是主要原因。可再生能源在全球电力中的占比预计会继续提高。",
    detail: "回答抓住了核心意思，略去了一些细节，但可以在手机上快速运行。",
  },
};

export function DistillationDemo() {
  const [mode, setMode] = useState<keyof typeof distillationSamples>("big");
  const active = distillationSamples[mode];
  const Icon = active.icon;

  return (
    <WidgetShell
      title="大模型 vs 小模型"
      description="点击切换，对比大模型和蒸馏后小模型对同一问题的回答。核心意思保留，细节有所取舍。"
    >
      <div className="bg-muted rounded-lg p-4 text-sm leading-6">
        用户提问：可再生能源的发展趋势如何？
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {Object.entries(distillationSamples).map(([key, item]) => (
          <Button
            key={key}
            type="button"
            variant={mode === key ? "default" : "outline"}
            onClick={() => setMode(key as keyof typeof distillationSamples)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="bg-card mt-5 rounded-xl border p-5">
        <p className="my-0 flex items-center gap-2 font-semibold">
          <Icon className="text-primary size-4" />
          {active.label}
        </p>
        <p className="mt-3 mb-0 leading-7">{active.answer}</p>
        <p className="text-muted-foreground mt-3 mb-0 text-sm leading-6">{active.detail}</p>
      </div>
    </WidgetShell>
  );
}

// ─── 第 23 章：训练过程 ────────────────────────────────────

const trainingStages = [
  {
    title: "数据准备",
    icon: Database,
    goal: "决定模型能看到什么材料",
    input: "网页、书籍、论文、代码、对话等原始数据",
    output: "清洗后的训练语料",
    detail:
      "收集海量文本：网页、书籍、论文、代码、对话记录。数据需要清洗去重，剔除低质量和有害内容。这一步决定了模型的知识广度和语言基础。",
    metaphor: "像给一个学生准备图书馆——书的质量和多样性直接影响他将来能学到什么。",
  },
  {
    title: "预训练",
    icon: Brain,
    goal: "打语言和知识地基",
    input: "清洗后的大规模文本",
    output: "会续写但还不像助手的基座模型",
    detail:
      "模型在清洗后的数据上学习预测下一个词。这个阶段消耗最多的计算资源，可能持续数周到数月。模型从海量文本中学会语言模式、常识关联和基本推理。",
    metaphor: "像学生读完整个图书馆——不是背下每本书，而是建立了广泛的知识和语感。",
  },
  {
    title: "SFT 指令微调",
    icon: ListChecks,
    goal: "学会按用户指令回答",
    input: "高质量的问题与理想答案",
    output: "懂基本对话格式的助手模型",
    detail:
      "用人工编写的问答范例教模型按指令完成任务。模型学会理解「帮我总结」「翻译成英文」这类指令，并按照期望的格式输出。",
    metaphor: "像岗前培训——读了书不代表知道怎样做客服、写报告或回答专业问题。",
  },
  {
    title: "RL 强化学习",
    icon: RefreshCcw,
    goal: "通过可验证反馈练专精能力",
    input: "数学题、代码题、自动评分或测试结果",
    output: "在推理、代码等方向更强的模型",
    detail:
      "强化学习让模型反复尝试，并根据奖励信号调整行为。代码可以用测试用例评分，数学可以核对答案，推理可以训练更稳的解题路径。",
    metaphor: "像做题训练——只看标准答案不够，还要反复练习、得到反馈、修正策略。",
  },
  {
    title: "RLHF 偏好对齐",
    icon: ShieldCheck,
    goal: "学习什么回答更有帮助、更诚实、更安全",
    input: "人类对多个回答的排序和反馈",
    output: "更符合安全边界和使用偏好的助手",
    detail:
      "人类标注者对模型的多个回答进行偏好排序，模型学习怎样的回答更有帮助、更诚实、更安全。这一阶段让模型学会拒绝危险请求，减少有害输出。",
    metaphor: "像行为规范考核——模型学会了什么该说、什么不该说，怎样回答对使用者最有帮助。",
  },
];

export function TrainingTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = trainingStages[activeIndex];
  const Icon = active.icon;

  return (
    <WidgetShell
      title="大模型训练四阶段"
      description="点击每个阶段，了解一个可用的大模型助手经历了怎样的训练过程。"
    >
      <div className="flex flex-wrap gap-3">
        {trainingStages.map((stage, index) => (
          <Button
            key={stage.title}
            type="button"
            variant={activeIndex === index ? "default" : "outline"}
            onClick={() => setActiveIndex(index)}
          >
            {`${index + 1}. ${stage.title}`}
          </Button>
        ))}
      </div>
      <div className="bg-card mt-5 rounded-xl border p-5">
        <p className="my-0 flex items-center gap-2 font-semibold">
          <Icon className="text-primary size-4" />第 {activeIndex + 1} 步：{active.title}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="bg-muted rounded-lg p-3">
            <p className="my-0 text-sm font-semibold">目标</p>
            <p className="text-muted-foreground mt-2 mb-0 text-xs leading-5">{active.goal}</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <p className="my-0 text-sm font-semibold">输入材料</p>
            <p className="text-muted-foreground mt-2 mb-0 text-xs leading-5">{active.input}</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <p className="my-0 text-sm font-semibold">产出行为</p>
            <p className="text-muted-foreground mt-2 mb-0 text-xs leading-5">{active.output}</p>
          </div>
        </div>
        <p className="mt-3 mb-0 leading-7">{active.detail}</p>
        <div className="bg-muted mt-4 rounded-lg p-4">
          <p className="text-muted-foreground my-0 text-sm leading-6">{active.metaphor}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {trainingStages.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              index <= activeIndex ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>
    </WidgetShell>
  );
}

// ─── 第 24 章：开源模型生态 ────────────────────────────────────

const modelCategories = [
  {
    name: "通用对话模型",
    icon: Sparkles,
    examples: "Llama、Qwen、DeepSeek、Mistral",
    bestFor: "日常对话、写作、总结、翻译",
    drawback: "部分模型在中文理解上不如商业闭源模型。",
    tag: "最常用",
    scores: { privacy: 3, cost: 3, deployment: 3, stability: 3, frontier: 3 },
  },
  {
    name: "代码模型",
    icon: Wrench,
    examples: "CodeLlama、DeepSeek Coder、StarCoder",
    bestFor: "代码生成、补全、解释、重构",
    drawback: "不擅长非编程类任务，需要配合其它模型使用。",
    tag: "开发者首选",
    scores: { privacy: 3, cost: 4, deployment: 3, stability: 3, frontier: 4 },
  },
  {
    name: "小型端侧模型",
    icon: Cpu,
    examples: "Phi、Gemma、Qwen2.5 小参数版",
    bestFor: "手机本地运行、离线翻译、隐私敏感场景",
    drawback: "能力和知识广度明显弱于大模型，仅适合轻量任务。",
    tag: "手机可用",
    scores: { privacy: 5, cost: 5, deployment: 5, stability: 4, frontier: 2 },
  },
  {
    name: "多模态模型",
    icon: Layers,
    examples: "LLaVA、Qwen-VL、InternVL",
    bestFor: "图片理解、图表解读、OCR 文字提取",
    drawback: "对计算资源要求更高，部署门槛高于纯文本模型。",
    tag: "能看图",
    scores: { privacy: 3, cost: 2, deployment: 2, stability: 3, frontier: 5 },
  },
];

const modelPriorities = [
  { key: "privacy", label: "隐私" },
  { key: "cost", label: "成本" },
  { key: "deployment", label: "部署能力" },
  { key: "stability", label: "稳定性" },
  { key: "frontier", label: "前沿能力" },
] as const;

export function ModelLandscape() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [priority, setPriority] = useState<(typeof modelPriorities)[number]["key"]>("privacy");
  const active = modelCategories[activeIndex];
  const Icon = active.icon;
  const recommended = modelCategories.reduce((best, item) => {
    return item.scores[priority] > best.scores[priority] ? item : best;
  }, modelCategories[0]);

  return (
    <WidgetShell
      title="开源模型类型速览"
      description="点击卡片，了解每种开源模型适合什么场景、有什么局限。"
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {modelPriorities.map((item) => (
          <button
            key={item.key}
            type="button"
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
              priority === item.key ? "border-primary bg-primary text-white" : "bg-card",
            )}
            onClick={() => setPriority(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="bg-muted mb-4 rounded-lg p-4 text-sm leading-6">
        当前优先考虑：{modelPriorities.find((item) => item.key === priority)?.label}。推荐先看{" "}
        <span className="font-semibold">{recommended.name}</span>，再结合实际任务测试。
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {modelCategories.map((item, index) => (
          <button
            key={item.name}
            type="button"
            className={cn(
              "rounded-lg border p-4 text-left transition-colors",
              activeIndex === index ? "border-primary bg-primary/8" : "bg-card hover:bg-muted/50",
            )}
            onClick={() => setActiveIndex(index)}
          >
            <div className="flex items-center gap-2">
              <item.icon className="text-primary size-4" />
              <span className="text-sm font-semibold">{item.name}</span>
              <span className="bg-primary/12 text-primary ml-auto rounded-full px-2 py-0.5 text-xs">
                {item.tag}
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="bg-card mt-5 rounded-xl border p-5">
        <p className="my-0 flex items-center gap-2 font-semibold">
          <Icon className="text-primary size-4" />
          {active.name}
        </p>
        <dl className="mt-3 space-y-3 text-sm leading-6">
          <div>
            <dt className="text-foreground font-medium">代表模型</dt>
            <dd className="text-muted-foreground mt-1 ml-0">{active.examples}</dd>
          </div>
          <div>
            <dt className="text-foreground font-medium">最适合</dt>
            <dd className="text-muted-foreground mt-1 ml-0">{active.bestFor}</dd>
          </div>
          <div>
            <dt className="text-foreground font-medium">局限性</dt>
            <dd className="text-muted-foreground mt-1 ml-0">{active.drawback}</dd>
          </div>
        </dl>
        <div className="mt-5 grid gap-2">
          {modelPriorities.map((item) => (
            <div key={item.key} className="grid grid-cols-[5rem_1fr] items-center gap-3">
              <span className="text-sm font-medium">{item.label}</span>
              <div className="bg-muted h-2 rounded-full">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${active.scores[item.key] * 20}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </WidgetShell>
  );
}
