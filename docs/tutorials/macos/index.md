---
title: "macOS 代理客户端教程：Mihomo Party 配置指引"
description: "介绍 macOS 平台的代理客户端选择思路：Mihomo Party 与 Clash Verge 的同源关系、为什么它是 Mac 上的稳妥选择、安装配置教程入口，以及连接超时等常见问题的排查路径。"
type: page
---

# Mac 上的代理客户端怎么选

如果你在 Windows 上用过 [Clash Verge](/tutorials/windows/clash-verge/)，那么切到 Mac 几乎不需要重新学习：macOS 平台我们推荐 Mihomo Party，它与 Clash Verge 同属 mihomo（原 Clash Meta）内核生态，订阅格式、代理组、分流规则的概念完全一致，只是界面与系统集成方式不同。

## Mihomo Party 的定位

原版 Clash 停止开发后，社区以 mihomo 内核延续了整个生态，Mihomo Party 是该内核在桌面端的图形客户端之一：原生支持 Apple Silicon 与 Intel 两种芯片，界面对新手友好，支持 TUN 增强模式接管全部系统流量。机场提供的 Clash 订阅链接可直接导入使用，无需任何转换；还没有订阅的读者可先看[兼容 Clash 的机场推荐](/airport/clash/)。

对比之下，ClashX 等老牌客户端已停止或放缓维护，Mihomo Party 是目前 macOS 上兼顾易用性与持续更新的稳妥选择。

## 教程入口

- [Mihomo Party 使用教程](/tutorials/macos/mihomo-party/)：涵盖安装包获取渠道、初次打开的安全性提示处理、订阅导入、代理组与规则、系统代理与 TUN 模式的区别、开机自启等完整流程。

iPhone、Windows 等其他设备的配置方法见[客户端教程总览](/tutorials/)，同一份订阅通常可以在多平台复用。

## 遇到问题

配置完成后连不上网、部分网站超时，多数与系统代理未生效或节点不可用有关，按[连接超时排查](/troubleshooting/timeout/)的顺序检查即可定位。Clash 系客户端特有的「显示已连接但无法上网」问题，我们单独整理在 [Clash 无法上网排查](/troubleshooting/timeout/clash-no-network/)。
