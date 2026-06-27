import { describe, expect, it } from "vitest";
import { estimateTokenCost, splitTextForTokenDemo } from "./course-interactions";

describe("course interaction helpers", () => {
  it("splits mixed Chinese and English text into visible demo tokens", () => {
    expect(splitTextForTokenDemo("我喜欢 Apple!")).toEqual([
      "我",
      "喜",
      "欢",
      "Apple",
      "!",
    ]);
  });

  it("estimates input and output token cost separately", () => {
    expect(
      estimateTokenCost({
        inputTokens: 1000,
        outputTokens: 500,
        inputPricePerMillion: 2,
        outputPricePerMillion: 8,
      }),
    ).toEqual({
      inputCost: 0.002,
      outputCost: 0.004,
      totalCost: 0.006,
    });
  });
});
