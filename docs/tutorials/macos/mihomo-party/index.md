---
title: "Mihomo Party 教程：Mac 订阅导入与 TUN 模式"
description: "面向 macOS 用户的 Mihomo Party 完整教程：官网与 GitHub Releases 获取方式、初次打开的安全性提示处理、订阅导入、代理组与规则的用法、系统代理与 TUN 增强模式的区别、开机自启设置及常见问题解答。"
type: article
date: 2026-08-01
author: 云梯指南编辑部
category: 客户端教程
tags: [Mihomo Party, macOS, Clash]
devices: [macOS]
recommendCategory: Clash
howto:
  - "获取与安装"
  - "导入订阅"
  - "代理组与规则"
  - "系统代理与 TUN 增强模式"
  - "开机自启"
related:
  - text: macOS 平台教程入口
    link: /tutorials/macos/
  - text: Clash 已连接但无法上网的排查
    link: /troubleshooting/timeout/clash-no-network/
  - text: 兼容 Clash 订阅的机场推荐
    link: /airport/clash/
  - text: Windows 平台 Clash Verge 教程
    link: /tutorials/windows/clash-verge/
---

# 在 Mac 上配置 Mihomo Party

本文适合以下读者：

- 第一次在 Mac 上配置代理客户端，手里已有机场订阅链接；
- 从 ClashX 或 Clash Verge 迁移过来，想找一个持续维护的 mihomo 内核客户端；
- 需要 TUN 模式，让终端、虚拟机等不遵守系统代理的程序也能被接管。

还没有订阅的读者，建议先在[兼容 Clash 的机场推荐](/airport/clash/)中选定服务再回来操作。

## 获取与安装

Mihomo Party 是开源项目，安装包只从两个渠道获取：项目官方网站，或官方 GitHub Releases 页面。下载时按芯片类型选择对应版本（Apple Silicon 选 arm64 版，Intel 选 x64 版）。不要从第三方软件站或网盘下载安装包，以避免拿到被植入恶意代码的篡改版本。

初次打开时，macOS 可能提示应用来自身份不明的开发者、或询问是否确定打开，这是系统对非 App Store 分发应用的例行拦截：到系统设置的「隐私与安全性」部分找到被拦截的记录，选择仍要打开即可。随后应用会请求安装辅助的系统组件（用于设置系统代理与创建虚拟网卡），需要输入管理员密码授权，属于正常步骤。

## 导入订阅

进入应用的订阅管理功能，粘贴机场提供的订阅链接并确认导入，成功后通常会显示剩余流量与到期时间（取决于服务商是否输出这些信息）。部分机场官网提供一键导入按钮，点击后自动唤起应用完成添加，效果相同。

导入失败时，先检查链接是否复制完整、套餐是否过期，再按[订阅导入失败排查](/troubleshooting/login/subscription-import-failed/)逐项处理。

## 代理组与规则

导入后在代理页面能看到若干代理组，这是订阅预设的分组策略：自动选择组按延迟自动挑节点；地区组用于手动指定出口地区；部分订阅还有针对流媒体、AI 服务的专用分组。日常使用只需在相应分组里挑节点，或保持自动选择即可。

规则页面展示分流规则的匹配顺序——国内域名直连、境外域名走代理，一般无需修改。想进一步理解节点背后各协议的差异，可延伸阅读[协议科普](/protocols/)。

## 系统代理与 TUN 增强模式

让流量真正经过内核，需要开启两者之一：

- **系统代理**：把 macOS 的网络代理设置指向本机监听端口，浏览器等遵守系统代理的应用随即生效。轻量稳定，日常够用。
- **TUN（增强）模式**：创建虚拟网卡接管全部系统流量，终端命令行、部分不走系统代理的应用也会被代理。首次开启需按系统提示授权相关组件。

建议先用系统代理，遇到某些程序不走代理时再启用 TUN，两者不必同时纠结。开启 TUN 后若完全无法上网，先关闭它恢复网络，再按 [Clash 无法上网排查](/troubleshooting/timeout/clash-no-network/)定位原因。

## 开机自启

在应用设置中开启开机启动，并配合自动开启系统代理、静默启动等选项，重启 Mac 后即可自动恢复代理状态，无需手动干预。若未生效，到 macOS 的登录项设置里确认该应用已被允许在登录时打开。

## 常见问题

- **导入订阅后网速极慢或超时**：先在代理组里手动切换节点并测延迟，排除单节点故障；仍无改善时按[连接超时排查](/troubleshooting/timeout/)检查本地网络与配置。
- **升级 macOS 后代理失效**：系统大版本更新可能重置网络扩展授权，重新在「隐私与安全性」中允许相关组件即可恢复。
- **与其他代理软件冲突**：多个代理客户端同时运行会争抢系统代理与端口，请只保留一个。

## FAQ

**Mihomo Party 和 Clash Verge 是什么关系？**
同为 mihomo 内核的图形客户端，配置格式通用，订阅可以混用。Windows 端教程见 [Clash Verge 图文教程](/tutorials/windows/clash-verge/)。

**客户端收费吗？**
客户端开源免费，需要花钱的只是机场订阅本身。

**iPhone 能用同一份订阅吗？**
多数机场提供多平台通用订阅，iOS 端的配置方法见 [Shadowrocket 教程](/tutorials/iphone/shadowrocket/)。
