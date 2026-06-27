type TokenCostInput = {
  inputTokens: number;
  outputTokens: number;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
};

type TokenCostEstimate = {
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
  outputTokens,
  inputPricePerMillion,
  outputPricePerMillion,
}: TokenCostInput): TokenCostEstimate {
  const inputCost = (inputTokens / 1_000_000) * inputPricePerMillion;
  const outputCost = (outputTokens / 1_000_000) * outputPricePerMillion;

  return {
    inputCost: roundCost(inputCost),
    outputCost: roundCost(outputCost),
    totalCost: roundCost(inputCost + outputCost),
  };
}
