import type { ChatMessage } from './types';

export interface LLMStreamOptions {
  messages: ChatMessage[];
  systemPrompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LLMProvider {
  readonly name: string;
  streamCompletion(options: LLMStreamOptions): Promise<Response>;
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile';

export class GroqProvider implements LLMProvider {
  readonly name = 'groq';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async streamCompletion(options: LLMStreamOptions): Promise<Response> {
    const { messages, systemPrompt, model = DEFAULT_MODEL, temperature = 0.65, maxTokens = 2048 } = options;

    const payload = {
      model,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      stream: true,
      temperature,
      max_tokens: maxTokens,
    };

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      throw new Error(`Groq API error (${response.status}): ${errorBody || response.statusText}`);
    }

    return response;
  }
}

/** Swap provider implementation here when migrating off Groq. */
export function createLLMProvider(): LLMProvider {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured');
  }
  return new GroqProvider(apiKey);
}
