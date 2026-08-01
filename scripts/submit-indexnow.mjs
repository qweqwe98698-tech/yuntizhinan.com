// IndexNow 提交：读取 dist/sitemap.xml 的 URL 列表并提交到 api.indexnow.org
// 使用前：在 site.config.mjs 填入 indexNowKey，并把 <key>.txt（内容为 key 本身）放入 docs/public/
import fs from 'node:fs';
import path from 'node:path';
import { SITE } from '../site.config.mjs';

const distDir = path.resolve('docs/.vitepress/dist');
const sitemapPath = path.join(distDir, 'sitemap.xml');

if (!SITE.indexNowKey) {
  console.log('ℹ️ 未配置 IndexNow key（site.config.mjs -> indexNowKey），跳过提交');
  process.exit(0);
}

if (!fs.existsSync(sitemapPath)) {
  console.error('❌ 找不到 sitemap.xml，请先运行 npm run build');
  process.exit(1);
}

const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

if (!urls.length) {
  console.error('❌ sitemap 中没有 URL');
  process.exit(1);
}

const host = new URL(SITE.siteUrl).host;
const keyLocation = `${SITE.siteUrl.replace(/\/$/, '')}/${SITE.indexNowKey}.txt`;

console.log(`📤 向 IndexNow 提交 ${urls.length} 个 URL（host: ${host}）…`);

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: SITE.indexNowKey, keyLocation, urlList: urls })
});

if (response.ok || response.status === 202) {
  console.log(`🎉 提交成功（HTTP ${response.status}）`);
} else {
  console.error(`❌ 提交失败（HTTP ${response.status}）: ${await response.text()}`);
  process.exit(1);
}
