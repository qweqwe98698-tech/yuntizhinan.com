// 目录段 → 中文名映射：Breadcrumb.vue 与 config.mts 的 BreadcrumbList JSON-LD 共用
export const SECTION_LABELS: Record<string, string> = {
  airport: '机场推荐',
  reviews: '机场评测',
  compare: '机场对比',
  software: '软件百科',
  tutorials: '客户端教程',
  troubleshooting: '故障排查',
  protocols: '协议知识',
  security: '安全避坑',
  tools: '实用工具',
  news: '行业动态',
  about: '关于本站',
  'editorial-policy': '编辑政策',
  'affiliate-disclosure': '推广披露',
  'correction-policy': '纠错政策',
  privacy: '隐私政策'
}

export const SUB_LABELS: Record<string, Record<string, string>> = {
  troubleshooting: {
    timeout: '节点超时',
    login: '登录失败',
    verification: '验证码问题',
    websocket: 'WebSocket 断流',
    'mobile-data': '手机流量',
    dns: 'DNS 问题',
    speed: '速度问题'
  },
  tutorials: {
    windows: 'Windows',
    android: 'Android',
    iphone: 'iPhone',
    macos: 'macOS',
    linux: 'Linux',
    router: '路由器'
  },
  software: {
    ai: 'AI 工具',
    google: 'Google 服务',
    social: '社交媒体',
    streaming: '流媒体',
    developer: '开发者工具',
    office: '办公协作',
    gaming: '游戏平台',
    ecommerce: '跨境电商'
  }
}

export interface Crumb {
  text: string
  link?: string
}

// 由页面 relativePath 计算面包屑；最后一项为当前页（无链接）
export function breadcrumbFor(relativePath: string, pageTitle: string): Crumb[] {
  const parts = relativePath
    .replace(/\\/g, '/')
    .replace(/\.md$/, '')
    .split('/')

  if (parts[parts.length - 1] === 'index') parts.pop()

  const crumbs: Crumb[] = [{ text: '首页', link: '/' }]
  if (parts.length === 0) return crumbs

  const dirParts = parts.slice(0, -1)
  let acc = ''
  for (let i = 0; i < dirParts.length; i++) {
    const seg = dirParts[i]
    acc += `/${seg}`
    const label =
      i === 0
        ? SECTION_LABELS[seg] || seg
        : SUB_LABELS[dirParts[0]]?.[seg] || SECTION_LABELS[seg] || seg
    crumbs.push({ text: label, link: `${acc}/` })
  }

  crumbs.push({ text: pageTitle })
  return crumbs
}
