// 构建产物检查：关键文件存在、sitemap 不包含待实测/排除路径
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('docs/.vitepress/dist');
let errors = 0;

if (!fs.existsSync(distDir)) {
  console.error('❌ 构建目录不存在，请先运行 vitepress build');
  process.exit(1);
}

const criticalFiles = [
  'index.html',
  '404.html',
  'sitemap.xml',
  'robots.txt',
  'feed.xml',
  'llms.txt',
  'pagefind/pagefind.js',
  '_headers',
  '_redirects',
  'logo.svg',
  'favicon.svg'
];

for (const file of criticalFiles) {
  if (!fs.existsSync(path.join(distDir, file))) {
    console.error(`❌ 缺少关键产物: ${file}`);
    errors++;
  } else {
    console.log(`✅ ${file}`);
  }
}

const sitemap = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf-8');
const urlCount = (sitemap.match(/<loc>/g) || []).length;
console.log(`📑 sitemap 收录 ${urlCount} 个 URL`);

for (const blocked of ['/reviews/pending-', '/draft/', '/go/', '/404']) {
  if (sitemap.includes(blocked)) {
    console.error(`❌ sitemap 包含应排除的路径: ${blocked}`);
    errors++;
  }
}

if (urlCount === 0) {
  console.error('❌ sitemap 为空');
  errors++;
}

if (errors > 0) {
  console.error(`❌ 构建产物检查失败（${errors} 个错误）`);
  process.exit(1);
}
console.log('🎉 构建产物检查通过');
