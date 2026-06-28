import { describe, expect, it } from "vitest";
import { estimateTokenCost, splitTextForTokenDemo } from "./course-interactions";

describe("course interaction helpers", () => {
  it("splits mixed Chinese and English text into visible demo tokens", () => {
    expect(splitTextForTokenDemo("我喜欢 Apple!")).toEqual(["我", "喜", "欢", "Apple", "!"]);
  });

  it("estimates input and output token cost separately", () => {
    expect(
      estimateTokenCost({
        inputTokens: 1000,
        outputTokens: 500,
        inputPricePerMillion: 2,
        outputPricePerMillion: 8,
      }),
    ).toMatchObject({
      inputCost: 0.002,
      outputCost: 0.004,
      totalCost: 0.006,
    });
  });

  it("splits DeepSeek input cost into cache hit and cache miss prices", () => {
    expect(
      estimateTokenCost({
        inputTokens: 10_000,
        inputCacheHitTokens: 4_000,
        outputTokens: 2_000,
        inputCacheHitPricePerMillion: 0.02,
        inputCacheMissPricePerMillion: 1,
        outputPricePerMillion: 2,
      }),
    ).toEqual({
      cacheHitCost: 0.00008,
      cacheMissCost: 0.006,
      inputCost: 0.00608,
      outputCost: 0.004,
      totalCost: 0.01008,
    });
  });
});
