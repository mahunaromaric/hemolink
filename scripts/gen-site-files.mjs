import { mkdirSync, writeFileSync } from 'node:fs'
import { getSiteUrl } from './site-url.mjs'

const publicDir = new URL('../public/', import.meta.url).pathname
const url = getSiteUrl()

mkdirSync(publicDir, { recursive: true })

writeFileSync(
  `${publicDir}robots.txt`,
  `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`,
)

writeFileSync(
  `${publicDir}sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${url}/</loc>\n    <lastmod>2026-08-15</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
)

console.log(`robots.txt et sitemap.xml générés avec ${url}`)