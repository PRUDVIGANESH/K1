export interface CompletionOptions {
  prompt: string;
  maxTokens?: number;
}

export interface CompletionResult {
  text: string;
  model: string;
  usage?: { prompt: number; completion: number };
}

/**
 * Routes to first available provider. Stub implementation;
 * wire openrouter/groq/huggingface in providers and call from here.
 */
export async function complete(options: CompletionOptions): Promise<CompletionResult> {
  const { prompt, maxTokens = 500 } = options;
  // Stub: return template response. Replace with real provider calls.
  const text =
    prompt.toLowerCase().includes("readiness")
      ? "Your readiness is based on profile completeness, resume quality, and application activity. Aim for 80%+."
      : "Response from AI gateway (stub). Configure OpenRouter, Groq, or Huggingface for real completions.";
  return {
    text,
    model: "stub",
    usage: { prompt: prompt.length, completion: text.length },
  };
}
