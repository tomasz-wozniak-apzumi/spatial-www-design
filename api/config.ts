import { put, list } from '@vercel/blob';
import { VercelRequest, VercelResponse } from '@vercel/node';

const CONFIG_FILENAME = 'text-config.json';
const COMMENTS_FILENAME = 'design-comments.json';

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    try {
        const type = request.query.type as string;
        const scope = (request.query.scope as string) || 'global';
        const filename = `${scope}-${type === 'comments' ? COMMENTS_FILENAME : CONFIG_FILENAME}`;

        if (request.method === 'GET') {
            const { blobs } = await list();
            const configBlob = blobs.find(b => b.pathname === filename);

            if (!configBlob) {
                return response.status(200).json(type === 'comments' ? [] : {});
            }

            // Append a timestamp to the fetch URL to aggressively prevent caching
            const fetchUrl = `${configBlob.url}?t=${Date.now()}`;
            const data = await fetch(fetchUrl, { cache: 'no-store' }).then(r => r.json());

            response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            response.setHeader('Pragma', 'no-cache');
            response.setHeader('Expires', '0');
            response.setHeader('Surrogate-Control', 'no-store');

            return response.status(200).json(data);
        }

        if (request.method === 'POST') {
            const newData = request.body;

            const blob = await put(filename, JSON.stringify(newData), {
                access: 'public',
                addRandomSuffix: false,
            });

            return response.status(200).json({ success: true, url: blob.url });
        }

        return response.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Vercel Blob Error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
