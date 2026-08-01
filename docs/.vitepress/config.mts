import { defineConfig } from 'vitepress'
import { PROJECT } from '../../project.config'
import { nav } from './nav'
import { sidebar } from './sidebar'
import { breadcrumbFor } from './sections'

function canonicalFromRelativePath(relativePath: string) {
  const cleanPath = relativePath
    .replace(/\\/g, '/')
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')

  return new URL(cleanPath, PROJECT.siteUrl).toString()
}

function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().split('T')[0]
  return String(value).split('T')[0]
}

export default defineConfig({
  lang: PROJECT.locale,
  title: PROJECT.siteName,
  titleTemplate: `:title｜${PROJECT.siteName}`,
  description: PROJECT.slogan,

  base: PROJECT.base,
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: false,

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#2563eb' }],
    ['meta', { name: 'color-scheme', content: 'light' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, viewport-fit=cover'
    }]
  ],

  sitemap: {
    hostname: PROJECT.siteUrl,
    lastmodDateOnly: false,
    transformItems(items) {
      return items.filter((item) => {
        const url = item.url || ''
        return ![
          '/search',
          '/404',
          '/go/',
          '/draft/',
          '/reviews/pending-',
          'reviews/pending-'
        ].some((blocked) => url.includes(blocked))
      })
    }
  },

  markdown: {
    lineNumbers: false,
    headers: true,
    theme: {
      light: 'github-light',
      dark: 'github-light'
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: PROJECT.siteName,

    nav,
    sidebar,

    outline: {
      level: [2, 4],
      label: '本文目录'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新'
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色',
    darkModeSwitchTitle: '切换到深色',

    footer: {
      message: '独立第三方教程与评测平台，与文中品牌不存在官方隶属关系。',
      copyright: `© ${new Date().getFullYear()} ${PROJECT.siteName}`
    }
  },

  transformPageData(pageData) {
    const fm = pageData.frontmatter
    const canonical = canonicalFromRelativePath(pageData.relativePath)
    const pageTitle = fm.title || pageData.title || PROJECT.siteName
    const pageDescription = fm.description || PROJECT.slogan
    const ogImage = new URL(
      fm.image || PROJECT.defaultOgImage,
      PROJECT.siteUrl
    ).toString()
    const logoUrl = new URL('/logo.svg', PROJECT.siteUrl).toString()
    const isHome = pageData.relativePath === 'index.md'

    fm.head ??= []

    fm.head.push(
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { property: 'og:type', content: fm.type === 'article' ? 'article' : 'website' }],
      ['meta', { property: 'og:site_name', content: PROJECT.siteName }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDescription }],
      ['meta', { name: 'twitter:image', content: ogImage }]
    )

    if (fm.noindex === true) {
      fm.head.push(['meta', {
        name: 'robots',
        content: 'noindex, nofollow'
      }])
    } else {
      fm.head.push(['meta', {
        name: 'robots',
        content: 'index, follow, max-image-preview:large'
      }])
    }

    // 供 RSS 与 BlogPosting 使用的文章时间
    if (fm.type === 'article' && fm.date) {
      fm.head.push(['meta', {
        property: 'article:published_time',
        content: toIsoDate(fm.date)
      }])
      if (fm.updated) {
        fm.head.push(['meta', {
          property: 'article:modified_time',
          content: toIsoDate(fm.updated)
        }])
      }
    }

    if (fm.category) {
      fm.head.push(['meta', {
        'data-pagefind-filter': 'category[content]',
        content: String(fm.category)
      }])
    }

    if (Array.isArray(fm.tags)) {
      for (const tag of fm.tags) {
        fm.head.push(['meta', {
          'data-pagefind-filter': 'tag[content]',
          content: String(tag)
        }])
      }
    }

    // JSON-LD 结构化数据（不输出任何评分类型）
    const jsonLd: Record<string, unknown>[] = []

    if (isHome) {
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: PROJECT.siteName,
        url: PROJECT.siteUrl,
        logo: logoUrl
      })
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: PROJECT.siteName,
        url: PROJECT.siteUrl,
        inLanguage: 'zh-CN'
      })
    } else {
      const crumbs = breadcrumbFor(pageData.relativePath, pageTitle)
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.text,
          ...(crumb.link
            ? { item: new URL(crumb.link, PROJECT.siteUrl).toString() }
            : {})
        }))
      })

      if (fm.type === 'article' && fm.date) {
        jsonLd.push({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: pageTitle,
          description: pageDescription,
          url: canonical,
          mainEntityOfPage: canonical,
          image: ogImage,
          inLanguage: 'zh-CN',
          datePublished: toIsoDate(fm.date),
          ...(fm.updated ? { dateModified: toIsoDate(fm.updated) } : {}),
          author: {
            '@type': 'Organization',
            name: fm.author || PROJECT.author
          },
          publisher: {
            '@type': 'Organization',
            name: PROJECT.siteName,
            logo: {
              '@type': 'ImageObject',
              url: logoUrl
            }
          }
        })
      }
    }

    for (const obj of jsonLd) {
      fm.head.push(['script', { type: 'application/ld+json' }, JSON.stringify(obj)])
    }
  }
})
