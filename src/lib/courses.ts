export type CourseChapter = {
  slug: string;
  title: string;
  unit: string;
  description: string;
  order: number;
  estimatedMinutes: number;
};

export const learnLLMChapters: CourseChapter[] = [
  {
    slug: "chapter-01",
    title: "AI 到底是什么？",
    unit: "第一单元：AI 是怎么发展到大模型的",
    description: "用生活语言解释 AI、机器学习、深度学习和大模型的关系。",
    order: 1,
    estimatedMinutes: 8,
  },
  {
    slug: "chapter-02",
    title: "机器学习：让机器从例子里学经验",
    unit: "第一单元：AI 是怎么发展到大模型的",
    description: "对比传统程序和机器学习，理解机器如何从例子中总结规律。",
    order: 2,
    estimatedMinutes: 8,
  },
  {
    slug: "chapter-03",
    title: "深度学习：机器开始自己找重点",
    unit: "第一单元：AI 是怎么发展到大模型的",
    description: "用认猫的比喻解释深度学习为什么能自己发现重要特征。",
    order: 3,
    estimatedMinutes: 7,
  },
  {
    slug: "chapter-04",
    title: "大模型：把很多任务统一成“接下一句话”",
    unit: "第一单元：AI 是怎么发展到大模型的",
    description: "理解大模型如何通过学习语言间接学到知识和行为模式。",
    order: 4,
    estimatedMinutes: 9,
  },
  {
    slug: "chapter-05",
    title: "Token：大模型眼里的“文字积木”",
    unit: "第二单元：大模型为什么看起来会思考",
    description: "认识模型读写文字时使用的基本小块，理解生成回答的节奏。",
    order: 5,
    estimatedMinutes: 7,
  },
  {
    slug: "chapter-06",
    title: "为什么“接下一句话”能变成“像在理解”",
    unit: "第二单元：大模型为什么看起来会思考",
    description: "通过预测下一句话的小例子，看懂模型为什么会表现出理解感。",
    order: 6,
    estimatedMinutes: 9,
  },
  {
    slug: "chapter-07",
    title: "为什么大模型看起来会推理？",
    unit: "第二单元：大模型为什么看起来会思考",
    description: "理解模型如何从大量人类推理文本中学会一步步表达答案。",
    order: 7,
    estimatedMinutes: 8,
  },
  {
    slug: "chapter-08",
    title: "为什么它会胡说八道？",
    unit: "第二单元：大模型为什么看起来会思考",
    description: "区分“听起来合理”和“事实正确”，建立对幻觉风险的边界感。",
    order: 8,
    estimatedMinutes: 8,
  },
  {
    slug: "chapter-09",
    title: "Prompt：为什么提问方式会影响答案？",
    unit: "第三单元：大模型如何变成能做事的 Agent",
    description: "把 Prompt 理解成背景和方向，而不是神秘咒语。",
    order: 9,
    estimatedMinutes: 7,
  },
  {
    slug: "chapter-10",
    title: "Agent：让大模型从“会说”变成“会做”",
    unit: "第三单元：大模型如何变成能做事的 Agent",
    description: "看懂模型、工具和反馈循环如何组合成能执行任务的 Agent。",
    order: 10,
    estimatedMinutes: 10,
  },
  {
    slug: "chapter-11",
    title: "为什么 Agent 会不稳定？",
    unit: "第三单元：大模型如何变成能做事的 Agent",
    description: "理解 Agent 跑偏的常见原因，以及为什么需要明确边界和检查。",
    order: 11,
    estimatedMinutes: 8,
  },
  {
    slug: "chapter-12",
    title: "普通人怎么正确使用大模型？",
    unit: "第四单元：普通人如何正确使用大模型",
    description: "总结普通用户与大模型协作的方法，以及哪些答案必须核实。",
    order: 12,
    estimatedMinutes: 9,
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
