export type QuizQuestion = {
  kind: "concept" | "scenario";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type UnitQuizData = {
  unit: string;
  nextChapterSlug: string;
  questions: QuizQuestion[];
};

export const unitQuizData: Record<string, UnitQuizData> = {
  "unit-01": {
    unit: "第一单元",
    nextChapterSlug: "chapter-05",
    questions: [
      {
        kind: "concept",
        question: "AI、机器学习、深度学习、大模型之间的关系是什么？",
        options: [
          "AI 包含机器学习，机器学习包含深度学习，大模型是深度学习的一种实现",
          "它们是并列的四种不同技术",
          "只有大模型属于 AI，其他都是传统技术",
          "机器学习和深度学习本质是一样的",
        ],
        correctIndex: 0,
        explanation:
          "AI 是总目标，机器学习是实现方法，深度学习是更强的机器学习，大模型是目前最强的一类深度学习实现。它们层层包含，每一层都基于前一层的基础。",
      },
      {
        kind: "concept",
        question: "GPT 路线与其他 AI 技术最大的不同是什么？",
        options: [
          "它比其他技术更聪明",
          "它把很多任务转化为「生成下一个文字」，让普通人用自然语言就能使用",
          "它只能用于聊天对话",
          "它不需要任何训练数据",
        ],
        correctIndex: 1,
        explanation:
          "GPT 路线的核心创新是将多种任务统一为文本生成——无论是翻译、总结还是问答，都变成「根据上下文预测下一个 token」。这让普通人无需编程就能与 AI 协作。",
      },
      {
        kind: "scenario",
        question: "遇到一个新 AI 产品时，应该优先判断什么？",
        options: [
          "它能不能取代人类的工作",
          "它解决什么任务、依赖什么能力、错误后果有多严重",
          "它的研发团队有多强",
          "它有没有比 ChatGPT 更好",
        ],
        correctIndex: 1,
        explanation:
          "建立判断框架：先看它解决什么任务（用途），再看它依赖什么能力（技术路线），最后评估错误后果有多严重（风险）。这比纠结「谁更强」更有实用价值。",
      },
    ],
  },
  "unit-02": {
    unit: "第二单元",
    nextChapterSlug: "chapter-10",
    questions: [
      {
        kind: "concept",
        question: "大模型「眼中」的文字单位是什么？",
        options: ["完整的句子", "单个汉字", "Token（文字积木）", "自然段落"],
        correctIndex: 2,
        explanation:
          "模型不读句子，它把文字切成 token 再处理。一个 token 可能是一个字、一个词或一个词的一部分。输入、输出、费用最终都绕不开 token。",
      },
      {
        kind: "scenario",
        question: "一段长对话开始遗漏最早的要求时，最合理的处理是什么？",
        options: [
          "继续追加消息，模型会自动恢复所有历史内容",
          "整理关键约束和阶段摘要，重新放入当前上下文",
          "把温度调高，让模型更容易想起以前的内容",
          "删除当前问题，只保留最早的全部聊天记录",
        ],
        correctIndex: 1,
        explanation:
          "上下文窗口不是长期记忆。把关键约束和阶段摘要重新放入当前上下文，能减少窗口外信息丢失带来的偏移；温度不能恢复模型看不到的内容。",
      },
      {
        kind: "concept",
        question: "Temperature（温度）参数控制的是什么？",
        options: [
          "模型的聪明程度",
          "模型输出的随机性和多样性",
          "模型的运行速度",
          "模型能处理的文字长度上限",
        ],
        correctIndex: 1,
        explanation:
          "温度控制探索程度，不是聪明程度。低温输出稳定（适合事实核对），高温输出多样（适合头脑风暴）。降低温度并不能减少幻觉，事实核查需要其他手段。",
      },
    ],
  },
  "unit-03": {
    unit: "第三单元",
    nextChapterSlug: "chapter-13",
    questions: [
      {
        kind: "concept",
        question: "关于大模型的「推理」，以下哪个理解最准确？",
        options: [
          "模型像人类一样在真正地思考",
          "模型的推理是基于模式匹配的，可以涌现出类似思考的表现，但不等于人类思考",
          "模型完全没有推理能力，所有输出都是随机的",
          "模型的推理完全不可靠，不应该在任何场景使用",
        ],
        correctIndex: 1,
        explanation:
          "模型基于海量数据训练出的模式匹配能力，能表现得很像推理——分步骤、给理由、做比较。但这些步骤本身也可能是错的。把「看起来聪明」和「能被检查」分开，才是真正理解推理。",
      },
      {
        kind: "scenario",
        question: "模型总结合同后给出一个关键数字，但没有出处。下一步怎样追问最便于核验？",
        options: [
          "让模型用更确定的语气再说一次",
          "要求标出对应原文、资料缺口和独立验证方式",
          "让模型把答案扩写成更长的分析",
          "不断重问，选择出现次数最多的数字",
        ],
        correctIndex: 1,
        explanation:
          "验证型追问要把结论连接到原始材料，暴露不确定项，并给出独立核验动作。模型重复、自检或多数一致都不能替代原文和工具。",
      },
      {
        kind: "concept",
        question: "应对幻觉风险的正确态度是什么？",
        options: [
          "模型有幻觉，所以完全不要用",
          "完全相信模型的输出，因为它看起来很专业",
          "把输出分三层审视：表达是否顺 → 依据是否足 → 结论是否可用",
          "只要用最新版本的模型就不会有幻觉",
        ],
        correctIndex: 2,
        explanation:
          "流畅表达只是入场券，有依据才及格，能否用于真实决策还要看风险和责任。具体数字、年份、机构名——越具体越要核对来源。",
      },
    ],
  },
  "unit-04": {
    unit: "第四单元",
    nextChapterSlug: "chapter-16",
    questions: [
      {
        kind: "concept",
        question: "RAG（检索增强生成）的核心作用是什么？",
        options: [
          "让模型的回答速度变得更快",
          "给模型提供外部资料来参考，降低幻觉，但不能保证绝对正确",
          "让模型可以直接联网搜索",
          "提高模型的文学创作能力",
        ],
        correctIndex: 1,
        explanation:
          "RAG 给模型开卷考试——先检索相关资料，再基于资料生成回答。有据可查，但检索可能找错、资料可能过时、生成可能误解。RAG 降低幻觉，不消灭幻觉。",
      },
      {
        kind: "scenario",
        question: "员工问“病假需要什么证明”，系统只找到了“年假余额”。最准确的判断是什么？",
        options: [
          "都属于人事主题，所以检索已经成功",
          "语义相近不等于能回答问题，还要检查片段是否真正相关",
          "只要增加上下文窗口，错误片段就会变正确",
          "应该取消权限和时间过滤，让系统看到更多资料",
        ],
        correctIndex: 1,
        explanation:
          "Embedding 能找语义相近的候选，但“人事主题相近”不代表片段支持病假证明问题。还要检查相关性、适用范围、权限和更新时间。",
      },
      {
        kind: "concept",
        question: "「对齐」训练的主要目的是什么？",
        options: [
          "让模型运行得更快、更省电",
          "让模型学会拒绝危险请求，输出更有帮助和安全的内容",
          "让模型掌握更多领域的知识",
          "让模型只回答技术问题，不聊日常话题",
        ],
        correctIndex: 1,
        explanation:
          "对齐可以组合监督示范、偏好数据、安全训练、评估和系统防护，改善帮助性、诚实性与安全。RLHF 是其中一种方法，不代表全部对齐。",
      },
    ],
  },
  "unit-05": {
    unit: "第五单元",
    nextChapterSlug: "chapter-20",
    questions: [
      {
        kind: "concept",
        question: "Prompt 的本质是什么？",
        options: [
          "一种需要背诵的神秘咒语",
          "给模型设置背景、目标、边界和输出格式的上下文控制",
          "一个固定不变的模板",
          "模型的外观主题（皮肤）",
        ],
        correctIndex: 1,
        explanation:
          "Prompt 不是咒语，是上下文控制——告诉模型它是谁、要做什么、不能做什么、输出什么格式。说清楚这六件事（背景、任务、材料、边界、格式、检查），比华丽的措辞重要得多。",
      },
      {
        kind: "scenario",
        question: "模型说“我已经发送邮件”，但系统日志没有发送记录。最合理的判断是什么？",
        options: [
          "模型文字已经构成发送成功的证据",
          "外部系统可能没有执行工具，应以调用结果和审计日志为准",
          "只要模型再次确认，邮件就一定发送了",
          "工具调用不需要权限、错误处理或日志",
        ],
        correctIndex: 1,
        explanation:
          "模型可以提出调用意图，但真实执行由外部系统完成。是否成功要看工具返回值和审计日志；权限校验与错误处理不能靠模型自己声明。",
      },
      {
        kind: "concept",
        question: "Agent 的核心工作循环是什么？",
        options: [
          "提问 → 回答 → 结束",
          "思考 → 行动 → 观察结果 → 再决策",
          "等待指令 → 执行 → 等待下一个指令",
          "搜索资料 → 总结 → 输出",
        ],
        correctIndex: 1,
        explanation:
          "Agent 的执行闭环：思考该做什么、行动、观察结果、基于结果再决策。这个循环让 Agent 能处理多步骤任务，但也可能陷入目标漂移或重复循环——没有停止条件的 Agent 只是昂贵的死循环。",
      },
    ],
  },
  "unit-06": {
    unit: "第六单元",
    nextChapterSlug: "chapter-22",
    questions: [
      {
        kind: "concept",
        question: "Workflow 方法的核心做法是什么？",
        options: [
          "写一个超长的万能 Prompt，让模型一次完成所有任务",
          "把复杂任务拆成多步：AI 生成 → 人类审核 → 事实校验 → 再生成",
          "完全不用 AI，所有工作都由人类完成",
          "把所有事情都交给 AI，只检查最终结果",
        ],
        correctIndex: 1,
        explanation:
          "不要追求万能 Prompt。把任务拆成可检查的小步骤——收集材料、AI 草稿、人类审核、事实核对、改写定稿。每一步输入输出明确，错误更容易定位和修正。",
      },
      {
        kind: "scenario",
        question: "以下哪种做法违反了 AI 协作边界的原则？",
        options: [
          "让 AI 给一篇博客改语气",
          "让 AI 给出投资建议后直接照做，没有咨询专业人士",
          "用 AI 整理一份会议记录的要点",
          "让 AI 推荐一部适合周末看的电影",
        ],
        correctIndex: 1,
        explanation:
          "投资决策属于高风险场景。AI 可以提供信息和框架，但涉及健康、法律、财务、安全等领域的最终决定，必须有专业人类复核。不是 AI 不能碰这些领域，而是人类不能放弃判断责任。",
      },
      {
        kind: "concept",
        question: "判断一个任务是否适合交给 AI，关键看什么？",
        options: [
          "任务有多复杂",
          "答案是否容易验证、出错后是否容易撤回、是否涉及高风险领域",
          "任务需要多长时间完成",
          "其他人是不是也在用 AI 做类似的事",
        ],
        correctIndex: 1,
        explanation:
          "四个判断问题：答案容易验证吗？出错了容易撤回吗？涉及健康/法律/财务/安全/隐私吗？需要最新数据吗？按风险分层使用 AI，而不是一刀切地全用或全不用。",
      },
    ],
  },
  "unit-07": {
    unit: "第七单元",
    nextChapterSlug: "",
    questions: [
      {
        kind: "concept",
        question: "「蒸馏」技术用什么比喻来理解最贴切？",
        options: [
          "把水烧开变成蒸汽，取其精华",
          "老师（大模型）把自己的知识教给学生（小模型），学生学会核心能力",
          "把多个模型合并成一个更强的模型",
          "删除模型中不需要的冗余部分",
        ],
        correctIndex: 1,
        explanation:
          "蒸馏就像老师教学生——大模型生成高质量回答作为「教材」，小模型模仿学习。小模型学会常见任务的回答方式，但复杂推理和冷门知识会丢失。合适比最大更重要。",
      },
      {
        kind: "concept",
        question: "关于大模型训练流程，哪种描述更准确？",
        options: [
          "所有模型都必须依次完成 SFT、RL 和 RLHF",
          "预训练建立通用能力，后训练可组合不同方法塑造行为，评估持续检查效果",
          "SFT 只负责格式，RLHF 只负责拒绝危险请求",
          "只要预训练数据足够多，就不需要后训练和评估",
        ],
        correctIndex: 1,
        explanation:
          "训练没有适用于所有模型的唯一配方。预训练学习通用模式，后训练可以使用监督示范、偏好优化或可验证奖励，持续评估负责确认能力和边界。",
      },
      {
        kind: "scenario",
        question: "团队要在内网处理敏感文档，评估开放权重模型时最先应确认什么？",
        options: [
          "模型能下载，所以必然允许任意商用",
          "许可证、隐私边界、任务效果、硬件和维护能力是否匹配",
          "参数最多的模型一定最适合内网",
          "只比较一次排行榜分数即可",
        ],
        correctIndex: 1,
        explanation:
          "开放权重不自动等于开源或可商用。应核对具体许可证，并用真实任务比较隐私、质量、成本、延迟、硬件和维护要求。",
      },
    ],
  },
};

export function getUnitQuiz(unitSlug: string): UnitQuizData | undefined {
  return unitQuizData[unitSlug];
}
