import { SITE } from './site.config.mjs'

export const PROJECT = {
  siteName: '云梯指南',
  siteNameEn: 'YunTi ZhiNan',
  slogan: '海外软件百科、网络故障排查、客户端教程与机场评测推荐',

  // 域名唯一来源在 site.config.mjs，脚本与 VitePress 共享
  siteUrl: SITE.siteUrl,

  // 部署在根域名使用 /
  base: '/',

  contactEmail: 'feifei98698@gmail.com',

  // 全站默认推广链接未提供时按钮不得出现
  affiliateUrl: '',

  // 可选：Telegram频道或其他公开渠道
  telegramUrl: '',

  locale: 'zh-CN',
  author: '云梯指南编辑部',
  defaultOgImage: '/images/og/default.png'
}
