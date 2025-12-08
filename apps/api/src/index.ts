import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';

const app = new Elysia()
  .use(
    cors({
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    })
  )
  .use(swagger())
  .get('/', () => 'Welcome to AITools API')
  .get('/health', () => ({ status: 'ok' }))
  .listen(3001);

console.log(`🔥 API running at ${app.server?.hostname}:${app.server?.port}`);

