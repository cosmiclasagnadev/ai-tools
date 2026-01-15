import { Elysia } from 'elysia';
import { getIndustryInfo, getTopToolsByIndustry, getIndustryList } from '../services/tool.service';

export const industriesRoute = new Elysia({ prefix: '/api/industries' })
  .get('/', async () => {
    const industries = await getIndustryList();

    const industryDisplayNames: Record<string, { displayName: string; description: string }> = {
      marketing: { displayName: 'Marketing', description: 'AI tools for marketing automation, content creation, and campaign management' },
      sales: { displayName: 'Sales', description: 'AI tools for lead generation, prospecting, and sales automation' },
      design: { displayName: 'Design', description: 'AI tools for graphic design, UI/UX, and creative workflows' },
      development: { displayName: 'Development', description: 'AI tools for coding, debugging, and software development' },
      finance: { displayName: 'Finance', description: 'AI tools for financial analysis, forecasting, and accounting' },
      legal: { displayName: 'Legal', description: 'AI tools for legal research, contract analysis, and compliance' },
      hr: { displayName: 'Human Resources', description: 'AI tools for recruitment, employee management, and HR automation' },
      content: { displayName: 'Content Creation', description: 'AI tools for video, audio, and multimedia content creation' },
      education: { displayName: 'Education', description: 'AI tools for learning, tutoring, and educational content' },
      healthcare: { displayName: 'Healthcare', description: 'AI tools for medical research, diagnosis, and patient care' },
      ecommerce: { displayName: 'E-Commerce', description: 'AI tools for online stores, product recommendations, and sales optimization' },
      productivity: { displayName: 'Productivity', description: 'AI tools for task management, notes, and workflow automation' },
    };

    const industriesWithInfo = industries.map(({ industry, count }) => ({
      industry,
      ...industryDisplayNames[industry] || { displayName: industry, description: '' },
      toolCount: count,
    }));

    return { industries: industriesWithInfo };
  })
  .get('/:industry', async ({ params, set }) => {
    const { industry } = params;

    const info = await getIndustryInfo(industry);

    if (!info) {
      set.status = 404;
      return { message: 'Industry not found' };
    }

    const topTools = await getTopToolsByIndustry(industry, 6);

    return {
      ...info,
      topTools,
    };
  });
