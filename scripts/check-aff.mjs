// 合规检查：所有指向推广域名的 <a> 必须带 rel="sponsored nofollow"
import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';

const distDir = path.resolve('docs/.vitepress/dist');
const AFF = /gsyvipaff|flycataff|civetnet|xingdaomeng\.com|v2yunvipaff|gcvipaff|2maoyunaff|jlyvipaff|gntaff|kosingaff|vipaff\.cc/;

const files = await glob('**/*.html', { cwd: distDir });
let total = 0, missing = 0;

for (const f of files) {
  const html = fs.readFileSync(path.join(distDir, f), 'utf-8');
  const anchors = html.match(/<a\b[^>]*>/g) || [];
  for (const a of anchors) {
    const href = (a.match(/href="([^"]+)"/) || [])[1] || '';
    if (!AFF.test(href)) continue;
    total++;
    const rel = (a.match(/rel="([^"]*)"/) || [])[1] || '';
    if (!rel.includes('sponsored') || !rel.includes('nofollow')) {
      missing++;
      console.error(`❌ ${f}\n   ${a.slice(0, 150)}`);
    }
  }
}

console.log(`推广链接 <a> 总数: ${total} | 缺少 sponsored/nofollow: ${missing}`);
if (missing > 0) process.exit(1);
console.log('🎉 推广链接标注检查通过');
