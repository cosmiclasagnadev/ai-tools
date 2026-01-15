import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { toolsRoute } from './routes/tools';
import { industriesRoute } from './routes/industries';
import { ossRoute } from './routes/oss';
import { searchRoute } from './routes/search';
import { githubSyncRoute } from './routes/cron/github-sync';

const app = new Elysia()
  .use(
    cors({
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    })
  )
  .use(swagger())
  .get('/', () => 'Welcome to AITools API')
  .get('/health', () => ({ status: 'ok' }))
  .use(toolsRoute)
  .use(industriesRoute)
  .use(ossRoute)
  .use(searchRoute)
  .use(githubSyncRoute)
  .listen(3001);

console.log(`🔥 API running at ${app.server?.hostname}:${app.server?.port}`);

