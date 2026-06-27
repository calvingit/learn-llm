import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Compass,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const courseValues = [
  {
    title: "看懂 AI 是什么",
    description: "用生活语言理解 AI、机器学习、深度学习和大模型的关系。",
    icon: Brain,
  },
  {
    title: "理解大模型为什么强",
    description: "从“接下一句话”出发，看懂它为什么像是在理解和推理。",
    icon: Sparkles,
  },
  {
    title: "知道它为什么会出错",
    description: "区分听起来合理和事实正确，建立必要的核实习惯。",
    icon: ShieldCheck,
  },
  {
    title: "学会正确使用 AI",
    description: "知道什么时候适合交给模型，什么时候必须由人判断。",
    icon: CheckCircle2,
  },
];

const learningPath = [
  { label: "AI 是怎么发展来的", anchor: "unit-1" },
  { label: "大模型怎样生成文字", anchor: "unit-2" },
  { label: "为什么会推理也会幻觉", anchor: "unit-3" },
  { label: "怎样让回答更可靠", anchor: "unit-4" },
  { label: "从 Prompt 到 Agent", anchor: "unit-5" },
  { label: "普通人如何协作", anchor: "unit-6" },
];

const audiences = ["普通用户", "学生", "职场人士", "产品/运营/管理者", "非 AI 工程师"];

export default function HomePage() {
  return (
    <main>
      <header className="bg-background/95 border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <BookOpen className="text-primary size-6" />
            Learn-LLM
          </Link>
          <nav className="text-muted-foreground hidden items-center gap-6 text-sm md:flex">
            <Link className="hover:text-foreground" href="/courses/learn-llm">
              课程目录
            </Link>
            <a className="hover:text-foreground" href="#path">
              学习路径
            </a>
            <a className="hover:text-foreground" href="#audience">
              适合人群
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1fr_0.9fr] md:items-center md:py-16">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-5">
            <h1 className="text-foreground max-w-3xl text-5xl font-bold tracking-normal md:text-7xl">
              Learn-LLM
            </h1>
            <p className="text-foreground max-w-2xl text-2xl leading-9 font-semibold">
              普通人也能听懂的大模型通识课
            </p>
            <p className="text-muted-foreground max-w-2xl text-lg leading-8">
              从生活场景出发，用比喻、小互动和短问题，理解大模型是什么、为什么有用、哪里不能信，以及普通人该怎么和它协作。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/courses/learn-llm/chapter-01">
                开始学习
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/courses/learn-llm">查看课程目录</Link>
            </Button>
          </div>
          <div className="bg-card rounded-xl border p-4 shadow-sm">
            <div className="text-muted-foreground grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {learningPath.map((item, index) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="bg-primary/10 text-primary inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                    {index + 1}
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
          <Image
            src="/images/learn-llm-hero.png"
            alt="Learn-LLM 课程的互动学习视觉图"
            width={1536}
            height={1024}
            priority
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-muted/45 border-y">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-12 md:grid-cols-4">
          {courseValues.map((value) => {
            const Icon = value.icon;

            return (
              <Card key={value.title}>
                <CardHeader>
                  <Icon className="text-primary size-8" />
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="path" className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-normal">学习路径</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-7">
              21 章分成 6 个单元，从 AI 的发展讲到 RAG、Agent，再回到普通人的工作流和使用边界。
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/courses/learn-llm">
              查看全部章节
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {learningPath.map((item, index) => (
            <Link key={item.anchor} href={`/courses/learn-llm#${item.anchor}`}>
              <Card className="border-l-primary cursor-pointer border-l-4 transition-shadow hover:shadow-md">
                <CardHeader>
                  <Badge className="self-start" variant="muted">
                    单元 {index + 1}
                  </Badge>
                  <CardTitle>{item.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-6">
                    每个单元都围绕一个普通人会问的问题展开，读一段、看一个比喻、做一个小互动。
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section id="audience" className="bg-card">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1fr] md:items-center">
            <div>
              <Compass className="text-accent size-10" />
              <h2 className="mt-4 text-3xl font-semibold tracking-normal">为非 AI 工程师设计</h2>
              <p className="text-muted-foreground mt-3 leading-7">
                这不是算法课，也不是工具清单。课程核心是建立判断力：它为什么有用、为什么会错、适合做什么、不适合做什么。
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
