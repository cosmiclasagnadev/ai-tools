import { Elysia } from 'elysia';
import { getToolBySlug, getTools, getAlternatives } from '../services/tool.service';

export const toolsRoute = new Elysia({ prefix: '/api/tools' })
  .get('/', async ({ query }) => {
    const { page, pageSize, industry, category, pricing, isOpenSource } = query;

    const result = await getTools({
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 12,
      industry,
      category,
      pricing,
      isOpenSource: isOpenSource === 'true' ? true : isOpenSource === 'false' ? false : undefined,
    });

    return result;
  })
  .get('/:slug', async ({ params, set }) => {
    const tool = await getToolBySlug(params.slug);

    if (!tool) {
      set.status = 404;
      return { message: 'Tool not found' };
    }

    return tool;
  })
  .get('/:slug/alternatives', async ({ params, query }) => {
    const tool = await getToolBySlug(params.slug);

    if (!tool) {
      return { tools: [] };
    }

    const limit = query.limit ? Number(query.limit) : 6;
    const alternatives = await getAlternatives(tool.id, limit);

    return { tools: alternatives };
  });
