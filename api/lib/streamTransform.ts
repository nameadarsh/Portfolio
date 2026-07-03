import type { StreamChunk } from './types';

/**
 * Transforms an OpenAI-compatible SSE stream from the LLM into our normalized SSE format.
 */
export function createNormalizedSSEStream(upstream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      const reader = upstream.getReader();
      let buffer = '';

      const emit = (chunk: StreamChunk) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;

            const data = trimmed.slice(5).trim();
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data) as {
                choices?: Array<{ delta?: { content?: string } }>;
              };
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) emit({ content });
            } catch {
              // Skip malformed chunks
            }
          }
        }

        emit({ done: true });
        controller.close();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Stream interrupted';
        emit({ error: message, done: true });
        controller.close();
      } finally {
        reader.releaseLock();
      }
    },
  });
}
