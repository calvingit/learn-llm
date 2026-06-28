import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Learn-LLM",
    template: "%s | Learn-LLM",
  },
  description: "普通人也能看懂的大模型通识课。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
