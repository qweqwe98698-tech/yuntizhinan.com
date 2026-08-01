---
title: "iOS 代理客户端教程：Shadowrocket 上手指引"
description: "梳理 iOS 平台配置代理的整体思路：为什么首选 Shadowrocket、主流客户端在中国大陆区 App Store 下架后的应对方式、导入订阅教程入口，以及蜂窝数据下无法联网等 iOS 特有问题的排查路径。"
type: page
---

# iPhone 与 iPad 上的代理配置指引

iOS 是所有平台里限制最特殊的一个：苹果对应用分发的管控，决定了主流代理客户端在中国大陆区 App Store 全部不可见。因此在 iPhone 上配置代理，第一步不是研究软件用法，而是解决「应用从哪来」的问题。本页梳理 iOS 平台的整体思路与教程入口。

## 为什么首选 Shadowrocket

Shadowrocket（俗称「小火箭」）是 iOS 上最常被推荐的客户端：订阅格式兼容性好、支持主流协议、规则分流灵活，且是一次性买断的付费应用，没有内购订阅负担。多数机场的帮助文档也默认以它为例编写 iOS 教程，遇到问题时最容易找到参考。选购订阅服务时可参考[适配 Shadowrocket 的机场怎么选](/airport/shadowrocket/)。

## App Store 地区限制说明

由于政策原因，Shadowrocket 及同类应用已从中国大陆区 App Store 下架，这是客观现状而非应用本身的问题。下载需要一个非中国大陆区的 Apple ID。我们建议自行注册海外区账号，并了解其中的合规与风险事项（教程内有详细说明）；不要购买或使用来路不明的共享账号，相关风险分析见[账号与订阅安全](/security/account-safety/)。

## 教程入口

- [Shadowrocket 导入订阅完整教程](/tutorials/iphone/shadowrocket/)：从获取应用、添加订阅、节点测速，到全局路由模式与订阅自动更新的全流程。

配置逻辑与其他平台相通，家里有多台设备的读者可在[客户端教程总览](/tutorials/)查看 Windows、macOS 等平台的对应教程。

## iOS 特有问题

iPhone 用户最常遇到的情况是 Wi-Fi 下一切正常、切到蜂窝数据就无法联网，这与 iOS 处理蜂窝网络下 VPN 配置的方式有关，排查步骤见 [iOS 蜂窝数据无法上网](/troubleshooting/mobile-data/ios-cellular/)。订阅导入报错则参考[订阅导入失败排查](/troubleshooting/login/subscription-import-failed/)。
