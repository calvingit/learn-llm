import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Boxes,
  Brain,
  CheckCircle2,
  CirclePlay,
  GitBranch,
  Layers3,
  Lightbulb,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
  Sprout,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { learnLLMChapters } from "@/lib/courses";

const courseValues = [
  {
    title: "零基础友好",
    description: "从生活问题进入，不要求数学、代码或算法背景。",
    icon: Brain,
  },
  {
    title: "案例驱动",
    description: "用短问题、小互动和比喻，把抽象概念放回真实场景。",
    icon: Sparkles,
  },
  {
    title: "思考为先",
    description: "不追工具清单，先建立判断 AI 输出是否可信的方式。",
    icon: ShieldCheck,
  },
  {
    title: "学以致用",
    description: "把 Prompt、RAG、Agent 和工作流落到普通人的协作边界。",
    icon: CheckCircle2,
  },
];

const learningPath = [
  {
    title: "AI 基础与发展",
    description: "AI 是什么，如何演进",
    anchor: "unit-1",
    icon: Sprout,
  },
  {
    title: "大模型核心原理",
    description: "从训练到生成的关键",
    anchor: "unit-2",
    icon: Boxes,
  },
  {
    title: "提示词与对话",
    description: "如何让模型更懂你",
    anchor: "unit-3",
    icon: MessageCircle,
  },
  {
    title: "知识与检索",
    description: "RAG 与外部知识",
    anchor: "unit-4",
    icon: GitBranch,
  },
  {
    title: "智能体与工具",
    description: "Agent 如何解决问题",
    anchor: "unit-5",
    icon: Bot,
  },
  {
    title: "工作流与落地",
    description: "搭建你的 AI 工作流",
    anchor: "unit-6",
    icon: Route,
  },
  {
    title: "边界与未来",
    description: "风险、伦理与未来",
    anchor: "unit-7",
    icon: ShieldCheck,
  },
];

const heroStats = [
  {
    title: "系统课程",
    description: "从 0 到协作实战",
    icon: CirclePlay,
  },
  {
    title: "通俗易懂",
    description: "零技术门槛",
    icon: CheckCircle2,
  },
  {
    title: "贴近生活场景",
    description: "学完就能用",
    icon: Lightbulb,
  },
  {
    title: "理性看待 AI",
    description: "不迷信，不盲从",
    icon: ShieldCheck,
  },
];

const audiences = ["普通用户", "学生", "职场人士", "产品/运营/管理者", "非 AI 工程师"];
const contentChapterCount = learnLLMChapters.filter((chapter) =>
  chapter.slug.startsWith("chapter-"),
).length;
const unitCount = new Set(learnLLMChapters.map((chapter) => chapter.unit)).size;

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen">
      <header className="bg-background/95 sticky top-0 z-20 border-b backdrop-blur">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-4">
          <Link className="flex items-center gap-3 text-lg font-semibold" href="/">
            <BookOpen className="text-primary size-7" />
            Learn-LLM
          </Link>
          <nav className="text-foreground hidden items-center gap-7 text-sm font-medium md:flex">
            <Link className="hover:text-foreground" href="/courses/learn-llm">
              课程目录
            </Link>
            <a className="hover:text-foreground" href="#path">
              学习路径
            </a>
            <a className="hover:text-foreground" href="#audience">
              适合人群
            </a>
            <Button asChild size="sm">
              <Link href="/courses/learn-llm/chapter-01">开始学习</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-y-0 right-0 hidden w-[66%] lg:block">
          <Image
            src="/images/learn-llm-hero.png"
            alt=""
            width={1536}
            height={1024}
            priority
            className="h-full w-full object-cover object-center"
          />
          <div className="from-background via-background/25 absolute inset-0 bg-gradient-to-r to-transparent" />
          <div className="from-background absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-[90rem] gap-10 px-5 py-8 md:py-18 lg:min-h-[640px] lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-16">
          <div className="flex max-w-2xl flex-col gap-7 md:gap-8">
            <div className="flex flex-col gap-6">
              <h1 className="text-foreground text-6xl leading-[0.9] font-bold tracking-normal whitespace-nowrap md:text-8xl lg:text-[5.75rem] xl:text-[6.25rem]">
                Learn-LLM
              </h1>
              <div className="flex flex-col gap-5">
                <p className="text-foreground text-3xl leading-tight font-semibold md:text-4xl">
                  普通人也能听懂的大模型通识课
                </p>
                <div className="bg-primary h-1 w-16 rounded-full" />
                <p className="text-muted-foreground max-w-xl text-lg leading-8">
                  从生活场景出发，用比喻、小互动和短问题，理解大模型是什么、为什么有用、哪里不能信，以及普通人该怎么和它协作。
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-14 px-8 text-lg">
                <Link href="/courses/learn-llm/chapter-01">
                  开始学习
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg">
                <Link href="/courses/learn-llm">查看课程目录</Link>
              </Button>
            </div>
            <div className="lg:hidden">
              <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
                <Image
                  src="/images/learn-llm-hero.png"
                  alt="Learn-LLM 课程的互动学习视觉图"
                  width={1536}
                  height={1024}
                  priority
                  className="aspect-video h-full w-full object-cover sm:aspect-[4/3]"
                />
              </div>
            </div>
            <div className="hidden gap-4 border-t pt-6 md:grid md:grid-cols-2 lg:grid-cols-4">
              {heroStats.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-3 lg:flex-col lg:gap-2">
                    <Icon className="text-primary size-6 shrink-0" />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-muted-foreground mt-1 text-sm leading-5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="path" className="bg-card border-b">
        <div className="mx-auto grid max-w-[90rem] gap-8 px-5 py-10 lg:grid-cols-[260px_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-normal">学习路径</h2>
            <p className="text-muted-foreground mt-3 leading-7">
              {contentChapterCount} 章分成 {unitCount} 个单元，从 AI 的发展讲到
              RAG、Agent，再回到普通人的工作流和使用边界。
            </p>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="relative grid min-w-[920px] grid-cols-7 gap-4">
              <div className="bg-primary/30 absolute top-9 right-10 left-10 h-px" />
              {learningPath.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.anchor}
                    className="group relative flex flex-col items-center text-center"
                    href={`/courses/learn-llm#${item.anchor}`}
                  >
                    <span className="bg-card border-primary/35 group-hover:border-primary relative inline-flex size-18 items-center justify-center rounded-full border transition-colors">
                      <Icon className="text-primary size-7" />
                    </span>
                    <span className="text-primary mt-2 text-sm font-semibold">{index + 1}</span>
                    <span className="mt-1 text-sm font-semibold">{item.title}</span>
                    <span className="text-muted-foreground mt-1 text-xs leading-5">
                      {item.description}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <h2 className="max-w-2xl text-4xl leading-tight font-semibold tracking-normal">
              先建立直觉，再学习概念，最后形成判断力。
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-8">
              这不是算法课，也不是工具清单。课程核心是让你知道它为什么有用、为什么会错、适合做什么、不适合做什么。
            </p>
          </div>
          <div className="flex lg:justify-end">
            <Button asChild variant="outline">
              <Link href="/courses/learn-llm">
                查看全部章节
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courseValues.map((value) => {
            const Icon = value.icon;

            return (
              <div key={value.title} className="border-border border-l pl-5">
                <Icon className="text-primary size-8" />
                <h3 className="mt-5 text-xl font-semibold tracking-normal">{value.title}</h3>
                <p className="text-muted-foreground mt-3 leading-7">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="audience" className="bg-muted/40 border-t">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Layers3 className="text-accent size-10" />
            <h2 className="mt-5 text-4xl leading-tight font-semibold tracking-normal">
              为非 AI 工程师设计
            </h2>
            <p className="text-muted-foreground mt-4 text-lg leading-8">
              如果你希望把 AI 用进学习、工作和判断流程，这门课会先帮你建立边界感，再谈效率。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {audiences.map((audience) => (
              <div
                key={audience}
                className="bg-background flex items-center gap-3 rounded-lg border p-4"
              >
                <MessageCircle className="text-primary size-5" />
                <span className="font-medium">{audience}</span>
              </div>
            ))}
            <Button asChild className="h-auto justify-between p-4 sm:col-span-2">
              <Link href="/courses/learn-llm/chapter-01">
                从第一章开始
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-5 py-10">
        <div className="flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-muted-foreground leading-7">把 AI 讲清楚，把判断权留给你。</p>
          <Button asChild variant="ghost">
            <Link href="/courses/learn-llm">
              进入课程目录
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
