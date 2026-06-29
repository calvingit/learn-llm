import { motion } from "motion/react";

const milestones = [
  {
    year: "1950–1980 年代",
    title: "规则时代",
    description:
      "人把规则逐条写进程序，机器严格按规则执行。能处理固定任务，但场景一变就要重写所有规则。",
    example:
      "Eliza 聊天程序用模式匹配模拟心理医生；专家系统把几百条 if-then 规则编进知识库诊断故障。",
  },
  {
    year: "1990–2000 年代",
    title: "统计机器学习",
    description:
      "机器不再只靠手写规则，而是从大量带标签的样本中归纳规律。数据和标签的质量，决定了学到经验的质量。",
    example:
      "垃圾邮件过滤器从历史邮件中学习'哪些特征更像垃圾'；推荐系统从点击和停留行为中预测你的偏好。",
  },
  {
    year: "2010 年代",
    title: "深度学习突破",
    description: "多层神经网络让机器从数据中逐层提取特征，不再依赖人类手工设计每个判断维度。",
    example: "图像识别从边缘→形状→部件→整体逐层抽象；AlphaGo 从棋谱中自学策略击败世界冠军李世石。",
  },
  {
    year: "2017 年",
    title: "Transformer 架构",
    description:
      "自注意力机制让模型能并行处理长文本中任意两个词之间的关系，解决了传统 RNN 长距离依赖丢失和无法并行训练的问题，成为现代大模型的技术底座。",
    example:
      "Google 论文《Attention Is All You Need》发表，此后 GPT、BERT、Claude 等主流模型全部基于 Transformer。",
  },
  {
    year: "2018–2022",
    title: "大模型崛起",
    description:
      "GPT-1 → GPT-2 → GPT-3 → ChatGPT，参数从亿级膨胀到千亿级。模型不再只是续写工具，开始展现对话、推理、编程等通用能力。",
    example:
      "ChatGPT 2022 年底发布，两个月突破 1 亿用户，让全球普通人第一次切身感受到'AI 能跟我聊天、帮我做事'。",
  },
  {
    year: "2023 至今",
    title: "Agent 与多模态",
    description:
      "大模型从只会聊天，扩展到调用工具、理解图片和音频、自主执行多步骤任务。AI 开始从'会说'走向'能做'。",
    example:
      "多模态模型能直接看懂截图和 PDF 文档；Agent 可以搜索→计算→发邮件形成工作闭环；开源小模型让手机和浏览器也能本地运行 AI。",
  },
];

export function AITimeline() {
  return (
    <section className="bg-card my-8 rounded-xl border p-6">
      <h3 className="mt-0 mb-6 text-xl font-semibold tracking-normal">AI 发展时间线</h3>
      <div className="border-border relative ml-1 border-l-2">
        {milestones.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.1 }}
            className="relative pb-8 pl-7 last:pb-0"
          >
            {/* dot on the timeline */}
            <span className="border-background bg-primary absolute top-1.5 -left-[calc(0.5rem+0.5px)] block size-3.5 rounded-full border-2" />

            <span className="text-muted-foreground/80 text-xs font-medium tracking-wider uppercase">
              {m.year}
            </span>
            <h4 className="text-foreground mt-1 mb-2 text-base font-semibold">{m.title}</h4>
            <p className="text-foreground/82 my-2 text-sm leading-7">{m.description}</p>
            <p className="bg-muted text-muted-foreground rounded-md px-3 py-2 text-sm leading-6">
              {m.example}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
