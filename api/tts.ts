import { VercelRequest, VercelResponse } from '@vercel/node';
import * as googleTTS from 'google-tts-api';

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { text } = request.body;

        if (!text) {
            return response.status(400).json({ error: 'Missing text parameter' });
        }

        // Limit to 200 chars to fit standard google-tts-api single request limits, 
        // though our prompt constrains to 2-4 short sentences anyway.
        const safeText = text.substring(0, 200);

        // Fetch free audio as base64
        const audioContent = await googleTTS.getAudioBase64(safeText, {
            lang: 'pl',
            slow: false,
            host: 'https://translate.google.com',
        });

        // data.audioContent is a base64 encoded MP3 string
        return response.status(200).json({ audioContent });
    } catch (error) {
        console.error('TTS API Error:', error);
        return response.status(500).json({ error: 'Failed to generate TTS audio', details: String(error) });
    }
}
