import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleChatRequest } from './lib/chatHandler';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {

    const response = await handleChatRequest(req.body);

    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (!response.ok || !response.body) {
      const text = await response.text();
      return res.send(text);
    }

    if (res.flushHeaders) {
      res.flushHeaders();
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }

    return res.end();
  } catch (err) {
    console.error('[api/chat] Fatal route error:', err);
    return res.status(500).json({ error: 'Internal server error in chat route.' });
  }
}
