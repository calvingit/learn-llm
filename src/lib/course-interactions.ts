type TokenCostInput = {
  inputTokens: number;
  inputCacheHitTokens?: number;
  inputCacheHitPricePerMillion?: number;
  inputCacheMissPricePerMillion?: number;
  outputTokens: number;
  inputPricePerMillion?: number;
  outputPricePerMillion: number;
};

type TokenCostEstimate = {
  cacheHitCost: number;
  cacheMissCost: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
};

const TOKEN_DEMO_PATTERN = /[\u4e00-\u9fff]|[A-Za-z0-9]+|[^\s]/gu;

function roundCost(value: number) {
  return Number(value.toFixed(6));
}

export function splitTextForTokenDemo(text: string) {
  return Array.from(text.matchAll(TOKEN_DEMO_PATTERN), (match) => match[0]);
}

export function estimateTokenCost({
  inputTokens,
  inputCacheHitTokens = 0,
  inputCacheHitPricePerMillion,
  inputCacheMissPricePerMillion,
  outputTokens,
  inputPricePerMillion,
  outputPricePerMillion,
}: TokenCostInput): TokenCostEstimate {
  const cacheHitTokens = Math.min(Math.max(inputCacheHitTokens, 0), inputTokens);
  const cacheMissTokens = inputTokens - cacheHitTokens;
  const cacheHitPrice = inputCacheHitPricePerMillion ?? inputPricePerMillion ?? 0;
  const cacheMissPrice = inputCacheMissPricePerMillion ?? inputPricePerMillion ?? 0;
  const cacheHitCost = (cacheHitTokens / 1_000_000) * cacheHitPrice;
  const cacheMissCost = (cacheMissTokens / 1_000_000) * cacheMissPrice;
  const inputCost = cacheHitCost + cacheMissCost;
  const outputCost = (outputTokens / 1_000_000) * outputPricePerMillion;

  return {
    cacheHitCost: roundCost(cacheHitCost),
    cacheMissCost: roundCost(cacheMissCost),
    inputCost: roundCost(inputCost),
    outputCost: roundCost(outputCost),
    totalCost: roundCost(inputCost + outputCost),
  };
}
