/**
 * Learn-LLM 术语表
 *
 * 收录 24 章中出现的核心术语，按拼音排序。
 * 每条术语包含：中文名、英文名、一句话解释、所在章节。
 */

export type GlossaryTerm = {
  /** 中文术语 */
  zh: string;
  /** 英文术语 */
  en: string;
  /** 一句话解释（面向普通读者） */
  definition: string;
  /** 首次出现或主要讲解的章节 slug */
  chapter: string;
  /** 所属分类 */
  category: "基础概念" | "生成机制" | "可靠性" | "提示与交互" | "Agent与工具" | "训练与模型";
};

export const glossaryTerms: GlossaryTerm[] = [
  // ── 基础概念 ──
  {
    zh: "AI（人工智能）",
    en: "Artificial Intelligence",
    definition:
      "让机器完成过去需要人类判断、识别、表达、规划或决策的任务。不是某一个具体技术，而是一类目标。",
    chapter: "chapter-01",
    category: "基础概念",
  },
  {
    zh: "机器学习",
    en: "Machine Learning (ML)",
    definition:
      "实现 AI 的一种主流方法：不是把所有规则写死，而是让机器从大量带有答案的例子中归纳规律。",
    chapter: "chapter-02",
    category: "基础概念",
  },
  {
    zh: "深度学习",
    en: "Deep Learning",
    definition:
      "机器学习中的一种强力方法：用多层神经网络从数据中逐层提取特征，特别适合图像、语音、语言等复杂任务。",
    chapter: "chapter-03",
    category: "基础概念",
  },
  {
    zh: "大模型",
    en: "Large Language Model (LLM)",
    definition:
      "深度学习在海量数据和巨大参数规模上的结果，尤其擅长处理语言、图像、代码和多步骤任务。GPT、Claude、Gemini 等都属于大模型。",
    chapter: "chapter-01",
    category: "基础概念",
  },
  {
    zh: "GPT",
    en: "Generative Pre-trained Transformer",
    definition:
      "生成式预训练 Transformer。一种大模型路线，核心思路是“根据前文预测后文”，把许多任务转化为上下文中的连续生成。",
    chapter: "chapter-04",
    category: "基础概念",
  },
  {
    zh: "Transformer",
    en: "Transformer",
    definition:
      "支撑现代大模型的重要网络结构，擅长处理序列数据中的长距离依赖关系，是 GPT 等技术路线的底层架构。",
    chapter: "chapter-04",
    category: "基础概念",
  },
  {
    zh: "基座模型",
    en: "Base Model",
    definition:
      "经过预训练但尚未经过指令微调和偏好对齐的模型。它能续写文本，但不一定会像助手一样按指令回答问题。",
    chapter: "chapter-23",
    category: "基础概念",
  },

  // ── 生成机制 ──
  {
    zh: "Token（词元）",
    en: "Token",
    definition:
      "大模型读写文字的基本单位。可以是一个汉字、一个英文单词、一段词根或一个标点。输入、输出、费用最终都绕不开 token。",
    chapter: "chapter-05",
    category: "生成机制",
  },
  {
    zh: "上下文窗口",
    en: "Context Window",
    definition:
      "模型当前能'摊开阅读'的材料范围。不是长期记忆，窗口外的内容模型看不到。系统指令、历史对话、外部资料都会占用窗口。",
    chapter: "chapter-06",
    category: "生成机制",
  },
  {
    zh: "Next-Token Prediction",
    en: "Next-Token Prediction",
    definition:
      "大模型生成文字的核心机制：给定前文，预测最可能的下一个 token。这个简单动作在大规模训练后能涌现出类似理解的表现。",
    chapter: "chapter-08",
    category: "生成机制",
  },
  {
    zh: "温度",
    en: "Temperature",
    definition:
      "控制模型选择候选 token 时的保守或发散程度。低温更稳定（适合事实核对），高温更多样（适合头脑风暴），但都不能替代事实核查。",
    chapter: "chapter-09",
    category: "生成机制",
  },
  {
    zh: "自回归生成",
    en: "Autoregressive Generation",
    definition:
      "模型先看已有上下文预测下一个 token，生成出来的 token 又成为新上下文，再预测下一个。一步步接下去形成完整回答。",
    chapter: "chapter-04",
    category: "生成机制",
  },
  {
    zh: "概率分布",
    en: "Probability Distribution",
    definition:
      "模型生成每一步时不是只有一个确定答案，而是得到一组候选 token 各自可能出现的概率。温度会影响这个分布的集中或平坦程度。",
    chapter: "chapter-09",
    category: "生成机制",
  },
  {
    zh: "Tokenizer（分词器）",
    en: "Tokenizer",
    definition:
      "将自然语言文本切分成 token 序列的工具。不同模型使用不同 tokenizer，所以同一段文字的切分结果可能不同。",
    chapter: "chapter-05",
    category: "生成机制",
  },

  // ── 可靠性 ──
  {
    zh: "幻觉",
    en: "Hallucination",
    definition:
      "模型把错误说得像真的：结构完整、语气自信、细节丰富，但其中某些事实、数字、引用或因果关系并不存在。危险在于错得很像真的。",
    chapter: "chapter-12",
    category: "可靠性",
  },
  {
    zh: "RAG（检索增强生成）",
    en: "Retrieval-Augmented Generation",
    definition:
      "给模型一场开卷考试：先把相关资料从知识库中检索出来，再把资料和问题一起交给模型生成回答。能降低幻觉，但不能保证绝对正确。",
    chapter: "chapter-13",
    category: "可靠性",
  },
  {
    zh: "Embedding（嵌入向量）",
    en: "Embedding",
    definition:
      "把文字转换成表示'意思位置'的数字向量。意思相近的内容在空间中靠近，意思不同的远离。是 RAG 检索资料的核心机制。",
    chapter: "chapter-14",
    category: "可靠性",
  },
  {
    zh: "对齐",
    en: "Alignment",
    definition:
      "让模型在有能力的同时，符合使用场景中的帮助性、诚实性和安全边界。知道什么时候该回答、什么时候该拒绝、什么时候该给安全替代方案。",
    chapter: "chapter-15",
    category: "可靠性",
  },
  {
    zh: "推理",
    en: "Reasoning",
    definition:
      "模型生成类似推理过程的分步骤文本。不等于人类思考，但分步骤表达可以让中间过程更可见、更可检查。关键不是'像不像人'，而是'能不能被检查'。",
    chapter: "chapter-10",
    category: "可靠性",
  },
  {
    zh: "事实核对",
    en: "Fact-Checking",
    definition:
      "对大模型输出中的关键事实进行外部验证。不是不相信模型，而是把生成和验证分开——模型负责组织语言，外部系统和人类负责确认事实。",
    chapter: "chapter-12",
    category: "可靠性",
  },

  // ── 提示与交互 ──
  {
    zh: "Prompt（提示词）",
    en: "Prompt",
    definition:
      "不是咒语，而是上下文控制。好的 Prompt 包含背景、任务、材料、边界、格式和检查要求，让模型少猜、让人类好查。",
    chapter: "chapter-16",
    category: "提示与交互",
  },
  {
    zh: "Workflow（工作流）",
    en: "Workflow",
    definition:
      "把复杂任务拆成 AI 生成、人类审核、事实核对和再生成的可检查步骤式流程。不追求一个万能 Prompt，而是让每步都有明确责任。",
    chapter: "chapter-20",
    category: "提示与交互",
  },
  {
    zh: "多轮对话",
    en: "Multi-turn Conversation",
    definition:
      "不是一次问答，而是多轮交互。每一轮的历史对话可能被带进下一轮的上下文窗口，既是连续对话的基础，也是成本累积的来源。",
    chapter: "chapter-06",
    category: "提示与交互",
  },
  {
    zh: "上下文管理",
    en: "Context Management",
    definition:
      "主动控制进入模型上下文窗口的内容：定期总结、重贴关键约束、拆阶段、保留外部来源。是长任务稳定性的关键习惯。",
    chapter: "chapter-06",
    category: "提示与交互",
  },

  // ── Agent 与工具 ──
  {
    zh: "Agent（智能体）",
    en: "Agent",
    definition:
      "围绕目标反复推进的执行系统：思考下一步、采取行动、观察结果、再决定下一步，直到完成或需要人类介入。核心是形成'思考-行动-观察-再决策'闭环。",
    chapter: "chapter-18",
    category: "Agent与工具",
  },
  {
    zh: "工具调用",
    en: "Tool Calling / Function Calling",
    definition:
      "不是模型长出了手，而是模型提出意图（'需要查天气'），外部系统负责执行工具，再把结果交回模型组织回答。模型是调度台，不是执行者。",
    chapter: "chapter-17",
    category: "Agent与工具",
  },
  {
    zh: "目标漂移",
    en: "Goal Drift",
    definition:
      "Agent 失控的一种常见形式：在执行过程中逐渐偏离原始目标，原任务被遗忘，资源消耗在无关方向上。需要明确的停止条件和目标检查。",
    chapter: "chapter-19",
    category: "Agent与工具",
  },
  {
    zh: "权限控制",
    en: "Permission Control / Access Control",
    definition:
      "限制 Agent 和工具调用范围的安全机制。不同工具应有不同权限级别，高风险操作需要人类确认、审计日志和可撤销设计。",
    chapter: "chapter-17",
    category: "Agent与工具",
  },
  {
    zh: "停止条件",
    en: "Stop Condition",
    definition:
      "定义 Agent 什么时候应该结束执行的条件。包括目标达成的标准、最大尝试次数、需要人类介入的触发点。没有停止条件的 Agent 可能无限循环。",
    chapter: "chapter-18",
    category: "Agent与工具",
  },

  // ── 训练与模型 ──
  {
    zh: "预训练",
    en: "Pre-training",
    definition:
      "大模型训练的第一阶段：在海量文本（网页、书籍、代码、论文等）上学习预测下一个 token，建立语言模式、常识关联和基础能力。",
    chapter: "chapter-23",
    category: "训练与模型",
  },
  {
    zh: "SFT（监督微调）",
    en: "Supervised Fine-Tuning",
    definition:
      "大模型训练的第二阶段：用大量'问题→理想答案'的示范数据训练模型遵循指令、按格式回答、理解用户意图。让模型从续写器变成助手。",
    chapter: "chapter-23",
    category: "训练与模型",
  },
  {
    zh: "RL（强化学习）",
    en: "Reinforcement Learning",
    definition:
      "大模型训练的第三阶段：在可验证任务（代码可跑测试、数学可核对答案）上通过奖励信号反复训练，提升模型在特定能力上的表现。",
    chapter: "chapter-23",
    category: "训练与模型",
  },
  {
    zh: "RLHF（基于人类反馈的强化学习）",
    en: "Reinforcement Learning from Human Feedback",
    definition:
      "大模型训练的第四阶段：根据人类偏好反馈训练模型——更有帮助、更诚实、更安全。帮助模型在风险请求中拒绝，在不确定时保守。",
    chapter: "chapter-23",
    category: "训练与模型",
  },
  {
    zh: "蒸馏",
    en: "Distillation / Knowledge Distillation",
    definition:
      "让大模型像老师一样输出高质量示范，小模型像学生一样学习这些示范。在牺牲部分能力的同时换来更低成本、更快速度和更易部署。",
    chapter: "chapter-22",
    category: "训练与模型",
  },
  {
    zh: "开源模型",
    en: "Open-Source Model",
    definition:
      "可以自由下载、本地部署、针对特定任务微调的模型（如 Llama、Qwen、DeepSeek）。优势是可控和可定制，但需要技术能力和硬件成本。",
    chapter: "chapter-24",
    category: "训练与模型",
  },
  {
    zh: "闭源商业模型",
    en: "Proprietary / Closed-Source Model",
    definition:
      "通过网页或 API 使用的商业模型（如 ChatGPT、Claude、Gemini）。优势是开箱即用、能力强、更新快，但数据需上传到外部平台。",
    chapter: "chapter-24",
    category: "训练与模型",
  },
  {
    zh: "端侧模型",
    en: "On-Device Model / Edge Model",
    definition:
      "可以在手机、浏览器、本地电脑上运行的小型模型。适合离线处理、隐私敏感、低延迟的轻量任务，但不适合复杂推理和广泛知识问答。",
    chapter: "chapter-22",
    category: "训练与模型",
  },
  {
    zh: "参数",
    en: "Parameters",
    definition:
      "模型内部可调整的数值，数量越大通常表示模型容量越大、能表达的模式越复杂。但不是参数越多就一定越好，后训练质量和评估同样重要。",
    chapter: "chapter-23",
    category: "训练与模型",
  },
];

/**
 * 按分类获取术语
 */
export function getGlossaryByCategory(): Map<string, GlossaryTerm[]> {
  const map = new Map<string, GlossaryTerm[]>();
  for (const term of glossaryTerms) {
    const list = map.get(term.category) ?? [];
    list.push(term);
    map.set(term.category, list);
  }
  return map;
}

/**
 * 按章节获取相关术语
 */
export function getTermsByChapter(slug: string): GlossaryTerm[] {
  return glossaryTerms.filter((t) => t.chapter === slug);
}
