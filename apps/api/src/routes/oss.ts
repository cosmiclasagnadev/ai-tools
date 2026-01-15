import { Elysia } from 'elysia';
import { getOSSTools, getOSSFilters, getOSSToolBySlug, getOSSFilterCounts } from '../services/oss.service';

export const ossRoute = new Elysia({ prefix: '/api/oss' })
  .get('/', async ({ query }) => {
    const { page, pageSize, search, license, language, minStars, selfHostable, dockerSupport, difficulty } = query;

    const result = await getOSSTools({
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 12,
      search,
      license,
      language,
      minStars: minStars ? Number(minStars) : undefined,
      selfHostable: selfHostable === 'true' ? true : selfHostable === 'false' ? false : undefined,
      dockerSupport: dockerSupport === 'true' ? true : dockerSupport === 'false' ? false : undefined,
      difficulty,
    });

    return result;
  })
  .get('/filters', async () => {
    const filters = await getOSSFilters();
    return filters;
  })
  .get('/filter-counts', async () => {
    const counts = await getOSSFilterCounts();
    return counts;
  })
  .get('/:slug', async ({ params, set }) => {
    const tool = await getOSSToolBySlug(params.slug);

    if (!tool) {
      set.status = 404;
      return { message: 'OSS tool not found' };
    }

    return tool;
  });
