// app/sitemap.js

import supabase from "@/lib/supabase";

const URL = "https://aitools.sh";

async function sitemap() {
  const {data: categories} = await supabase.from("tools_categ").select("*");

  const categoryRoutes = categories!.map(({category}) => ({
    url: `${URL}/categories/${category}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ["", "/free", "/paid", "/categories"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...categoryRoutes];
}

function generateSiteMap(links: {url: string; lastModified: string}[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      <!--We manually set the two URLs we know already-->
        ${links
          .map(
            ({url, lastModified}) =>
              `<url>
                <loc>${url}</loc>
                <lastmod>${lastModified}</lastmod>
            </url>
            `
          )
          .join("")}
      </urlset>
    `;
}

export async function GET() {
  const posts = await sitemap();
  const body = generateSiteMap(posts);

  return new Response(body, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  });
}
