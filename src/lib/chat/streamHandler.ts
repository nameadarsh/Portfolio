import type { StreamChunk } from './types';

export async function* parseSSEStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
): AsyncGenerator<StreamChunk> {
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split('\n\n');
    buffer = parts.pop() ?? '';

    for (const part of parts) {
      const line = part.trim();
      if (!line.startsWith('data:')) continue;

      const payload = line.slice(5).trim();
      if (!payload) continue;

      try {
        yield JSON.parse(payload) as StreamChunk;
      } catch {
        // Ignore malformed events
      }
    }
  }
}

export async function consumeChatStream(
  response: Response,
  onChunk: (text: string) => void,
): Promise<void> {
  if (!response.ok) {
    let message = 'Something went wrong. Please try again.';
    try {
      const data = (await response.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {
      // use default
    }
    throw new Error(message);
  }

  if (!response.body) {
    throw new Error('No response stream available.');
  }

  const reader = response.body.getReader();

  for await (const chunk of parseSSEStream(reader)) {
    if (chunk.error) throw new Error(chunk.error);
    if (chunk.content) onChunk(chunk.content);
    if (chunk.done) break;
  }
}
