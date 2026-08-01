// 从构建产物生成 RSS（feed.xml）：仅收录含 article:published_time 的文章页
import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import { SITE } from '../site.config.mjs';

const distDir = path.resolve('docs/.vitepress/dist');
const domain = SITE.siteUrl.replace(/\/$/, '');
const feedPath = path.join(distDir, 'feed.xml');
const SITE_TITLE = '云梯指南｜海外软件百科与机场评测推荐';
const SITE_DESC = '海外软件百科、网络故障排查、客户端教程与机场评测推荐知识库。';

if (!fs.existsSync(distDir)) {
  console.error('❌ 构建目录不存在，请先运行 vitepress build');
  process.exit(1);
}

console.log('📡 生成 RSS feed.xml…');

const files = await glob('**/*.html', { cwd: distDir });
const items = [];

for (const file of files) {
  const normalized = file.replace(/\\/g, '/');
  if (normalized === 'index.html' || normalized === '404.html') continue;
  if (normalized.startsWith('reviews/pending-') || normalized.startsWith('draft/')) continue;

  const content = fs.readFileSync(path.join(distDir, file), 'utf-8');

  const publishedMatch = content.match(/<meta property="article:published_time" content="([^"]+)"/i);
  if (!publishedMatch) continue;

  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const descMatch =
    content.match(/<meta name="description" content="([^"]+)"/i) ||
    content.match(/<meta property="og:description" content="([^"]+)"/i);
  if (!titleMatch) continue;

  let urlPath = normalized.replace(/\.html$/, '');
  if (urlPath.endsWith('/index')) urlPath = urlPath.slice(0, -'/index'.length);
  const link = `${domain}/${urlPath}`;

  items.push({
    title: titleMatch[1].split('｜')[0].trim(),
    link,
    description: descMatch ? descMatch[1].trim() : SITE_DESC,
    isoDate: publishedMatch[1],
    date: new Date(`${publishedMatch[1]}T08:00:00Z`).toUTCString()
  });
}

items.sort((a, b) => b.isoDate.localeCompare(a.isoDate));
const latest = items.slice(0, 50);

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${domain}/</link>
    <description>${SITE_DESC}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${domain}/feed.xml" rel="self" type="application/rss+xml"/>
    ${latest.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.date}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;

fs.writeFileSync(feedPath, rssXml, 'utf-8');
console.log(`🎉 feed.xml 生成完成，共 ${latest.length} 篇文章（候选 ${items.length}）`);
