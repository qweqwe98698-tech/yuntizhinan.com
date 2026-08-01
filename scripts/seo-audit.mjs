// 全站 SEO/GEO 审计报告（只读，不修改文件）：标题/描述长度、结构化数据覆盖、OG、日期元数据
import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';

const dist = path.resolve('docs/.vitepress/dist');
const files = (await glob('**/*.html', { cwd: dist })).filter(f => f !== '404.html');

const longTitle = [], shortDesc = [], longDesc = [], noJsonLd = [], noBreadcrumb = [], ogImageMissing = [];
let articleLd = 0, published = 0, noindex = 0, faqLd = 0, howtoLd = 0;

for (const f of files) {
  const html = fs.readFileSync(path.join(dist, f), 'utf-8');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const bareTitle = title.replace(/｜云梯指南$/, '');
  if (bareTitle.length > 32) longTitle.push(`${f} (${bareTitle.length})`);
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  if (desc.length < 50) shortDesc.push(`${f} (${desc.length})`);
  if (desc.length > 160) longDesc.push(`${f} (${desc.length})`);
  if (!html.includes('application/ld+json')) noJsonLd.push(f);
  if (!html.includes('BreadcrumbList') && f !== 'index.html') noBreadcrumb.push(f);
  if (html.includes('"BlogPosting"')) articleLd++;
  if (html.includes('"FAQPage"')) faqLd++;
  if (html.includes('"HowTo"')) howtoLd++;
  if (html.includes('article:published_time')) published++;
  if (html.includes('noindex')) noindex++;
  if (!html.includes('og:image')) ogImageMissing.push(f);
}

console.log(`页面总数: ${files.length}（不含 404）`);
console.log(`BlogPosting: ${articleLd} | FAQPage: ${faqLd} | HowTo: ${howtoLd} | published_time: ${published} | noindex: ${noindex}`);
console.log(`无 JSON-LD: ${noJsonLd.length} ${noJsonLd.slice(0, 5).join(', ')}`);
console.log(`缺 BreadcrumbList: ${noBreadcrumb.length} ${noBreadcrumb.slice(0, 5).join(', ')}`);
console.log(`缺 og:image: ${ogImageMissing.length}`);
console.log(`标题超 32 字: ${longTitle.length}`);
longTitle.forEach(t => console.log('  ' + t));
console.log(`描述 <50 字符: ${shortDesc.length} ${shortDesc.join(', ')}`);
console.log(`描述 >160 字符: ${longDesc.length}`);
longDesc.slice(0, 15).forEach(t => console.log('  ' + t));
