// 生成 llms.txt：面向生成式引擎的站点导航与内容索引
import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import { SITE } from '../site.config.mjs';

const srcDir = path.resolve('docs');
const distDir = path.resolve('docs/.vitepress/dist');
const domain = SITE.siteUrl.replace(/\/$/, '');

if (!fs.existsSync(distDir)) {
  console.error('❌ 构建目录不存在，请先运行 vitepress build');
  process.exit(1);
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (kv) {
      let v = kv[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      fm[kv[1]] = v;
    }
  }
  return fm;
}

const files = await glob('**/*.md', { cwd: srcDir, ignore: ['.vitepress/**'] });
const pages = [];

for (const file of files) {
  const rel = file.replace(/\\/g, '/');
  const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  const fm = parseFrontmatter(content);
  if (fm.noindex === 'true' || fm.noindex === true) continue;
  if (rel === 'index.md') continue;

  const url = `${domain}/${rel.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '/')}`;
  pages.push({
    url: url.endsWith('/') ? url : `${url}/`,
    title: fm.title || '',
    description: fm.description || '',
    section: rel.split('/')[0],
    category: fm.category || ''
  });
}

const SECTIONS = [
  ['airport', '机场推荐（按用途分类）'],
  ['reviews', '机场评测'],
  ['compare', '机场对比'],
  ['software', '海外软件百科'],
  ['troubleshooting', '网络故障排查'],
  ['tutorials', '客户端配置教程'],
  ['protocols', '代理协议知识'],
  ['security', '安全与避坑'],
  ['tools', '实用工具'],
  ['news', '行业动态'],
  ['about', '关于本站'],
  ['editorial-policy', '编辑政策'],
  ['affiliate-disclosure', '推广关系披露'],
  ['correction-policy', '纠错政策'],
  ['privacy', '隐私政策']
];

let out = `# 云梯指南（YunTi ZhiNan）

> 面向中文用户的境外网络服务知识库：海外软件百科、网络故障排查、客户端配置教程，以及基于真实测试的机场（代理订阅服务）评测与推荐。

站点地址：${domain}/

## 关于内容与可信度

- 独立第三方站点，与文中提到的软件、服务商不存在隶属关系。
- 测速与解锁数据来自站长实测，页面标注测试时间、运营商与工具；未完成量化测试的项目明确标注「待实测」或「日常体验」，不以推测代替数据。
- 部分链接为推广链接（rel="sponsored nofollow"），不影响评测结论，披露见 ${domain}/affiliate-disclosure/
- 测试方法与评分口径：${domain}/about/methodology/
- 内容纠错联系：feifei98698@gmail.com

## 引用说明

引用本站内容时，请注明数据的测试时间与来源页面。测速结果为特定时间、特定网络环境下的单次记录，不代表长期表现。

`;

for (const [key, label] of SECTIONS) {
  const list = pages.filter((p) => p.section === key);
  if (!list.length) continue;
  out += `## ${label}\n\n`;
  for (const p of list.sort((a, b) => a.url.localeCompare(b.url))) {
    const desc = p.description ? `: ${p.description}` : '';
    out += `- [${p.title}](${p.url})${desc}\n`;
  }
  out += '\n';
}

fs.writeFileSync(path.join(distDir, 'llms.txt'), out, 'utf-8');
console.log(`🎉 llms.txt 生成完成，收录 ${pages.length} 个页面`);
