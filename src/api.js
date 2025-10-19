// This module is used both in Node (server) and the browser (client). Avoid importing
// Node-only modules (dotenv, fs, path, os) at top-level so webpack won't attempt to
// bundle them for the browser. Instead, dynamically import OpenAI/dotenv only when
// running in a Node environment (where process.env is available and `window` is undefined).

// generateResponse: in browser -> POST to a backend endpoint '/api/llm' (recommended).
// If no backend exists, return a simple fallback so the UI remains functional during dev.

export async function generateResponse(messages) {
  const chatMessages = messages.map((msg) => ({
    role: msg.isUser ? 'user' : 'assistant',
    content: msg.text,
  }));

  // If running in a browser, send the request to a backend endpoint that holds the API key.
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatMessages }),
      });
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const json = await res.json();
          return json.content || json.text || JSON.stringify(json);
        }
        return await res.text();
      }
      // fallthrough to fallback
    } catch (err) {
      // network/backend not available — fall through to fallback mock
      // console.warn('LLM backend call failed', err);
    }

    // Fallback mock response (keeps UI working during local dev without backend)
    return JSON.stringify({
      "6_months": 'Focus on immediate skill consolidation and a high-impact project to showcase capability.',
      "1_year": 'Take ownership of end-to-end initiatives and pursue relevant certifications or courses.',
      "2_years": 'Broaden cross-functional exposure; lead a small team or program.',
      "5_years": 'Position for senior individual contributor or first-line management role with strategic responsibilities.',
      "10_years": 'Aim for senior leadership or subject-matter leadership with broad business impact.',
    });
  }

  // Node environment: dynamically import Node-only modules so bundlers won't include them.
  const OpenAI = (await import('openai')).default;
  const dotenv = await import('dotenv');
  dotenv.config();

  const client = new OpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY_PRIMARY,
    baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
    defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_API_KEY_PRIMARY },
    defaultQuery: { 'api-version': process.env.AZURE_OPENAI_API_VERSION },
  });

  const response = await client.chat.completions.create({
    model: 'gpt-5-mini',
    messages: chatMessages,
    tools: [{ type: 'web_search' }],
  });

  return response.choices[0].message.content;
}

// Helper to determine route based on message content. Uses same environment strategy.
export async function determineRoute(messages) {
  // For browser, route determination should ideally happen on the backend as well.
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/llm/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      if (res.ok) {
        const txt = await res.text();
        return txt;
      }
    } catch (err) {
      // ignore and fallback
    }
    return 'NONE';
  }

  // Node: use same client approach
  const OpenAI = (await import('openai')).default;
  const dotenv = await import('dotenv');
  dotenv.config();
  const client = new OpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY_PRIMARY,
    baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
    defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_API_KEY_PRIMARY },
    defaultQuery: { 'api-version': process.env.AZURE_OPENAI_API_VERSION },
  });

  const chatMessages = typeof messages === 'string' ? messages : JSON.stringify(messages);
  const response = await client.chat.completions.create({
    model: 'gpt-5-mini',
    messages:
      'The following message has been provided by the user: ' +
      chatMessages +
      ' Determine the most appropriate redirect to assist the user among the following options: 1. Career Simulator, 2. Learning, 3. Mentorship. Respond with only the path of the feature (/career-paths, /learning and /mentorship respectively). If there are no features that match, respond NONE',
  });

  return response.choices[0].message.content;
}

