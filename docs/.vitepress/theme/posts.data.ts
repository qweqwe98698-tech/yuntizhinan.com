import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  description?: string
  category?: string
  date: string
}

declare const data: Post[]
export { data }

export default createContentLoader('**/*.md', {
  includeSrc: false,
  render: false,
  transform(raw): Post[] {
    return raw
      .filter(({ url, frontmatter }) => {
        // 仅收录 type: article 且写明 date 的文章；排除草稿与待实测页
        if (frontmatter.type !== 'article' || !frontmatter.date) return false
        if (url.startsWith('/draft/') || url.startsWith('/reviews/pending-')) return false
        return true
      })
      .map(({ url, frontmatter }) => {
        let dateStr = frontmatter.date
        if (dateStr instanceof Date) {
          dateStr = dateStr.toISOString().split('T')[0]
        } else {
          dateStr = String(dateStr).split('T')[0]
        }

        return {
          title: frontmatter.title || '无标题文章',
          url,
          description: frontmatter.description || '',
          category: frontmatter.category || '未分类',
          date: dateStr
        }
      })
      .sort((a, b) => {
        if (a.date !== b.date) {
          return b.date.localeCompare(a.date)
        }
        return a.url.localeCompare(b.url)
      })
  }
})
