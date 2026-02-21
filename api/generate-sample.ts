import { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

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
            return response.status(500).json({ error: 'Missing GROQ_API_KEY in environment variables.' });
        }

        const groq = new Groq({ apiKey });

        const { topic } = request.body;

        if (!topic || topic.trim() === '') {
            return response.status(400).json({ error: 'Missing topic parameter' });
        }

        const prompt = `Jesteś asystentem pomagającym w tworzeniu przykładowych baz wiedzy. 
Użytkownik podał następujący temat/tytuł dokumentu: "${topic}".
Wygeneruj krótki, zwięzły (max 4-5 zdań lub punktów) przykładowy tekst, który mógłby stanowić treść takiego dokumentu w bazie wiedzy.
Zwróć TYLKO wygenerowany tekst, bez form grzecznościowych, bez wstępów typu "Oto tekst". Tekst musi być w języku polskim.`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.1-8b-instant',
            temperature: 0.7,
        });

        const answer = chatCompletion.choices[0]?.message?.content || "Przykładowa treść dokumentu.";

        return response.status(200).json({ text: answer.trim() });
    } catch (error) {
        console.error('Groq API Error in generate-sample:', error);
        return response.status(500).json({ error: 'Failed to fetch response from Groq LLM', details: String(error) });
    }
}
