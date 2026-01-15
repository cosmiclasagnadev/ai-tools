import { Elysia } from 'elysia';
import { syncAllStats } from '../../services/github.service';

const QSTASH_SIGNING_KEY = process.env.QSTASH_SIGNING_KEY;

async function verifyQStashSignature(req: Request): Promise<boolean> {
  if (!QSTASH_SIGNING_KEY) {
    console.warn('QSTASH_SIGNING_KEY not configured');
    return false;
  }

  const signature = req.headers.get('Upstash-Signature');
  if (!signature) {
    return false;
  }

  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(QSTASH_SIGNING_KEY);
    const [_, digest] = signature.split('.');
    const url = req.url;
    const body = await req.clone().text();

    const data = encoder.encode(`${url}.\n${body}`);
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const expectedSignature = await crypto.subtle.sign(
      'HMAC',
      cryptoKey,
      data
    );

    const expectedDigest = Buffer.from(new Uint8Array(expectedSignature)).toString('base64');

    return digest === expectedDigest;
  } catch (error) {
    console.error('Error verifying QStash signature:', error);
    return false;
  }
}

export const githubSyncRoute = new Elysia({ prefix: '/api/cron' })
  .post('/github-sync', async ({ request, set }) => {
    const isValid = await verifyQStashSignature(request);

    if (!isValid && process.env.NODE_ENV === 'production') {
      set.status = 401;
      return { message: 'Invalid signature' };
    }

    try {
      const result = await syncAllStats();

      return {
        success: true,
        synced: result.synced,
        failed: result.failed,
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      console.error('GitHub sync error:', err);
      set.status = 500;
      return { message: 'Sync failed' };
    }
  });
