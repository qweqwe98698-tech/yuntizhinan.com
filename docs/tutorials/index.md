---
title: "客户端教程总览：六大平台的安装与配置指南"
description: "汇总 Windows、Android、iOS、macOS、Linux 与路由器六大平台的代理客户端选择建议与图文教程入口，并解释订阅链接、导入方式与规则、全局模式等基础概念。"
type: page
---

# 客户端教程：从选择到配置

第一次配置代理客户端，最容易卡在两件事上：装哪个软件、订阅怎么导入。这一页先给出各平台的客户端选择建议，再解释几个绕不开的基础概念，具体操作步骤请进入对应平台的图文教程。

## 客户端选择建议

| 平台 | 推荐客户端 | 备选 | 教程入口 |
| --- | --- | --- | --- |
| Windows | Clash Verge | v2rayN | [Windows 平台教程](/tutorials/windows/) |
| Android | ClashMeta | v2rayNG | [Android 平台教程](/tutorials/android/) |
| iOS | Shadowrocket | — | [iPhone 平台教程](/tutorials/iphone/) |
| macOS | Mihomo Party | — | [macOS 平台教程](/tutorials/macos/) |
| Linux | Mihomo CLI | — | [Linux 平台教程](/tutorials/linux/) |
| 路由器 | OpenWrt | — | [路由器配置教程](/tutorials/router/) |

几点说明：Windows 用户如果订阅以 Clash 格式为主，优先 [Clash Verge 图文教程](/tutorials/windows/clash-verge/)；偏好单节点链接则看 [v2rayN 配置方法](/tutorials/windows/v2rayn/)。Android 对应 [ClashMeta 教程](/tutorials/android/clash-meta/)与 [v2rayNG 教程](/tutorials/android/v2rayng/)。iOS 的 [Shadowrocket 教程](/tutorials/iphone/shadowrocket/)需要海外区 Apple ID 才能下载客户端。macOS 参考 [Mihomo Party 配置](/tutorials/macos/mihomo-party/)，Linux 用户可用 [Mihomo 命令行方案](/tutorials/linux/mihomo-cli/)，全屋设备接管则看 [OpenWrt 路由器方案](/tutorials/router/openwrt/)。

## 三个基础概念

### 什么是订阅链接

订阅链接是服务商提供的一个 URL，客户端定期从中拉取节点列表与配置。节点变动时更新订阅即可，无需手动逐个添加。订阅链接等同于你的账号凭证，不要分享给他人，相关风险见[账号与订阅安全](/security/account-safety/)。

### 导入方式

常见有三种：复制链接后在客户端内粘贴导入（最通用）、在商家网站点击一键导入（自动唤起客户端）、扫描二维码（多用于手机端）。导入报错时先检查链接是否完整、订阅是否过期，仍失败可按[订阅导入失败排查](/troubleshooting/login/subscription-import-failed/)处理。

### 规则模式与全局模式

规则模式按分流规则决定哪些流量走代理、哪些直连，国内网站不受影响，是日常推荐的模式。全局模式让所有流量都走代理，适合排查分流问题或特殊场景短暂使用。多数客户端还提供直连模式，三者可随时切换。

## 配置好之后

客户端只是工具，体验最终取决于订阅服务的质量。还没有订阅的读者，可以从[机场选择总览](/airport/)开始了解挑选思路；使用 Clash 系客户端的用户可重点看[兼容 Clash 的服务怎么选](/airport/clash/)，iOS 用户则对应[适配 Shadowrocket 的选择要点](/airport/shadowrocket/)。配置完成后如遇连接问题，[故障排查中心](/troubleshooting/)按症状提供解决路径。
