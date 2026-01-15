import { Elysia } from 'elysia';
import { searchTools } from '../services/tool.service';

export const searchRoute = new Elysia({ prefix: '/api/search' })
  .get('/', async ({ query }) => {
    const { q, limit } = query;

    if (!q || (typeof q === 'string' && q.trim().length === 0)) {
      return { tools: [], total: 0, query: '' };
    }

    const searchLimit = limit ? Number(limit) : 20;
    const tools = await searchTools(q, searchLimit);

    return {
      tools,
      total: tools.length,
      query: q,
    };
  });
