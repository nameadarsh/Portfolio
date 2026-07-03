/// <reference types="node" />
import fs from 'fs';
import path from 'path';

/**
 * Supplies the full system prompt string for the LLM.
 * Default: reads src/ai/prompt.md
 * Future: swap for RAG / vector DB / JSON — the API route stays unchanged.
 */
export interface PromptProvider {
  getSystemPrompt(): Promise<string> | string;
}

class MarkdownFilePromptProvider implements PromptProvider {
  private readonly filePath: string;

  constructor(relativePath = 'src/ai/prompt.md') {
    this.filePath = path.resolve(process.cwd(), relativePath);
  }

  getSystemPrompt(): string {
    if (!fs.existsSync(this.filePath)) {
      console.warn(`[promptProvider] Missing prompt file: ${this.filePath}`);
      return 'You are Adarsh Bajpai. Respond in first person, warmly and professionally.';
    }
    return fs.readFileSync(this.filePath, 'utf-8').trim();
  }
}

let activeProvider: PromptProvider = new MarkdownFilePromptProvider();

export function setPromptProvider(provider: PromptProvider): void {
  activeProvider = provider;
}

export async function getSystemPrompt(): Promise<string> {
  const result = activeProvider.getSystemPrompt();
  return typeof result === 'string' ? result : await result;
}
