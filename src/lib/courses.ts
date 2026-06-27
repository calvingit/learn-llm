export type CourseChapter = {
  slug: string;
  title: string;
  unit: string;
  description: string;
  order: number;
};

export const learnLLMChapters: CourseChapter[] = [
  {
    slug: "chapter-01",
    title: "AI 到底是什么？",
    unit: "第一单元：AI 是怎么发展到大模型的",
    description: "建立 AI、机器学习、深度学习和大模型之间的包含关系。",
    order: 1,
  },
  {
    slug: "chapter-02",
    title: "机器学习：机器怎样从例子里学经验？",
    unit: "第一单元：AI 是怎么发展到大模型的",
    description: "对比规则程序和机器学习，理解机器如何从样本中归纳规律。",
    order: 2,
  },
  {
    slug: "chapter-03",
    title: "深度学习：为什么机器可以自己找特征？",
    unit: "第一单元：AI 是怎么发展到大模型的",
    description: "用识别图片的例子解释神经网络如何从数据中提取特征。",
    order: 3,
  },
  {
    slug: "chapter-04",
    title: "为什么 GPT 路线改变了世界？",
    unit: "第一单元：AI 是怎么发展到大模型的",
    description: "理解生成式路线为什么更适合对话、写作和通用任务。",
    order: 4,
  },
  {
    slug: "chapter-05",
    title: "Token：大模型眼里的文字积木",
    unit: "第二单元：大模型到底是怎么生成文字的",
    description: "认识模型读写文字时使用的基本小块，避免把文字当成完整句子理解。",
    order: 5,
  },
  {
    slug: "chapter-06",
    title: "上下文窗口：为什么长对话会忘记前面？",
    unit: "第二单元：大模型到底是怎么生成文字的",
    description: "理解模型一次只能看到有限内容，长对话需要管理上下文。",
    order: 6,
  },
  {
    slug: "chapter-07",
    title: "Token 账本：为什么长文本会变贵？",
    unit: "第二单元：大模型到底是怎么生成文字的",
    description: "把输入、输出、上下文和费用之间的关系讲清楚。",
    order: 7,
  },
  {
    slug: "chapter-08",
    title: "接下一句话：为什么预测下一个词能表现得像理解？",
    unit: "第二单元：大模型到底是怎么生成文字的",
    description: "通过预测下一个词的小游戏，建立 next-token prediction 的直觉。",
    order: 8,
  },
  {
    slug: "chapter-09",
    title: "温度与随机性：为什么同一个问题会有不同答案？",
    unit: "第二单元：大模型到底是怎么生成文字的",
    description: "理解 temperature 如何影响稳定性、发散性和创作感。",
    order: 9,
  },
  {
    slug: "chapter-10",
    title: "推理：它是真的在思考吗？",
    unit: "第三单元：大模型为什么会“思考”也会“胡说”",
    description: "解释推理能力的来源，同时避免把模型的表达误认为可靠事实。",
    order: 10,
  },
  {
    slug: "chapter-11",
    title: "更好的提问：如何让模型给出可检查的答案？",
    unit: "第三单元：大模型为什么会“思考”也会“胡说”",
    description: "把模糊提问改造成有步骤、有依据、可复核的提问。",
    order: 11,
  },
  {
    slug: "chapter-12",
    title: "幻觉：为什么它会一本正经地编？",
    unit: "第三单元：大模型为什么会“思考”也会“胡说”",
    description: "区分听起来合理和事实正确，建立对幻觉风险的边界感。",
    order: 12,
  },
  {
    slug: "chapter-13",
    title: "RAG：给 AI 一场开卷考试",
    unit: "第四单元：怎样让大模型更可靠",
    description: "理解检索增强生成如何降低幻觉、提供依据，但不能保证绝对正确。",
    order: 13,
  },
  {
    slug: "chapter-14",
    title: "Embedding：机器怎样按“意思”找资料？",
    unit: "第四单元：怎样让大模型更可靠",
    description: "用语义坐标解释向量检索，为理解 RAG 的资料查找过程打基础。",
    order: 14,
  },
  {
    slug: "chapter-15",
    title: "对齐：模型为什么会拒绝危险请求？",
    unit: "第四单元：怎样让大模型更可靠",
    description: "看懂预训练、指令微调和偏好对齐如何把模型训练成更可用的助手。",
    order: 15,
  },
  {
    slug: "chapter-16",
    title: "Prompt：不是咒语，而是控制上下文",
    unit: "第五单元：从 Prompt 到 Agent",
    description: "把 Prompt 理解为给模型设置背景、目标、边界和输出格式。",
    order: 16,
  },
  {
    slug: "chapter-17",
    title: "工具调用：模型怎样拥有“手”？",
    unit: "第五单元：从 Prompt 到 Agent",
    description: "解释模型本身只会输出文字，外部系统负责识别意图并调用工具。",
    order: 17,
  },
  {
    slug: "chapter-18",
    title: "Agent：大模型怎样循环做事？",
    unit: "第五单元：从 Prompt 到 Agent",
    description: "理解思考、行动、观察、再决策的执行闭环。",
    order: 18,
  },
  {
    slug: "chapter-19",
    title: "Agent 为什么会失控？",
    unit: "第五单元：从 Prompt 到 Agent",
    description: "认识工具滥用、目标丢失、伪造工具和循环失败等常见问题。",
    order: 19,
  },
  {
    slug: "chapter-20",
    title: "Workflow：不要追求一个万能 Prompt",
    unit: "第六单元：普通人如何正确使用大模型",
    description: "把复杂任务拆成 AI 生成、人类审核、事实校验和再生成。",
    order: 20,
  },
  {
    slug: "chapter-21",
    title: "AI 协作边界：哪些事能交给 AI，哪些必须人来负责？",
    unit: "第六单元：普通人如何正确使用大模型",
    description: "总结高收益使用场景和高风险复核边界，形成可执行的协作原则。",
    order: 21,
  },
  {
    slug: "chapter-22",
    title: "蒸馏：为什么小模型可以有大能力？",
    unit: "第七单元：如果你还想知道更多",
    description: "用老师教学生的比喻，理解大模型的知识如何浓缩到小模型中。",
    order: 22,
  },
  {
    slug: "chapter-23",
    title: "大模型是怎样训练出来的？",
    unit: "第七单元：如果你还想知道更多",
    description: "理解预训练与后训练的分工：SFT 教格式，RL 练专精，RLHF 定边界。",
    order: 23,
  },
  {
    slug: "chapter-24",
    title: "开源模型：除了 ChatGPT 还有什么选择？",
    unit: "第七单元：如果你还想知道更多",
    description: "认识主流开源模型类型，理解各自适合的场景和局限性。",
    order: 24,
  },
];

export function getChapterBySlug(slug: string): CourseChapter | undefined {
  return learnLLMChapters.find((chapter) => chapter.slug === slug);
}

export function getAdjacentChapters(slug: string): {
  previous?: CourseChapter;
  next?: CourseChapter;
} {
  const index = learnLLMChapters.findIndex((chapter) => chapter.slug === slug);

  if (index === -1) {
    return {};
  }

  return {
    previous: learnLLMChapters[index - 1],
    next: learnLLMChapters[index + 1],
  };
}
