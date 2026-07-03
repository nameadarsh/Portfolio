import type { ChatMessage } from './types';
import { getSystemPrompt } from './promptProvider';
import { createLLMProvider } from './llmProvider';
import { createNormalizedSSEStream } from './streamTransform';

const MAX_HISTORY = 24;
const MAX_MESSAGE_LENGTH = 4000;

function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === 'object' &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_MESSAGE_LENGTH).trim(),
    }));
}

export async function handleChatRequest(body: unknown): Promise<Response> {
  const parsed = body as { messages?: unknown };
  const messages = sanitizeMessages(parsed?.messages);

  if (messages.length === 0 || messages[messages.length - 1]?.role !== 'user') {
    return new Response(JSON.stringify({ error: 'A user message is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const provider = createLLMProvider();
    const systemPrompt = await getSystemPrompt();
    const upstream = await provider.streamCompletion({
      messages,
      systemPrompt,
    });

    if (!upstream.body) {
      throw new Error('No response body from LLM provider');
    }

    const stream = createNormalizedSSEStream(upstream.body);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[chatHandler]', error);
    const errMsg = error instanceof Error ? error.message : '';
    const message =
      errMsg.includes('GROQ_API_KEY') ||
      errMsg.includes('401') ||
      errMsg.includes('invalid_api_key')
        ? 'Chat is temporarily unavailable. Please try again later.'
        : 'Something went wrong while generating a response. Please try again.';

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
