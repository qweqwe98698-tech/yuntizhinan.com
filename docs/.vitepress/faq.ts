import fs from 'node:fs'
import path from 'node:path'

export interface FaqItem {
  question: string
  answer: string
}

// 把 Markdown 行内标记还原为纯文本，供 JSON-LD 使用
function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // 链接保留文字
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanQuestion(text: string): string {
  return stripMarkdown(text).replace(/^问[：:]\s*/, '').replace(/[：:]$/, '')
}

function cleanAnswer(text: string): string {
  return stripMarkdown(text).replace(/^答[：:]\s*/, '').replace(/^[：:]\s*/, '')
}

/**
 * 从 Markdown 源文件中提取 FAQ 问答对。
 * 兼容站内五种写法：
 *   **问：Q**      + 次行「答：A」或纯答案
 *   **Q？**        + 次行答案 / 同行答案
 *   ### Q？        + 段落答案
 *   - **Q**：A     （列表式，冒号后为答案）
 * 页面同时存在「常见问题」与「FAQ」两个章节时合并收录。
 */
export function extractFaq(srcDir: string, relativePath: string): FaqItem[] {
  const filePath = path.join(srcDir, relativePath)
  if (!fs.existsSync(filePath)) return []

  const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/)
  const items: FaqItem[] = []

  // 收集所有 FAQ / 常见问题章节的行区间
  const sections: Array<[number, number]> = []
  for (let i = 0; i < lines.length; i++) {
    if (!/^##\s+(FAQ|常见问题)/.test(lines[i])) continue
    let end = lines.length
    for (let j = i + 1; j < lines.length; j++) {
      if (/^##\s/.test(lines[j])) {
        end = j
        break
      }
    }
    sections.push([i + 1, end])
  }

  for (const [start, end] of sections) {
    let current: FaqItem | null = null

    const flush = () => {
      if (current && current.answer) items.push(current)
      current = null
    }

    for (let i = start; i < end; i++) {
      const line = lines[i].trim()
      if (!line) continue

      // ### 问题？
      const headingMatch = line.match(/^###+\s+(.+)$/)
      if (headingMatch) {
        flush()
        current = { question: cleanQuestion(headingMatch[1]), answer: '' }
        continue
      }

      // - **问题**：答案 / **问题** 答案
      const listMatch = line.match(/^[-*]\s+\*\*(.+?)\*\*\s*[：:]?\s*(.*)$/)
      if (listMatch) {
        flush()
        current = { question: cleanQuestion(listMatch[1]), answer: cleanAnswer(listMatch[2]) }
        continue
      }

      // **问题** 独立成行或同行带答案
      const boldMatch = line.match(/^\*\*(.+?)\*\*\s*(.*)$/)
      if (boldMatch) {
        flush()
        current = { question: cleanQuestion(boldMatch[1]), answer: cleanAnswer(boldMatch[2]) }
        continue
      }

      if (current) {
        const answerLine = cleanAnswer(line.replace(/^[-*]\s+/, ''))
        if (answerLine) {
          current.answer = current.answer ? `${current.answer} ${answerLine}` : answerLine
        }
      }
    }

    flush()
  }

  return items.filter((item) => item.question.length > 3 && item.answer.length > 10)
}
