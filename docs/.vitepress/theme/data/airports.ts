// 机场品牌数据唯一来源（组件与页面都从这里读取）。
// 规则：
//  - affLink 为空 → 转化按钮不渲染
//  - tested 为 false → 组件显示「待实测」徽章，禁止展示评分与解锁结论
//  - features 中涉及带宽/线路/解锁的说法均为官方页面标注，实测完成前不作本站背书
//  - 完成标准流程实测后：tested 改 true，补 unlock 与 lastChecked
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

export const airports: AirportBrand[] = [
  {
    id: 'guangsu',
    name: '光速云',
    website: '',
    affLink: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y',
    priceFrom: '¥17',
    plans: [
      { name: '轻量版·年付', price: '¥99/年', traffic: '59GB/月', period: '年付' },
      { name: '极速版', price: '¥17/月', traffic: '110GB/月', period: '月付' },
      { name: '流光版', price: '¥34/月', traffic: '220GB/月', period: '月付' },
      { name: '量子版', price: '¥68/月', traffic: '450GB/月', period: '月付' },
      { name: '无界版', price: '¥130/月', traffic: '900GB/月', period: '月付' },
      { name: '不限时流量包', price: '¥680', traffic: '1000GB', period: '一次性' }
    ],
    lineTypes: ['IPLC'],
    regions: ['香港', '台湾', '日本', '新加坡', '美国', '德国', '马来西亚', '巴西'],
    clients: ['Clash', 'Clash Verge Rev', 'Shadowrocket', 'Stash', 'v2rayN'],
    tags: ['综合推荐', '稳定', 'AI工具', '流媒体', '跨境办公', 'Clash', '小火箭'],
    features: [
      '官方标注最高 10Gbps 带宽，节点全 VLESS 协议',
      '2026-05 订阅测速：63 节点覆盖 8 个地区',
      '实测 UDP 多为 FullCone，TLS 证书已核实',
      '月付、年付与不限时流量包多档可选'
    ],
    tested: false,
    lastChecked: '2026-05-02',
    reviewLink: '/reviews/pending-guangsu/',
    highlight: true
  },
  {
    id: 'feimao',
    name: '飞猫云',
    website: '',
    affLink: 'https://guangs.flycataff.com/#/?code=6uq0Xe9y',
    priceFrom: '¥15',
    plans: [
      { name: '星耀版', price: '¥15/月', traffic: '100GB/月', period: '月付' },
      { name: '星环版', price: '¥30/月', traffic: '200GB/月', period: '月付' },
      { name: '银河版', price: '¥55/月', traffic: '500GB/月', period: '月付' },
      { name: '宇宙版', price: '¥100/月', traffic: '1000GB/月', period: '月付' },
      { name: '不限时流量包', price: '¥680', traffic: '1000GB', period: '一次性' }
    ],
    lineTypes: ['公网中转'],
    regions: ['香港', '台湾', '日本', '新加坡', '美国'],
    clients: ['Clash Verge Rev', 'Shadowrocket', 'Stash', 'v2rayN', 'v2rayNG'],
    tags: ['综合推荐', '便宜', '流媒体', '海外社交', 'Clash', '小火箭'],
    features: [
      '入门价格较低，套餐结构简单',
      '2026-07 晚高峰测速：50 节点覆盖 5 个地区',
      '晚高峰实测香港节点速度表现较好',
      '兼容 Clash、小火箭、v2rayNG 等多平台客户端'
    ],
    tested: false,
    lastChecked: '2026-07-18',
    reviewLink: '/reviews/pending-feimao/'
  },
  {
    id: 'lingmao',
    name: '灵猫网络',
    website: '',
    affLink: 'https://vip01.civetnet.com/#/?code=8MIAyxak',
    priceFrom: '¥25',
    plans: [
      { name: '灵猫·月付 Small', price: '¥25/月', traffic: '150GB/月', period: '月付' },
      { name: '灵猫·月付 Big', price: '¥45/月', traffic: '300GB/月', period: '月付' },
      { name: '灵猫·季付 Small', price: '¥65/季', traffic: '150GB/月', period: '季付' },
      { name: '灵猫·季付 Big', price: '¥125/季', traffic: '300GB/月', period: '季付' },
      { name: '灵猫·年付小包', price: '¥85/年', traffic: '45GB/月', period: '年付' },
      { name: '灵猫·年付 Small', price: '¥195/年', traffic: '150GB/月', period: '年付' },
      { name: '灵猫·年付 Big', price: '¥295/年', traffic: '300GB/月', period: '年付' }
    ],
    lineTypes: ['IPLC'],
    regions: ['香港', '台湾', '日本', '新加坡', '美国'],
    clients: ['Clash', 'Clash Verge Rev', 'Shadowrocket', 'Stash', 'v2rayN', 'v2rayNG'],
    tags: ['综合推荐', '稳定', 'AI工具', '流媒体', '开发者', 'Clash', '小火箭'],
    features: [
      '官方标注全 IPLC 专线、节点 1 倍率',
      '2026-07 测速：50 节点覆盖 5 个地区',
      '实测香港与新加坡节点速度表现较好',
      '不限制同时在线客户端数量'
    ],
    tested: false,
    lastChecked: '2026-07-19',
    reviewLink: '/reviews/pending-lingmao/'
  },
  {
    id: 'xingdaomeng',
    name: '星岛梦',
    website: '',
    affLink: 'https://guangs.xingdaomeng.com/#/?code=1TynBYnR',
    priceFrom: '¥16',
    plans: [
      { name: '极速版', price: '¥16/月', traffic: '100GB/月', period: '月付' },
      { name: '进阶版', price: '¥32/月', traffic: '200GB/月', period: '月付' },
      { name: '闪光版', price: '¥80/月', traffic: '500GB/月', period: '月付' },
      { name: '旗舰版', price: '¥160/月', traffic: '1TB/月', period: '月付' },
      { name: '永久不限时', price: '¥680', traffic: '1TB', period: '一次性' },
      { name: '定制套餐', price: '¥680/月', traffic: '500GB/月', period: '月付' }
    ],
    lineTypes: ['IPLC'],
    regions: ['香港', '日本', '新加坡', '台湾', '美国'],
    clients: ['Clash', 'Shadowrocket', 'Stash', 'v2rayN'],
    tags: ['流媒体', '海外社交', '便宜', 'Clash', '小火箭'],
    features: [
      '2026-07 晚高峰测速：50 节点覆盖 5 个地区',
      '晚高峰实测香港节点速度表现较好',
      '官方标注全 IPLC 专线套餐',
      '月付 16 元起，入门门槛较低'
    ],
    tested: false,
    lastChecked: '2026-07-18',
    reviewLink: '/reviews/pending-xingdaomeng/'
  },
  {
    id: 'weitu',
    name: '唯兔云',
    website: '',
    affLink: 'https://guangs.v2yunvipaff.com/#/?code=xIutqOBA',
    priceFrom: '¥14.9',
    plans: [
      { name: '年付版', price: '¥79.9/年', traffic: '45GB/月', period: '年付' },
      { name: '入门版', price: '¥14.9/月', traffic: '100GB/月', period: '月付' },
      { name: '进阶版', price: '¥29.9/月', traffic: '200GB/月', period: '月付' },
      { name: '专业版', price: '¥59.9/月', traffic: '500GB/月', period: '月付' },
      { name: '至尊版', price: '¥119.9/月', traffic: '1TB/月', period: '月付' }
    ],
    lineTypes: ['IPLC'],
    regions: ['香港', '台湾', '日本', '新加坡', '美国'],
    clients: ['Clash Verge Rev', 'Shadowrocket', 'Stash', 'v2rayN', 'v2rayNG'],
    tags: ['便宜', '稳定', 'AI工具', '开发者', 'Clash'],
    features: [
      '入门版月付 14.9 元，价格较低',
      '2026-07 测速：50 节点覆盖 5 个地区',
      '实测香港与新加坡节点速度表现较好',
      '进阶档官方标注全 IPLC 不限速'
    ],
    tested: false,
    lastChecked: '2026-07-19',
    reviewLink: '/reviews/pending-weitu/'
  },
  {
    id: 'quanqiu',
    name: '全球云',
    website: '',
    affLink: 'https://guangs.gcvipaff.com/#/?code=Ov2nvU9C',
    priceFrom: '¥20',
    plans: [
      { name: '入门套餐', price: '¥20/月', traffic: '120GB/月', period: '月付' },
      { name: '进阶套餐', price: '¥40/月', traffic: '300GB/月', period: '月付' },
      { name: '高端套餐', price: '¥100/月', traffic: '700GB/月', period: '月付' },
      { name: '商业套餐', price: '¥180/月', traffic: '1.5TB/月', period: '月付' },
      { name: '独享私人专线', price: '¥600/月', traffic: '500GB/月', period: '月付' }
    ],
    lineTypes: ['公网中转', '独享专线'],
    regions: ['香港', '日本', '新加坡', '美国', '台湾', '韩国', '欧洲'],
    clients: ['Clash Verge Rev', 'Shadowrocket', 'Stash', 'v2rayN', 'v2rayNG'],
    tags: ['跨境办公', 'Google', '流媒体', '游戏'],
    features: [
      '2026-07 晚高峰解锁实测：Netflix 与 Disney+ 50 节点全解锁',
      'YouTube 49/50 节点解锁（HKG-01 返回大陆库）',
      '主打港日新美台韩欧多地区覆盖',
      '提供独享私人专线选项'
    ],
    unlock: { streaming: 'passed' },
    tested: false,
    lastChecked: '2026-07-18',
    reviewLink: '/reviews/pending-quanqiu/'
  },
  {
    id: 'ermao',
    name: '二猫云',
    website: '',
    affLink: 'https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW',
    priceFrom: '¥20',
    plans: [
      { name: '白猫套餐', price: '¥20/月', traffic: '100GB/月', period: '月付' },
      { name: '橘猫畅玩版', price: '¥40/月', traffic: '200GB/月', period: '月付' },
      { name: '牛奶猫尊享版', price: '¥80/月', traffic: '400GB/月', period: '月付' },
      { name: '黑猫无限版', price: '¥160/月', traffic: '800GB/月', period: '月付' }
    ],
    lineTypes: ['公网中转'],
    regions: ['香港', '日本', '新加坡', '美国'],
    clients: ['Clash Verge Rev', 'Shadowrocket', 'Stash', 'v2rayN', 'v2rayNG'],
    tags: ['综合推荐', '稳定', '流媒体', '海外社交', 'Clash'],
    features: [
      '套餐命名清晰，新手上手简单',
      '覆盖香港、日本、新加坡、美国等常用地区',
      '兼容主流客户端订阅导入',
      '适合日常主力或备用搭配'
    ],
    tested: false,
    reviewLink: '/reviews/pending-ermao/'
  },
  {
    id: 'jilian',
    name: '极连云',
    website: '',
    affLink: 'https://guangs.jlyvipaff.com/#/?code=VM1rKGUu',
    priceFrom: '¥15.5',
    plans: [
      { name: '轻量体验', price: '¥96/年', traffic: '60GB/月', period: '年付' },
      { name: '基础套餐', price: '¥15.5/月', traffic: '100GB/月', period: '月付' },
      { name: '进阶套餐', price: '¥30.5/月', traffic: '200GB/月', period: '月付' },
      { name: '旗舰套餐', price: '¥65.5/月', traffic: '500GB/月', period: '月付' },
      { name: '尊享套餐', price: '¥120.5/月', traffic: '1000GB/月', period: '月付' },
      { name: '不限时流量包', price: '¥399', traffic: '1000GB', period: '一次性' }
    ],
    lineTypes: ['公网中转'],
    regions: ['香港', '台湾', '日本', '新加坡', '美国', '英国', '法国', '德国'],
    clients: ['Clash', 'Shadowrocket', 'Stash', 'v2rayN'],
    tags: ['游戏', '便宜', 'Google', '流媒体', '小火箭'],
    features: [
      '2026-05 晚高峰测速：58 节点覆盖 8 个地区',
      '晚高峰实测香港专线组速度较均衡',
      '入门月付 15.5 元起',
      '不限时流量包 399 元 1000GB'
    ],
    tested: false,
    lastChecked: '2026-05-07',
    reviewLink: '/reviews/pending-jilian/'
  },
  {
    id: 'guangnianti',
    name: '光年梯',
    website: '',
    affLink: 'https://guangs.gntaff.com/#/?code=X1FoxjGE',
    priceFrom: '¥18',
    plans: [
      { name: '入门版', price: '¥18/月', traffic: '110GB/月', period: '月付' },
      { name: '晋级版', price: '¥34/月', traffic: '220GB/月', period: '月付' },
      { name: '专业版', price: '¥68/月', traffic: '450GB/月', period: '月付' },
      { name: '至尊版', price: '¥130/月', traffic: '900GB/月', period: '月付' },
      { name: '独享私人专线', price: '¥680/月', traffic: '500GB/月', period: '月付' }
    ],
    lineTypes: ['公网中转', '独享专线'],
    regions: ['香港', '台湾', '日本', '新加坡', '美国', '英国', '德国', '法国'],
    clients: ['Clash', 'Shadowrocket', 'Stash', 'v2rayN'],
    tags: ['AI工具', 'Google', '稳定', '综合推荐', '开发者'],
    features: [
      '2026-05 测速：59 节点覆盖 8 个地区',
      '面向 Google、YouTube 与 AI 工具场景',
      '套餐梯度均衡，日常档 34 元',
      '提供独享私人专线选项'
    ],
    tested: false,
    lastChecked: '2026-05-02',
    reviewLink: '/reviews/pending-guangnianti/'
  },
  {
    id: 'kexin',
    name: '可信云',
    website: '',
    affLink: 'https://guangs.kosingaff.com/#/register?code=UYDtNlCY',
    priceFrom: '¥17',
    plans: [
      { name: '轻量版·年付', price: '¥99/年', traffic: '59GB/月', period: '年付' },
      { name: '极速版', price: '¥17/月', traffic: '110GB/月', period: '月付' },
      { name: '流光版', price: '¥34/月', traffic: '220GB/月', period: '月付' },
      { name: '量子版', price: '¥68/月', traffic: '450GB/月', period: '月付' },
      { name: '无界版', price: '¥130/月', traffic: '900GB/月', period: '月付' },
      { name: '不限时流量包', price: '¥680', traffic: '1000GB', period: '一次性' }
    ],
    lineTypes: ['公网中转'],
    regions: ['香港', '台湾', '日本', '新加坡', '美国', '马来西亚', '印度', '法国', '德国'],
    clients: ['Clash', 'Shadowrocket', 'Stash', 'v2rayN'],
    tags: ['稳定', '跨境办公', 'Google', '海外社交'],
    features: [
      '2026-05 测速：64 节点覆盖 9 个地区',
      '定位稳定省心的日常使用',
      '轻量年付 99 元适合备用',
      '套餐梯度与主流用法匹配'
    ],
    tested: false,
    lastChecked: '2026-05-02',
    reviewLink: '/reviews/pending-kexin/'
  },
  {
    id: 'u1s1',
    name: 'u1s1',
    website: '',
    affLink: 'https://guangs.vipaff.cc/#/?code=xhX5X22f',
    priceFrom: '¥20',
    plans: [
      { name: '基础体验版', price: '¥20/月', traffic: '120GB/月', period: '月付' },
      { name: '日常影音版', price: '¥40/月', traffic: '300GB/月', period: '月付' },
      { name: '重度冲浪版', price: '¥100/月', traffic: '700GB/月', period: '月付' },
      { name: '尊享大户版', price: '¥180/月', traffic: '1500GB/月', period: '月付' },
      { name: '一次性流量包', price: '¥580', traffic: '1000GB', period: '一次性' }
    ],
    lineTypes: ['公网中转'],
    regions: ['香港', '台湾', '日本', '新加坡', '美国', '马来西亚', '俄罗斯'],
    clients: ['Clash', 'Shadowrocket', 'Stash', 'v2rayN'],
    tags: ['便宜', '综合推荐', '海外社交', '游戏', 'AI工具'],
    features: [
      '2026-03 晚高峰测速：58 节点覆盖 7 个地区',
      '晚高峰实测香港与日本节点表现较好',
      '节点为 Shadowsocks 协议',
      '套餐命名直观，价格清晰'
    ],
    tested: false,
    lastChecked: '2026-03-30',
    reviewLink: '/reviews/pending-u1s1/'
  }
]
