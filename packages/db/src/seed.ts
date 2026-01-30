import { db } from './client';
import * as schema from './schema';

const sampleTools = [
  {
    name: 'ChatGPT',
    slug: 'chatgpt',
    tagline: 'AI-powered conversational assistant',
    description: 'ChatGPT is an AI-powered conversational assistant that can help with writing, analysis, coding, creative projects, and answering questions across a wide range of topics.',
    website: 'https://chatgpt.com',
    logo: 'https://placehold.co/100x100?text=CG',
    categories: ['copywriting', 'code-generation', 'research'],
    industries: ['marketing', 'development', 'education'],
    pricingType: 'freemium',
    features: ['Natural language processing', 'Code generation', 'Creative writing', 'Analysis and research'],
    pros: ['Highly capable', 'Easy to use', 'Regular updates'],
    cons: ['Can hallucinate', 'Requires internet'],
    isOpenSource: false,
    hasAffiliate: false,
    status: 'approved',
    confidence: '0.95',
    publishedAt: new Date(),
  },
  {
    name: 'Claude',
    slug: 'claude',
    tagline: 'AI assistant from Anthropic',
    description: 'Claude is an AI assistant created by Anthropic. It excels at thoughtful analysis, coding, writing, and helpful conversations.',
    website: 'https://claude.ai',
    logo: 'https://placehold.co/100x100?text=C',
    categories: ['copywriting', 'code-generation', 'research'],
    industries: ['marketing', 'development', 'legal'],
    pricingType: 'freemium',
    features: ['Long context window', 'Thoughtful responses', 'Document analysis'],
    pros: ['Large context', 'Careful reasoning', 'Helpful tone'],
    cons: ['Limited availability', 'No web browsing'],
    isOpenSource: false,
    hasAffiliate: false,
    status: 'approved',
    confidence: '0.93',
    publishedAt: new Date(),
  },
  {
    name: 'Midjourney',
    slug: 'midjourney',
    tagline: 'AI image generation platform',
    description: 'Midjourney is an AI-powered image generation tool that creates stunning artwork from text descriptions.',
    website: 'https://midjourney.com',
    logo: 'https://placehold.co/100x100?text=MJ',
    categories: ['image-generation', 'design'],
    industries: ['design', 'content-creation', 'marketing'],
    pricingType: 'paid',
    features: ['High-quality images', 'Artistic styles', 'Discord integration'],
    pros: ['Stunning quality', 'Artistic results', 'Active community'],
    cons: ['Discord-only access', 'Subscription required'],
    isOpenSource: false,
    hasAffiliate: true,
    affiliateUrl: 'https://midjourney.com/?ref=aitools',
    status: 'approved',
    confidence: '0.96',
    publishedAt: new Date(),
  },
  {
    name: 'TensorFlow',
    slug: 'tensorflow',
    tagline: 'Open source machine learning platform',
    description: 'TensorFlow is an open-source machine learning framework for everyone. It is used for research and production at Google.',
    website: 'https://tensorflow.org',
    logo: 'https://placehold.co/100x100?text=TF',
    categories: ['data-analysis', 'automation', 'code-generation'],
    industries: ['development', 'research'],
    pricingType: 'free',
    features: ['Deep learning', 'Neural networks', 'Production ready'],
    pros: ['Industry standard', 'Google backed', 'Comprehensive docs'],
    cons: ['Steep learning curve', 'Complex API'],
    isOpenSource: true,
    repository: 'https://github.com/tensorflow/tensorflow',
    license: 'Apache-2.0',
    selfHostable: true,
    dockerSupport: true,
    setupDifficulty: 'hard',
    hasAffiliate: false,
    status: 'approved',
    confidence: '0.98',
    publishedAt: new Date(),
  },
  {
    name: 'Stable Diffusion',
    slug: 'stable-diffusion',
    tagline: 'Open source image generation',
    description: 'Stable Diffusion is a deep learning, text-to-image model released in 2022. It is primarily used to generate detailed images conditioned on text descriptions.',
    website: 'https://stability.ai',
    logo: 'https://placehold.co/100x100?text=SD',
    categories: ['image-generation', 'design'],
    industries: ['design', 'content-creation'],
    pricingType: 'free',
    features: ['Text-to-image', 'Image editing', 'Local deployment'],
    pros: ['Open source', 'Runs locally', 'Highly customizable'],
    cons: ['Hardware requirements', 'Complex setup'],
    isOpenSource: true,
    repository: 'https://github.com/Stability-AI/stablediffusion',
    license: 'CreativeML Open RAIL-M',
    selfHostable: true,
    dockerSupport: true,
    setupDifficulty: 'medium',
    hasAffiliate: false,
    status: 'approved',
    confidence: '0.97',
    publishedAt: new Date(),
  },
  {
    name: 'Notion AI',
    slug: 'notion-ai',
    tagline: 'AI-powered workspace assistant',
    description: 'Notion AI is an integrated artificial intelligence assistant within the Notion workspace platform.',
    website: 'https://notion.so',
    logo: 'https://placehold.co/100x100?text=NAI',
    categories: ['copywriting', 'summarization', 'collaboration'],
    industries: ['productivity', 'content-creation'],
    pricingType: 'paid',
    features: ['Content generation', 'Summarization', 'Translation'],
    pros: ['Integrated in Notion', 'Easy to use', 'Context aware'],
    cons: ['Requires Notion subscription', 'Limited customization'],
    isOpenSource: false,
    hasAffiliate: true,
    affiliateUrl: 'https://notion.so/?ref=aitools',
    status: 'approved',
    confidence: '0.92',
    publishedAt: new Date(),
  },
  {
    name: 'Hugging Face',
    slug: 'hugging-face',
    tagline: 'The AI community building the future',
    description: 'Hugging Face is a community and data science platform that provides tools to enable users to build, train and deploy ML models.',
    website: 'https://huggingface.co',
    logo: 'https://placehold.co/100x100?text=HF',
    categories: ['data-analysis', 'code-generation', 'collaboration'],
    industries: ['development', 'research'],
    pricingType: 'freemium',
    features: ['Model hub', 'Datasets', 'Inference API'],
    pros: ['Large model repository', 'Open source', 'Community driven'],
    cons: ['Can be overwhelming', 'Some models require approval'],
    isOpenSource: true,
    repository: 'https://github.com/huggingface/transformers',
    license: 'Apache-2.0',
    selfHostable: true,
    dockerSupport: true,
    setupDifficulty: 'easy',
    hasAffiliate: false,
    status: 'approved',
    confidence: '0.99',
    publishedAt: new Date(),
  },
  {
    name: 'Runway ML',
    slug: 'runway-ml',
    tagline: 'AI-powered creative tools',
    description: 'Runway ML is an applied AI research company building the next era of art, entertainment and human creativity.',
    website: 'https://runwayml.com',
    logo: 'https://placehold.co/100x100?text=RW',
    categories: ['video-editing', 'image-generation', 'design'],
    industries: ['design', 'content-creation', 'marketing'],
    pricingType: 'paid',
    features: ['Video generation', 'Image editing', 'Motion capture'],
    pros: ['Cutting edge features', 'Professional tools', 'High quality output'],
    cons: ['Expensive', 'Credit system can be limiting'],
    isOpenSource: false,
    hasAffiliate: true,
    affiliateUrl: 'https://runwayml.com/?ref=aitools',
    status: 'approved',
    confidence: '0.91',
    publishedAt: new Date(),
  },
  {
    name: 'Whisper',
    slug: 'whisper',
    tagline: 'OpenAI speech recognition',
    description: 'Whisper is a general-purpose speech recognition model by OpenAI. It is trained on a large dataset of diverse audio and is also a multi-task model.',
    website: 'https://openai.com/whisper',
    logo: 'https://placehold.co/100x100?text=W',
    categories: ['transcription', 'audio-generation'],
    industries: ['content-creation', 'education'],
    pricingType: 'free',
    features: ['Speech-to-text', 'Multilingual', 'Translation'],
    pros: ['Highly accurate', 'Open source', 'Multiple languages'],
    cons: ['Requires technical setup', 'GPU recommended'],
    isOpenSource: true,
    repository: 'https://github.com/openai/whisper',
    license: 'MIT',
    selfHostable: true,
    dockerSupport: true,
    setupDifficulty: 'medium',
    hasAffiliate: false,
    status: 'approved',
    confidence: '0.98',
    publishedAt: new Date(),
  },
  {
    name: 'Copy.ai',
    slug: 'copy-ai',
    tagline: 'AI copywriting assistant',
    description: 'Copy.ai is an AI-powered copywriting tool that helps you generate marketing copy, blog posts, social media content, and more.',
    website: 'https://copy.ai',
    logo: 'https://placehold.co/100x100?text=CA',
    categories: ['copywriting', 'marketing'],
    industries: ['marketing', 'content-creation'],
    pricingType: 'freemium',
    features: ['Marketing copy', 'Blog posts', 'Social media content'],
    pros: ['Easy to use', 'Many templates', 'Good for beginners'],
    cons: ['Output can be generic', 'Requires editing'],
    isOpenSource: false,
    hasAffiliate: true,
    affiliateUrl: 'https://copy.ai/?ref=aitools',
    status: 'approved',
    confidence: '0.89',
    publishedAt: new Date(),
  },
];

const sampleSubmissions = [
  {
    name: 'Jasper AI',
    description: 'AI writing assistant for marketing teams',
    website: 'https://jasper.ai',
    source: 'user_submission',
    submitterEmail: 'user@example.com',
    status: 'pending',
    confidence: '0.85',
  },
  {
    name: 'DALL-E 3',
    description: 'OpenAI latest image generation model',
    website: 'https://openai.com/dall-e-3',
    source: 'user_submission',
    submitterEmail: 'another@example.com',
    status: 'pending',
    confidence: '0.95',
  },
  {
    name: 'Anthropic Constitutional AI',
    description: 'AI assistant with safety principles',
    website: 'https://anthropic.com',
    source: 'product_hunt',
    status: 'pending',
    confidence: '0.88',
  },
  {
    name: 'GitHub Copilot',
    description: 'AI pair programmer',
    website: 'https://github.com/copilot',
    source: 'github',
    status: 'duplicate',
    confidence: '0.92',
  },
  {
    name: 'Perplexity AI',
    description: 'AI-powered search engine',
    website: 'https://perplexity.ai',
    source: 'user_submission',
    submitterEmail: 'founder@startup.com',
    status: 'pending',
    confidence: '0.90',
  },
];

async function seed() {
  console.log('🌱 Starting database seed...\n');

  try {
    console.log('Clearing existing data...');
    await db.delete(schema.githubStats);
    await db.delete(schema.favorites);
    await db.delete(schema.affiliateClicks);
    await db.delete(schema.tokenPurchases);
    await db.delete(schema.couponUsages);
    await db.delete(schema.coupons);
    await db.delete(schema.messages);
    await db.delete(schema.conversations);
    await db.delete(schema.scrapedTools);
    await db.delete(schema.tools);
    await db.delete(schema.users);
    console.log('✓ Database cleared\n');

    console.log(`Inserting ${sampleTools.length} tools...`);
    const insertedTools = await db.insert(schema.tools).values(sampleTools).returning();
    console.log(`✓ Inserted ${insertedTools.length} tools\n`);

    console.log(`Inserting ${sampleSubmissions.length} submissions...`);
    const insertedSubmissions = await db.insert(schema.scrapedTools).values(sampleSubmissions).returning();
    console.log(`✓ Inserted ${insertedSubmissions.length} submissions\n`);

    console.log('Adding sample GitHub stats for open source tools...');
    const ossTools = insertedTools.filter(t => t.isOpenSource === true);
    const githubStatsData = [];
    for (const tool of ossTools) {
      if (tool.repository) {
        githubStatsData.push({
          toolId: tool.id,
          repository: tool.repository,
          stars: Math.floor(Math.random() * 50000) + 1000,
          forks: Math.floor(Math.random() * 5000) + 100,
          watchers: Math.floor(Math.random() * 1000) + 50,
          openIssues: Math.floor(Math.random() * 200) + 10,
          lastCommitDate: new Date(),
          contributors: Math.floor(Math.random() * 100) + 10,
          primaryLanguage: ['Python', 'TypeScript', 'Go'][Math.floor(Math.random() * 3)],
          license: tool.license || 'MIT',
        });
      }
    }

    if (githubStatsData.length > 0) {
      await db.insert(schema.githubStats).values(githubStatsData);
      console.log(`✓ Inserted ${githubStatsData.length} GitHub stats\n`);
    }

    console.log('Adding sample affiliate clicks...');
    const affiliateTools = insertedTools.filter(t => t.hasAffiliate === true);
    const clicksData = [];
    for (const tool of affiliateTools) {
      for (let i = 0; i < 5; i++) {
        clicksData.push({
          toolId: tool.id,
          ipHash: `hash_${Math.random().toString(36).substring(7)}`,
          referrer: ['https://aitools.sh', 'https://google.com', 'https://twitter.com'][Math.floor(Math.random() * 3)],
          country: ['US', 'UK', 'CA', 'DE'][Math.floor(Math.random() * 4)],
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
        });
      }
    }

    if (clicksData.length > 0) {
      await db.insert(schema.affiliateClicks).values(clicksData);
      console.log(`✓ Inserted ${clicksData.length} affiliate clicks\n`);
    }

    console.log('✅ Seed completed successfully!');
    console.log('\nSummary:');
    console.log(`- ${insertedTools.length} tools`);
    console.log(`- ${insertedSubmissions.length} submissions`);
    console.log(`- ${githubStatsData.length} GitHub stats`);
    console.log(`- ${clicksData.length} affiliate clicks`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
