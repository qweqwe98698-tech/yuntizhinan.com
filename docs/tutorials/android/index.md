---
title: "Android 客户端教程：ClashMeta 与 v2rayNG"
description: "说明 Android 手机上 ClashMeta 与 v2rayNG 两款代理客户端的适用场景与获取渠道差异，给出按订阅格式选择客户端的建议，并汇总订阅导入、后台保活与手机流量异常问题的教程入口。"
type: page
---

# Android 手机代理客户端入门

Android 用户配置代理前，先回答三个问题：

1. **你的订阅是什么格式？** 机场后台标注「Clash 订阅」的选 ClashMeta，标注「v2ray 订阅」或只有节点分享链接的选 v2rayNG，两种都有则任选。
2. **你能访问 Google Play 吗？** v2rayNG 上架了 Google Play；ClashMeta 需从 GitHub Releases 或 F-Droid 获取安装包。首次配置时多数人还没有代理，能否顺利下载是现实约束。
3. **你想要自动分流还是手动控制？** ClashMeta 依靠订阅内置规则自动分流，省心；v2rayNG 的路由模式和分应用代理由你手动指定，更灵活。

## 两篇教程入口

- [ClashMeta for Android 教程](/tutorials/android/clash-meta/)：获取安装、导入订阅、代理组切换、VPN 权限授予，以及针对各手机厂商后台限制的保活设置。
- [v2rayNG 配置教程](/tutorials/android/v2rayng/)：订阅分组导入与更新、节点延迟测试、分应用代理和绕过大陆路由模式的用法。

两款客户端都通过系统 VPN 接口工作，同一时间只能有一个处于连接状态。桌面端的对应方案见 [Windows 平台教程](/tutorials/windows/)，挑选订阅服务可从[机场推荐总览](/airport/)入手。

## 手机特有的两类问题

**后台被杀**：国产定制系统（MIUI、ColorOS、HarmonyOS 等）的省电策略会清理后台，表现为锁屏一段时间后代理断开。解决思路是把客户端加入电池优化白名单并允许自启动，两篇教程内均有对应章节。

**Wi-Fi 正常、流量异常**：连 Wi-Fi 一切正常，切到蜂窝数据就无法使用，多与运营商网络的 IPv6、DNS 或 APN 设置有关，按[手机流量问题排查](/troubleshooting/mobile-data/)逐项检查即可，不必急着换机场或重装软件。
