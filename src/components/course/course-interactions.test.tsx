/* @vitest-environment jsdom */

import { act, type ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { createRoot, type Root } from "react-dom/client";

import { ChapterCompletion } from "./chapter-completion";
import {
  AiHierarchyMap,
  AgentDebugger,
  AgentWorkflowViewer,
  ContextWindowMeter,
  CotStepByStep,
  EmbeddingMap,
  LearningByExamples,
  ModelLandscape,
  RAGSimulator,
  TokenCostCalculator,
  ToolCallingStepper,
  WorkflowBuilder,
} from "./interactive-widgets";
import { learnLLMChapters } from "@/lib/courses";

let root: Root | undefined;
let container: HTMLDivElement | undefined;

function render(ui: ReactNode) {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);

  act(() => {
    root?.render(ui);
  });

  return container;
}

function clickButtonByText(element: HTMLElement, text: string) {
  const button = Array.from(element.querySelectorAll("button,label")).find((item) => {
    return item.textContent?.includes(text);
  });

  if (!button) {
    throw new Error(`Button not found: ${text}`);
  }

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

function clickElementByLabel(element: HTMLElement, label: string) {
  const control = element.querySelector<HTMLElement>(`[aria-label="${label}"]`);

  if (!control) {
    throw new Error(`Control not found: ${label}`);
  }

  act(() => {
    control.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

afterEach(() => {
  act(() => {
    root?.unmount();
  });
  container?.remove();
  root = undefined;
  container = undefined;
  window.localStorage.clear();
});

describe("course client interactions", () => {
  it("switches the AI hierarchy active layer", () => {
    const view = render(<AiHierarchyMap />);

    expect(view.textContent).toContain("当前圈层：AI");

    clickButtonByText(view, "机器学习");

    expect(view.textContent).toContain("当前圈层：机器学习");
    expect(view.textContent).toContain("从例子里找规律");
  });

  it("switches the AI hierarchy when the visual ring is clicked", () => {
    const view = render(<AiHierarchyMap />);

    clickElementByLabel(view, "查看深度学习圈层");

    expect(view.textContent).toContain("当前圈层：深度学习");
    expect(view.textContent).toContain("提取特征");
  });

  it("backs the AI hierarchy with native radio state", () => {
    const view = render(<AiHierarchyMap />);
    const radio = view.querySelector<HTMLInputElement>(
      'input[type="radio"][value="machine-learning"]',
    );

    expect(radio).not.toBeNull();

    clickElementByLabel(view, "查看机器学习圈层");

    expect(radio?.checked).toBe(true);
  });

  it("reveals learning examples one at a time without showing unrevealed samples", () => {
    const view = render(<LearningByExamples />);

    expect(view.textContent).toContain("标题含“限时中奖”");
    expect(view.textContent).not.toContain("同事发送会议纪要");
    expect(view.textContent).not.toContain("要求立刻点链接领取补贴");
    expect(view.textContent).not.toContain("1 个样本");
    expect(view.textContent).toContain("初始假设");

    clickButtonByText(view, "加一个样本");

    expect(view.textContent).toContain("同事发送会议纪要");
    expect(view.textContent).not.toContain("要求立刻点链接领取补贴");
    expect(view.textContent).toContain("开始对照正负样本");
  });

  it("marks a chapter complete in local progress", () => {
    const view = render(
      <ChapterCompletion chapter={learnLLMChapters[0]} chapters={learnLLMChapters} />,
    );

    expect(view.textContent).toContain("已完成 0 / 32 章");

    clickButtonByText(view, "标记本章完成");

    expect(view.textContent).toContain("本章已完成");
    expect(view.textContent).toContain("已完成 1 / 32 章");
  });

  it("keeps chapter completion interactive when localStorage is unavailable", () => {
    const originalLocalStorage = Object.getOwnPropertyDescriptor(window, "localStorage");

    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new DOMException("Storage is unavailable", "SecurityError");
      },
    });

    try {
      const view = render(
        <ChapterCompletion chapter={learnLLMChapters[0]} chapters={learnLLMChapters} />,
      );

      expect(view.textContent).toContain("已完成 0 / 32 章");

      clickButtonByText(view, "标记本章完成");

      expect(view.textContent).toContain("本章已完成");
      expect(view.textContent).toContain("已完成 1 / 32 章");
    } finally {
      if (originalLocalStorage) {
        Object.defineProperty(window, "localStorage", originalLocalStorage);
      }
    }
  });

  it("visualizes context window capacity as competing content segments", () => {
    const view = render(<ContextWindowMeter />);

    for (const label of ["系统指令", "历史对话", "外部资料", "当前问题", "回答空间"]) {
      expect(view.textContent).toContain(label);
    }
  });

  it("lets readers compare token cost across realistic DeepSeek price dimensions", () => {
    const view = render(<TokenCostCalculator />);

    for (const label of ["短问答", "长文总结", "多轮对话", "带资料问答"]) {
      expect(view.textContent).toContain(label);
    }

    expect(view.textContent).toContain("DeepSeek V4 Flash");
    expect(view.textContent).toContain("缓存命中输入");
    expect(view.textContent).toContain("缓存未命中输入");
    expect(view.textContent).toContain("输出价格");
    expect(view.textContent).toContain("人民币");
  });

  it("hides retrieval-only RAG steps when RAG is disabled", () => {
    const view = render(<RAGSimulator />);

    for (const label of ["用户问题", "检索资料", "挑选片段", "生成回答", "标出依据"]) {
      expect(view.textContent).toContain(label);
    }

    clickButtonByText(view, "关闭 RAG");

    expect(view.textContent).toContain("用户问题");
    expect(view.textContent).toContain("凭已有记忆回答");
    expect(view.textContent).not.toContain("检索资料");
    expect(view.textContent).not.toContain("挑选片段");
    expect(view.textContent).not.toContain("标出依据");
  });

  it("compares model choices by reader priorities", () => {
    const view = render(<ModelLandscape />);

    for (const label of ["隐私", "成本", "部署能力", "稳定性", "前沿能力"]) {
      expect(view.textContent).toContain(label);
    }
  });

  it("reveals checkable reasoning steps only after expansion", () => {
    const view = render(<CotStepByStep />);

    expect(view.textContent).toContain("先列出已知条件");
    expect(view.textContent).not.toContain("把动作按时间顺序排列");

    clickButtonByText(view, "展开下一步");

    expect(view.textContent).toContain("把动作按时间顺序排列");
    expect(view.textContent).not.toContain("计算 5 - 2 + 12 = 15");
  });

  it("reveals tool-calling traffic as each step executes", () => {
    const view = render(<ToolCallingStepper />);

    expect(view.textContent).toContain("模型决定下一步");
    expect(view.textContent).not.toContain("系统匹配工具");

    clickButtonByText(view, "下一步");

    expect(view.textContent).toContain("系统匹配工具");
    expect(view.textContent).not.toContain("工具负责执行");
  });

  it("reveals the agent loop as executed steps instead of prelisting future work", () => {
    const view = render(<AgentWorkflowViewer />);

    expect(view.textContent).toContain("思考：理解目标");
    expect(view.textContent).not.toContain("行动：调用天气查询");

    clickButtonByText(view, "下一步");

    expect(view.textContent).toContain("行动：调用天气查询");
    expect(view.textContent).not.toContain("观察：读取多云");
  });

  it("maps each agent failure type to its matching repair boundary", () => {
    const view = render(<AgentDebugger />);

    clickButtonByText(view, "伪造结果");

    expect(view.textContent).toContain("工具失败后仍假装查到了结果");
    expect(view.textContent).toContain("对应修复：权限边界");
    expect(view.textContent).not.toContain("对应修复：停止条件");
  });

  it("separates the agent debugger issue panel from the failure tabs", () => {
    const view = render(<AgentDebugger />);
    const issuePanel = view.querySelector<HTMLElement>("[data-agent-debugger-issue-panel]");

    expect(issuePanel?.className).toContain("mt-4");
  });

  it("shows a repaired execution trace after applying an agent boundary", () => {
    const view = render(<AgentDebugger />);

    clickButtonByText(view, "伪造结果");

    expect(view.textContent).toContain("失控轨迹");
    expect(view.textContent).toContain("继续编造一个看似成功的结论");

    clickButtonByText(view, "应用对应修复");

    expect(view.textContent).toContain("修复后执行轨迹");
    expect(view.textContent).toContain("拦截：没有工具结果，不允许编造结论");
    expect(view.textContent).toContain("当前修复已改变执行路径");
  });

  it("lets readers inspect workflow ownership, risk, and outputs as steps are added", () => {
    const view = render(<WorkflowBuilder />);

    expect(view.textContent).toContain("任务场景");
    expect(view.textContent).toContain("责任分工");
    expect(view.textContent).toContain("风险检查");
    expect(view.textContent).toContain("当前输出");
    expect(view.textContent).toContain("人工审核结构");
    expect(view.textContent).not.toContain("RAG 核对事实");

    clickButtonByText(view, "添加下一步");

    expect(view.textContent).toContain("RAG 核对事实");
    expect(view.textContent).toContain("依据覆盖率");
    expect(view.textContent).toContain("事实风险下降");
  });

  it("highlights semantically nearby embedding results in the map and cards", () => {
    const view = render(<EmbeddingMap />);

    expect(view.querySelectorAll("[data-embedding-nearby='true']").length).toBeGreaterThan(0);
    expect(view.textContent).toContain("高相关");
  });

  it("keeps highlighted embedding labels separated from the query marker", () => {
    const view = render(<EmbeddingMap />);
    const nearbyLabels = Array.from(
      view.querySelectorAll<HTMLElement>(
        "[data-embedding-map-label][data-embedding-nearby='true']",
      ),
    );

    expect(nearbyLabels).toHaveLength(2);
    expect(new Set(nearbyLabels.map((label) => label.dataset.embeddingLabelOffset)).size).toBe(2);
    expect(view.querySelector("[data-embedding-query-dot]")).toBeNull();
  });
});
