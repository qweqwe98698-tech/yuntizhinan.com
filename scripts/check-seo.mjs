// SEO 合规检查：lang、唯一 title/description、canonical、单一 H1、图片 alt、OG
import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import * as cheerio from 'cheerio';
import { SITE } from '../site.config.mjs';

const distDir = path.resolve('docs/.vitepress/dist');
const domain = SITE.siteUrl.replace(/\/$/, '');

if (!fs.existsSync(distDir)) {
  console.error('❌ 构建目录不存在');
  process.exit(1);
}

console.log('🔍 开始 SEO 与标记合规检查…');
let errors = 0;
const pageTitles = new Map();

const htmlFiles = await glob('**/*.html', { cwd: distDir });

for (const file of htmlFiles) {
  if (file === '404.html') continue;
  const fullPath = path.join(distDir, file);
  const html = fs.readFileSync(fullPath, 'utf-8');
  const $ = cheerio.load(html);

  const lang = $('html').attr('lang');
  if (lang !== 'zh-CN') {
    console.error(`❌ ${file}: lang 属性错误（当前: ${lang}，应为 zh-CN）`);
    errors++;
  }

  const title = $('title').text().trim();
  if (!title) {
    console.error(`❌ ${file}: 缺少 <title>`);
    errors++;
  } else if (pageTitles.has(title)) {
    console.error(`❌ ${file}: title 与 ${pageTitles.get(title)} 重复 -> "${title}"`);
    errors++;
  } else {
    pageTitles.set(title, file);
  }

  const desc =
    $('meta[name="description"]').attr('content')?.trim() ||
    $('meta[property="og:description"]').attr('content')?.trim();
  if (!desc) {
    console.error(`❌ ${file}: 缺少 meta description`);
    errors++;
  }

  const h1Count = $('h1').length;
  if (h1Count === 0) {
    console.warn(`⚠️ ${file}: 没有 <h1>`);
  } else if (h1Count > 2) {
    console.warn(`⚠️ ${file}: 存在 ${h1Count} 个 <h1>`);
  }

  const canonical = $('link[rel="canonical"]').attr('href');
  if (!canonical) {
    console.error(`❌ ${file}: 缺少 canonical`);
    errors++;
  } else if (!canonical.startsWith(domain)) {
    console.error(`❌ ${file}: canonical 域名错误: ${canonical}`);
    errors++;
  }

  $('img').each((i, img) => {
    const src = $(img).attr('src') || 'unknown';
    const alt = $(img).attr('alt');
    if (alt === undefined || alt === null) {
      console.error(`❌ ${file}: 图片缺少 alt（src: ${src}）`);
      errors++;
    }
  });

  if (!$('meta[property="og:title"]').length && !$('meta[property="og:description"]').length) {
    console.warn(`⚠️ ${file}: 缺少 Open Graph 元数据`);
  }
}

if (errors > 0) {
  console.error(`❌ SEO 检查失败（${errors} 个错误）`);
  process.exit(1);
}
console.log(`🎉 SEO 检查通过（${htmlFiles.length} 个页面）`);
