/**
 * Future server integration boundary. Never place provider API keys in browser code.
 * The preview uses the local Style finder and does not call this endpoint.
 * A production server must authenticate requests, rate limit them, keep the Gemini
 * key in server-only configuration, and return { text: string }.
 */
export async function requestStyleAdvice(message: string, signal?: AbortSignal): Promise<string> {
  const response = await fetch('/api/style-advice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }), signal });
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Style advice is unavailable right now.');
  const result: unknown = await response.json();
  if (!result || typeof result !== 'object' || !('text' in result) || typeof result.text !== 'string') throw new Error('Invalid style advice response.');
  return result.text;
}

