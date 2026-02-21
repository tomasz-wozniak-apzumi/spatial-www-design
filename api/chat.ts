import { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const DEFAULT_KNOWLEDGE_BASE = `
KNOWLEDGE BASE DOCUMENTS:
1. Document 1 (CNC Specifications):
   - Pełna nazwa maszyny CNC: Apzumi Spatial Titan CNC 5-Axis
   - Waga: Maszyna waży 4500 kg.
   - Zasilanie: Maszyna wymaga zasilania trójfazowego 400V.

2. Document 2 (Text Note / Warning):
   - IMPORTANT! REGULARLY CHECK COOLANT LEVELS TO PREVENT OVERHEATING!
   - Należy regularnie sprawdzać poziom chłodziwa (cieczy chłodzącej), aby zapobiec przegrzaniu wrzeciona i narzędzi.
`;

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return response.status(500).json({ error: 'Missing GROQ_API_KEY in environment variables. Please restart your dev server.' });
        }

        const groq = new Groq({ apiKey });

        const { query, customKnowledge } = request.body;

        if (!query) {
            return response.status(400).json({ error: 'Missing query parameter' });
        }

        const effectiveKnowledgeBase = customKnowledge && customKnowledge.trim() !== ''
            ? `KNOWLEDGE BASE DOCUMENTS (CUSTOM):\n${customKnowledge}`
            : DEFAULT_KNOWLEDGE_BASE;

        const prompt = `You are a helpful AI Assistant for Apzumi Spatial.
Your task is to answer the user's question based strictly on the provided knowledge base.
If the information is not in the knowledge base, you must state that you do not have that information without guessing.
Keep your answer very concise: maximum 2 to 4 short sentences. Answer in Polish.

${effectiveKnowledgeBase}

User Question: ${query}
`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.1-8b-instant',
            temperature: 0.2, // Low temperature for high factual accuracy
        });

        const answer = chatCompletion.choices[0]?.message?.content || "Przepraszam, wystąpił błąd w generowaniu odpowiedzi.";

        return response.status(200).json({ text: answer });
    } catch (error) {
        console.error('Groq API Error:', error);
        return response.status(500).json({ error: 'Failed to fetch response from Groq LLM', details: String(error) });
    }
}
