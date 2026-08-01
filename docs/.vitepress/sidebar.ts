import type { DefaultTheme } from 'vitepress'

const aboutSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '关于与政策',
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

const reviewsSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '机场评测',
    items: [
      { text: '评测总览', link: '/reviews/' },
      { text: '光速云（待实测）', link: '/reviews/pending-guangsu/' },
      { text: '飞猫云（待实测）', link: '/reviews/pending-feimao/' },
      { text: '灵猫网络（待实测）', link: '/reviews/pending-lingmao/' },
      { text: '星岛梦（待实测）', link: '/reviews/pending-xingdaomeng/' },
      { text: '唯兔云（待实测）', link: '/reviews/pending-weitu/' },
      { text: '全球云（待实测）', link: '/reviews/pending-quanqiu/' },
      { text: '二猫云（待实测）', link: '/reviews/pending-ermao/' },
      { text: '极连云（待实测）', link: '/reviews/pending-jilian/' },
      { text: '光年梯（待实测）', link: '/reviews/pending-guangnianti/' },
      { text: '可信云（待实测）', link: '/reviews/pending-kexin/' },
      { text: 'u1s1（待实测）', link: '/reviews/pending-u1s1/' }
    ]
  },
  {
    text: '延伸阅读',
    items: [
      { text: '机场对比', link: '/compare/' },
      { text: '测试方法', link: '/about/methodology/' },
      { text: '机场推荐总览', link: '/airport/' }
    ]
  }
]

export const sidebar: DefaultTheme.Sidebar = {
  '/airport/': [
    {
      text: '按用途选机场',
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
      text: '延伸阅读',
      items: [
        { text: '机场评测总览', link: '/reviews/' },
        { text: '机场对比', link: '/compare/' },
        { text: '测试方法', link: '/about/methodology/' },
        { text: '安全避坑', link: '/security/' }
      ]
    }
  ],

  '/reviews/': reviewsSidebar,
  '/compare/': reviewsSidebar,

  '/software/': [
    {
      text: '软件百科分类',
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
      text: '延伸阅读',
      items: [
        { text: '故障排查中心', link: '/troubleshooting/' },
        { text: '机场推荐总览', link: '/airport/' }
      ]
    }
  ],

  '/tutorials/': [
    {
      text: '客户端教程',
      items: [{ text: '教程总览与客户端选择', link: '/tutorials/' }]
    },
    {
      text: 'Windows',
      collapsed: false,
      items: [
        { text: 'Windows 教程入口', link: '/tutorials/windows/' },
        { text: 'Clash Verge 完整教程', link: '/tutorials/windows/clash-verge/' },
        { text: 'v2rayN 导入订阅教程', link: '/tutorials/windows/v2rayn/' }
      ]
    },
    {
      text: 'Android',
      collapsed: false,
      items: [
        { text: 'Android 教程入口', link: '/tutorials/android/' },
        { text: 'ClashMeta 使用教程', link: '/tutorials/android/clash-meta/' },
        { text: 'v2rayNG 使用教程', link: '/tutorials/android/v2rayng/' }
      ]
    },
    {
      text: 'iPhone / iOS',
      collapsed: false,
      items: [
        { text: 'iOS 教程入口', link: '/tutorials/iphone/' },
        { text: 'Shadowrocket 导入订阅教程', link: '/tutorials/iphone/shadowrocket/' }
      ]
    },
    {
      text: 'macOS',
      collapsed: false,
      items: [
        { text: 'macOS 教程入口', link: '/tutorials/macos/' },
        { text: 'Mihomo Party 使用教程', link: '/tutorials/macos/mihomo-party/' }
      ]
    },
    {
      text: 'Linux',
      collapsed: false,
      items: [
        { text: 'Linux 教程入口', link: '/tutorials/linux/' },
        { text: 'Mihomo 命令行教程', link: '/tutorials/linux/mihomo-cli/' }
      ]
    },
    {
      text: '路由器',
      collapsed: false,
      items: [
        { text: '路由器教程入口', link: '/tutorials/router/' },
        { text: 'OpenWrt 配置教程', link: '/tutorials/router/openwrt/' }
      ]
    }
  ],

  '/troubleshooting/': [
    {
      text: '故障排查中心',
      items: [{ text: '排查总览与快速定位', link: '/troubleshooting/' }]
    },
    {
      text: '节点超时',
      collapsed: false,
      items: [
        { text: '所有节点超时怎么排查', link: '/troubleshooting/timeout/' },
        { text: 'Clash 已连接但无法上网', link: '/troubleshooting/timeout/clash-no-network/' }
      ]
    },
    {
      text: '登录失败',
      collapsed: false,
      items: [
        { text: '账号登录失败排查', link: '/troubleshooting/login/' },
        { text: '订阅导入失败怎么办', link: '/troubleshooting/login/subscription-import-failed/' }
      ]
    },
    {
      text: '验证码问题',
      collapsed: false,
      items: [
        { text: '验证码收不到怎么排查', link: '/troubleshooting/verification/' },
        { text: '短信验证码收不到', link: '/troubleshooting/verification/sms-not-received/' }
      ]
    },
    {
      text: 'WebSocket 断流',
      collapsed: false,
      items: [
        { text: 'WebSocket 断流排查', link: '/troubleshooting/websocket/' },
        { text: 'ChatGPT 长任务断流', link: '/troubleshooting/websocket/chatgpt-stream/' }
      ]
    },
    {
      text: '手机流量问题',
      collapsed: false,
      items: [
        { text: 'Wi-Fi 能用流量不能用', link: '/troubleshooting/mobile-data/' },
        { text: 'iOS 蜂窝数据不可用', link: '/troubleshooting/mobile-data/ios-cellular/' }
      ]
    },
    {
      text: 'DNS 问题',
      collapsed: false,
      items: [
        { text: 'DNS 污染与解析失败', link: '/troubleshooting/dns/' },
        { text: 'DNS 泄漏检测与修复', link: '/troubleshooting/dns/dns-leak-test/' }
      ]
    },
    {
      text: '速度问题',
      collapsed: false,
      items: [
        { text: '晚高峰变慢怎么判断', link: '/troubleshooting/speed/' },
        { text: '延迟低但速度慢：丢包诊断', link: '/troubleshooting/speed/packet-loss-diagnosis/' }
      ]
    }
  ],

  '/protocols/': [
    {
      text: '协议知识',
      items: [
        { text: '协议知识总览', link: '/protocols/' },
        { text: 'Shadowsocks 协议详解', link: '/protocols/shadowsocks/' },
        { text: 'VMess 与 VLESS 的区别', link: '/protocols/vmess-vless/' },
        { text: 'Trojan 协议详解', link: '/protocols/trojan/' },
        { text: 'Hysteria 2 协议详解', link: '/protocols/hysteria2/' },
        { text: 'IEPL 与 IPLC 专线知识', link: '/protocols/iepl-iplc/' }
      ]
    },
    {
      text: '延伸阅读',
      items: [
        { text: '安全避坑', link: '/security/' },
        { text: '机场推荐总览', link: '/airport/' }
      ]
    }
  ],

  '/security/': [
    {
      text: '安全避坑',
      items: [
        { text: '安全避坑总览', link: '/security/' },
        { text: '账号与订阅安全', link: '/security/account-safety/' },
        { text: '隐私与日志问题', link: '/security/no-log-privacy/' },
        { text: '识别跑路与虚假机场', link: '/security/fake-airport/' }
      ]
    },
    {
      text: '延伸阅读',
      items: [
        { text: '协议知识总览', link: '/protocols/' },
        { text: '机场评测总览', link: '/reviews/' }
      ]
    }
  ],

  '/about/': aboutSidebar,
  '/editorial-policy/': aboutSidebar,
  '/affiliate-disclosure/': aboutSidebar,
  '/correction-policy/': aboutSidebar,
  '/privacy/': aboutSidebar
}
