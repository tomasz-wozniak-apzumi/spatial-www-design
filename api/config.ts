import { put, list } from '@vercel/blob';
import { VercelRequest, VercelResponse } from '@vercel/node';

const CONFIG_FILENAME = 'text-config.json';

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    try {
        if (request.method === 'GET') {
            // Find the file in storage
            const { blobs } = await list();
            const configBlob = blobs.find(b => b.pathname === CONFIG_FILENAME);

            if (!configBlob) {
                return response.status(200).json({});
            }

            // Fetch the actual content of the JSON file
            const data = await fetch(configBlob.url).then(r => r.json());
            return response.status(200).json(data);
        }

        if (request.method === 'POST') {
            const newConfig = request.body;

            // Save/Overwrite the flat file in Blob storage
            const blob = await put(CONFIG_FILENAME, JSON.stringify(newConfig), {
                access: 'public',
                addRandomSuffix: false, // Important: stay with the same filename
            });

            return response.status(200).json({ success: true, url: blob.url });
        }

        return response.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Vercel Blob Error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
