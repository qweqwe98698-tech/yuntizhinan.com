// 源文件质检：frontmatter 必填字段、title/description 全站唯一、日期格式
import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';

const docsDir = path.resolve('docs');
const files = (await glob('**/*.md', { cwd: docsDir, ignore: ['.vitepress/**', 'node_modules/**'] })).sort();

let errors = 0;
let warnings = 0;
const titles = new Map();
const descriptions = new Map();

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (kv) {
      let value = kv[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      fm[kv[1]] = value;
    }
  }
  return { raw: match[1], fields: fm };
}

console.log(`🔍 检查 ${files.length} 个 Markdown 源文件…`);

for (const file of files) {
  const content = fs.readFileSync(path.join(docsDir, file), 'utf-8');
  const parsed = parseFrontmatter(content);

  if (!parsed) {
    console.error(`❌ ${file}: 缺少 frontmatter`);
    errors++;
    continue;
  }

  const fm = parsed.fields;

  if (!fm.title) {
    console.error(`❌ ${file}: 缺少 title`);
    errors++;
  } else if (titles.has(fm.title)) {
    console.error(`❌ ${file}: title 与 ${titles.get(fm.title)} 重复 -> "${fm.title}"`);
    errors++;
  } else {
    titles.set(fm.title, file);
  }

  if (!fm.description) {
    console.error(`❌ ${file}: 缺少 description`);
    errors++;
  } else {
    if (descriptions.has(fm.description)) {
      console.error(`❌ ${file}: description 与 ${descriptions.get(fm.description)} 重复`);
      errors++;
    } else {
      descriptions.set(fm.description, file);
    }
    if (fm.description.length < 40 || fm.description.length > 200) {
      console.warn(`⚠️ ${file}: description 长度 ${fm.description.length}（建议 60-160 字符）`);
      warnings++;
    }
  }

  if (fm.type === 'article') {
    for (const field of ['date', 'category', 'author']) {
      if (!fm[field]) {
        console.error(`❌ ${file}: 文章缺少 ${field}`);
        errors++;
      }
    }
    if (fm.date && !/^\d{4}-\d{2}-\d{2}$/.test(fm.date)) {
      console.error(`❌ ${file}: date 格式应为 YYYY-MM-DD，当前为 "${fm.date}"`);
      errors++;
    }
    if (fm.updated && !/^\d{4}-\d{2}-\d{2}$/.test(fm.updated)) {
      console.error(`❌ ${file}: updated 格式应为 YYYY-MM-DD，当前为 "${fm.updated}"`);
      errors++;
    }
  }

  // YAML 陷阱：值里出现「半角冒号+空格」会破坏解析，要求引号包裹
  for (const line of parsed.raw.split(/\r?\n/)) {
    const kv = line.match(/^(title|description):\s*(.*)$/);
    if (kv && !kv[2].startsWith('"') && !kv[2].startsWith("'") && /: /.test(kv[2])) {
      console.error(`❌ ${file}: ${kv[1]} 含未加引号的「: 」，会导致 YAML 解析错误`);
      errors++;
    }
  }
}

console.log(`\n共 ${files.length} 文件，${errors} 错误，${warnings} 警告`);
if (errors > 0) process.exit(1);
console.log('🎉 源文件检查通过');
