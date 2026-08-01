---
title: "v2rayNG 配置教程：订阅更新、延迟测试与绕过大陆路由"
description: "覆盖 v2rayNG 从安装到日常使用的全流程：导入并更新订阅分组、对节点做真连接延迟测试、按需开启分应用代理、选择绕过大陆的路由模式，并解决订阅为空与连接失败等常见问题。"
type: article
date: 2026-08-01
author: 云梯指南编辑部
category: 客户端教程
tags: [v2rayNG, Android, 分应用代理]
devices: [Android]
recommendCategory: Clash
related:
  - text: ClashMeta for Android 使用指南
    link: /tutorials/android/clash-meta/
  - text: VMess 与 VLESS 协议详解
    link: /protocols/vmess-vless/
  - text: 手机流量下无法联网的排查
    link: /troubleshooting/mobile-data/
  - text: 订阅导入失败的排查步骤
    link: /troubleshooting/login/subscription-import-failed/
---

# v2rayNG 上手指南

开始之前，请确认三样东西已经就绪：

1. 一部 Android 8 以上的手机（近五年的机型都满足）；
2. 一条 v2ray/通用格式的订阅链接，或若干节点分享链接——注意不是 Clash 专用格式，这是后面「订阅为空」问题的头号原因；
3. 约十分钟时间。

三样齐了就往下走。如果你的机场只提供 Clash 格式订阅，直接换看 [ClashMeta 教程](/tutorials/android/clash-meta/)，不必硬凑。

## 获取与安装

v2rayNG 由 v2rayN 同一作者（2dust）维护，有两个官方获取渠道：

- **Google Play**：能正常访问 Play 商店的用户直接搜索安装，后续自动更新，最省事；
- **GitHub Releases**：在 GitHub 搜索 2dust/v2rayNG，从仓库的 Releases 页面获取 APK。近几年的手机选 arm64 架构的包即可，不确定选通用版。

请勿从搜索引擎里的第三方下载站获取安装包。首次安装 APK 时按系统提示授予「安装未知应用」权限即可。

## 导入与更新订阅分组

v2rayNG 用分组管理订阅，一个机场一个分组：

1. 进入订阅分组设置，新建分组，备注填机场名，地址粘贴订阅链接，保存；
2. 回到主界面执行「更新订阅」，节点会批量出现在列表中；
3. 顶部可以按分组切换查看，多机场互不干扰。

除订阅外，单个节点也能通过扫描二维码或从剪贴板导入分享链接的方式添加，适合临时测试某个节点。订阅更新后节点会整组替换，手动改过的单节点建议放在独立分组避免被覆盖。更新报错的处理见[订阅导入失败排查](/troubleshooting/login/subscription-import-failed/)。

## 节点延迟测试

节点列表就绪后，用菜单里的「测试全部真连接」批量测速。真连接测试模拟访问真实外网站点，结果比 ping 更可信：

- 数值几十到两百毫秒为正常，挑低的用；
- 显示 -1 或超时的节点当前不可用；
- 想了解不同协议节点（VMess、VLESS、Trojan 等）的差异，可读[VMess 与 VLESS 协议详解](/protocols/vmess-vless/)。

选中节点后点击底部的启动按钮，首次会弹出系统 VPN 授权请求，必须允许才能建立连接。连接成功后状态栏出现 VPN 图标，可用内置的连接测试确认出网正常。

## 分应用代理

默认所有应用的流量都经过 v2rayNG。如果只想让部分应用走代理（例如只代理浏览器和海外应用，游戏和银行类应用直连），在设置中打开「分应用代理」：

- **代理所选应用**：勾选的应用走代理，其余直连；
- **绕过所选应用**：勾选的应用直连，其余走代理。

国内支付、银行类应用建议设为绕过，可以减少风控误判；改动分应用名单后需要重启连接才生效。

## 路由模式（绕过大陆）

设置中的预定义路由规则决定分流行为，常用三档：

- **全局**：所有流量走代理，排查问题时短用；
- **绕过局域网**：局域网直连，其余走代理；
- **绕过局域网及大陆地址**：国内网站与 IP 直连、境外走代理，这是日常推荐档位，国内应用速度不受影响。

切换路由模式后同样需要断开重连一次。想理解这套分流思路在各平台的通用逻辑，可回看[客户端教程总览](/tutorials/)。

## 常见问题

- **订阅更新成功但节点为空**：订阅链接是 Clash 格式所致，去机场面板换通用/v2ray 格式链接，或改用 ClashMeta；
- **连接成功但无法上网**：先换节点排除单点故障；批量失效则更新订阅；手机时间误差过大也会导致部分协议握手失败，开启系统自动校时；
- **Wi-Fi 正常、蜂窝数据异常**：按[手机流量问题排查](/troubleshooting/mobile-data/)检查 IPv6 与 DNS 设置；
- **锁屏后断连**：把 v2rayNG 加入系统电池优化白名单并允许后台运行，各品牌设置入口不同，思路与 ClashMeta 教程中的保活章节一致。

## FAQ

**问：v2rayNG 和 v2rayN 什么关系？**
同一作者的两款客户端，v2rayN 用于 Windows，v2rayNG 用于 Android，订阅格式通用，电脑手机可共用一条订阅。

**问：支持哪些协议？**
主流协议基本全覆盖：VMess、VLESS、Shadowsocks、Trojan、Hysteria2 等，具体以当前版本内核能力为准。

**问：和 ClashMeta 该选哪个？**
订阅格式决定一切：v2ray/通用格式选 v2rayNG，Clash 格式选 ClashMeta；两者都提供时，想要自动分流选 ClashMeta，想手动控制选 v2rayNG。

**问：需要 root 吗？**
不需要。通过系统 VPN 接口工作，普通权限即可。
