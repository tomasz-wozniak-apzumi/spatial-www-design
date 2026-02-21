import { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const KNOWLEDGE_BASE = `
KNOWLEDGE BASE DOCUMENTS:
1. Document 1 (Printer Specifications):
   - Pełna nazwa drukarki: Apzumi Spatial PrintMaster Pro 3000
   - Waga: Drukarka waży 12.5 kg.
   - Obsługiwany tusz: Drukarka obsługuje wyłącznie oryginalne tusze z serii Spatial Ink X-Series (wkłady atramentowe o wysokiej wydajności).

2. Document 2 (Text Note / Warning):
   - IMPORTANT! DO NOT EXPOSE PRINTER TO THE SUN! IT CAN OVERHEAT EASILY!
   - Należy unikać bezpośredniego nasłonecznienia drukarki, aby zapobiec jej przegrzaniu.
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

        const { query } = request.body;

        if (!query) {
            return response.status(400).json({ error: 'Missing query parameter' });
        }

        const prompt = `You are a helpful AI Assistant for Apzumi Spatial.
Your task is to answer the user's question based strictly on the provided knowledge base.
If the information is not in the knowledge base, you must state that you do not have that information without guessing.
Keep your answer very concise: maximum 2 to 4 short sentences. Answer in Polish.

${KNOWLEDGE_BASE}

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
