import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  { text: '首页', link: '/' },
  {
    text: '机场推荐',
    items: [
      { text: '机场推荐总览', link: '/airport/' },
      { text: '综合机场推荐', link: '/airport/recommend/' },
      { text: '稳定机场推荐', link: '/airport/stable/' },
      { text: '便宜机场推荐', link: '/airport/cheap/' },
      { text: 'AI 工具机场推荐', link: '/airport/ai/' },
      { text: 'Google 服务机场推荐', link: '/airport/google/' },
      { text: '社交通信机场推荐', link: '/airport/social/' },
      { text: '流媒体机场推荐', link: '/airport/streaming/' },
      { text: '开发者机场推荐', link: '/airport/developer/' },
      { text: '游戏线路推荐', link: '/airport/gaming/' },
      { text: '跨境办公线路推荐', link: '/airport/business/' },
      { text: 'Clash 机场推荐', link: '/airport/clash/' },
      { text: '小火箭机场推荐', link: '/airport/shadowrocket/' }
    ]
  },
  {
    text: '机场评测',
    items: [
      { text: '评测总览', link: '/reviews/' },
      { text: '机场对比', link: '/compare/' },
      { text: '测试方法', link: '/about/methodology/' }
    ]
  },
  {
    text: '软件百科',
    items: [
      { text: '软件百科总览', link: '/software/' },
      { text: 'AI 工具', link: '/software/ai/' },
      { text: 'Google 服务', link: '/software/google/' },
      { text: '社交媒体与通信', link: '/software/social/' },
      { text: '流媒体与音乐', link: '/software/streaming/' },
      { text: '开发者工具', link: '/software/developer/' },
      { text: '办公与协作', link: '/software/office/' },
      { text: '游戏平台', link: '/software/gaming/' },
      { text: '跨境电商与运营', link: '/software/ecommerce/' }
    ]
  },
  {
    text: '客户端教程',
    items: [
      { text: '教程总览', link: '/tutorials/' },
      { text: 'Windows', link: '/tutorials/windows/' },
      { text: 'Android', link: '/tutorials/android/' },
      { text: 'iPhone / iOS', link: '/tutorials/iphone/' },
      { text: 'macOS', link: '/tutorials/macos/' },
      { text: 'Linux', link: '/tutorials/linux/' },
      { text: '路由器', link: '/tutorials/router/' }
    ]
  },
  {
    text: '故障排查',
    items: [
      { text: '故障排查中心', link: '/troubleshooting/' },
      { text: '节点超时', link: '/troubleshooting/timeout/' },
      { text: '登录失败', link: '/troubleshooting/login/' },
      { text: '验证码问题', link: '/troubleshooting/verification/' },
      { text: 'WebSocket 断流', link: '/troubleshooting/websocket/' },
      { text: '手机流量问题', link: '/troubleshooting/mobile-data/' },
      { text: 'DNS 问题', link: '/troubleshooting/dns/' },
      { text: '速度问题', link: '/troubleshooting/speed/' }
    ]
  },
  {
    text: '知识库',
    items: [
      { text: '协议知识', link: '/protocols/' },
      { text: '安全避坑', link: '/security/' },
      { text: '实用工具', link: '/tools/' },
      { text: '行业动态', link: '/news/' }
    ]
  },
  {
    text: '关于',
    items: [
      { text: '关于本站', link: '/about/' },
      { text: '测试方法', link: '/about/methodology/' },
      { text: '编辑政策', link: '/editorial-policy/' },
      { text: '推广披露', link: '/affiliate-disclosure/' },
      { text: '纠错政策', link: '/correction-policy/' },
      { text: '隐私政策', link: '/privacy/' }
    ]
  }
]
