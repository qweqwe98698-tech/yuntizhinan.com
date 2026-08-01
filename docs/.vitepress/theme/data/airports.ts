// 机场品牌数据唯一来源（组件与页面都从这里读取）。
// 占位规则：
//  - affLink 为空 → 所有转化按钮不渲染，卡片按钮区显示「官网入口整理中」
//  - tested 为 false → 组件显示「待实测」徽章，禁止展示评分与解锁结论
//  - 填入真实品牌时补齐 website/affLink/priceFrom/plans，并在完成实测后把 tested 改为 true
export type TestResult = 'passed' | 'failed' | 'untested'

export interface AirportPlan {
  name: string
  price: string
  traffic: string
  period: string
}

export interface AirportBrand {
  id: string
  name: string
  website: string
  affLink: string
  priceFrom: string
  plans?: AirportPlan[]
  lineTypes: string[]
  regions: string[]
  clients: string[]
  // 必须取自 AIRPORT_TAGS，与 /airport/ 12 个用途子页一一对应
  tags: string[]
  features: string[]
  unlock?: { ai?: TestResult; streaming?: TestResult; google?: TestResult }
  tested: boolean
  lastChecked?: string
  reviewLink?: string
  highlight?: boolean
}

export const AIRPORT_TAGS = [
  '综合推荐',
  '稳定',
  '便宜',
  'AI工具',
  'Google',
  '海外社交',
  '流媒体',
  '开发者',
  '游戏',
  '跨境办公',
  'Clash',
  '小火箭'
] as const

const PENDING_FEATURES = [
  '候选品牌，等待本站标准流程实测',
  '线路与套餐信息整理核对中',
  '实测完成后更新测速与解锁数据',
  '当前阶段不构成购买建议'
]

export const airports: AirportBrand[] = [
  {
    id: 'pending-a',
    name: '品牌位 A',
    website: '',
    affLink: '',
    priceFrom: '待定',
    lineTypes: ['IEPL'],
    regions: ['香港', '日本', '新加坡', '美国'],
    clients: ['Clash', 'Shadowrocket', 'sing-box'],
    tags: ['综合推荐', '稳定', 'AI工具', '流媒体', '海外社交', 'Clash', '小火箭'],
    features: PENDING_FEATURES,
    tested: false,
    reviewLink: '/reviews/pending-a/'
  },
  {
    id: 'pending-b',
    name: '品牌位 B',
    website: '',
    affLink: '',
    priceFrom: '待定',
    lineTypes: ['公网中转'],
    regions: ['香港', '台湾', '日本', '美国'],
    clients: ['Clash', 'Shadowrocket', 'v2rayN'],
    tags: ['综合推荐', '便宜', 'Google', '海外社交', '游戏', 'Clash', '小火箭'],
    features: PENDING_FEATURES,
    tested: false,
    reviewLink: '/reviews/pending-b/'
  },
  {
    id: 'pending-c',
    name: '品牌位 C',
    website: '',
    affLink: '',
    priceFrom: '待定',
    lineTypes: ['IPLC'],
    regions: ['香港', '新加坡', '美国', '英国'],
    clients: ['Clash', 'sing-box', 'Surge'],
    tags: ['稳定', '开发者', 'AI工具', 'Google', '跨境办公', 'Clash'],
    features: PENDING_FEATURES,
    tested: false,
    reviewLink: '/reviews/pending-c/'
  },
  {
    id: 'pending-d',
    name: '品牌位 D',
    website: '',
    affLink: '',
    priceFrom: '待定',
    lineTypes: ['BGP中转'],
    regions: ['香港', '日本', '韩国', '美国'],
    clients: ['Clash', 'Shadowrocket'],
    tags: ['便宜', '流媒体', '海外社交', '游戏', '小火箭'],
    features: PENDING_FEATURES,
    tested: false,
    reviewLink: '/reviews/pending-d/'
  },
  {
    id: 'pending-e',
    name: '品牌位 E',
    website: '',
    affLink: '',
    priceFrom: '待定',
    lineTypes: ['IEPL', '直连'],
    regions: ['香港', '新加坡', '美国', '德国'],
    clients: ['Clash', 'sing-box', 'Stash'],
    tags: ['跨境办公', 'Google', '稳定', '开发者'],
    features: PENDING_FEATURES,
    tested: false,
    reviewLink: '/reviews/pending-e/'
  },
  {
    id: 'pending-f',
    name: '品牌位 F',
    website: '',
    affLink: '',
    priceFrom: '待定',
    lineTypes: ['公网中转', 'BGP中转'],
    regions: ['香港', '日本', '美国', '土耳其'],
    clients: ['Clash', 'Shadowrocket', 'v2rayN'],
    tags: ['综合推荐', '游戏', '跨境办公', '便宜', '流媒体', 'AI工具', '开发者'],
    features: PENDING_FEATURES,
    tested: false,
    reviewLink: '/reviews/pending-f/'
  }
]
