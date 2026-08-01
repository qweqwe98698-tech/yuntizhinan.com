// 链接与页面结构检查：坏内链、空 href、.md 链接、localhost 残留、乱码
import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';

const distDir = path.resolve('docs/.vitepress/dist');

if (!fs.existsSync(distDir)) {
  console.error('❌ 构建目录不存在，请先运行 vitepress build');
  process.exit(1);
}

console.log('🔍 开始链接与页面结构检查…');
let errors = 0;

const htmlFiles = await glob('**/*.html', { cwd: distDir });
console.log(`📑 检查 ${htmlFiles.length} 个 HTML 文件…`);

for (const file of htmlFiles) {
  const fullPath = path.join(distDir, file);
  const content = fs.readFileSync(fullPath, 'utf-8');

  if (content.includes('�') || content.includes('锟斤拷')) {
    console.error(`❌ ${file}: 检测到乱码字符`);
    errors++;
  }

  if (content.match(/http:\/\/localhost:\d+/i)) {
    console.error(`❌ ${file}: 残留 localhost 链接`);
    errors++;
  }

  if (content.match(/href="[^"]*\.md(?:#[^"]*)?"/i)) {
    console.error(`❌ ${file}: 存在直接指向 .md 的链接`);
    errors++;
  }

  if (content.match(/href=""/)) {
    console.error(`❌ ${file}: 存在空 href`);
    errors++;
  }

  const hashMatches = content.match(/<a[^>]*href="#"[^>]*>/g);
  if (hashMatches && hashMatches.length > 3) {
    console.warn(`⚠️ ${file}: 多个 href="#" 占位链接`);
  }

  const linkRegex = /<a[^>]*href="([^"]+)"[^>]*>/g;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(content)) !== null) {
    let href = linkMatch[1];
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('javascript:') ||
      href.startsWith('#')
    ) {
      continue;
    }
    href = href.split('#')[0].split('?')[0];
    if (!href || href === '/') continue;

    const targetPath = path.join(distDir, href);
    let valid = false;
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) valid = true;
    else if (fs.existsSync(`${targetPath}.html`)) valid = true;
    else if (fs.existsSync(path.join(targetPath, 'index.html'))) valid = true;

    if (!valid) {
      if (!href.startsWith('/_') && !href.startsWith('/assets/')) {
        console.error(`❌ ${file}: 坏内链 "${href}"`);
        errors++;
      }
    }
  }
}

if (errors > 0) {
  console.error(`❌ 链接检查失败（${errors} 个错误）`);
  process.exit(1);
}
console.log('🎉 链接与页面结构检查通过');
