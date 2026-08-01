---
title: "Linux 代理客户端教程：Mihomo 命令行方案的定位与入口"
description: "解释为什么 Linux 平台推荐直接运行 Mihomo 内核而非图形客户端：桌面客户端打包滞后、服务器场景没有图形界面，命令行方案配合 systemd 更稳定，并给出完整教程入口与 DNS 问题的排查路径。"
type: page
---

# Linux 平台代理配置：命令行方案的定位

Linux 用户在配置代理这件事上，处境和 Windows、macOS 都不一样：图形客户端并非没有，但发行版众多、桌面环境各异，GUI 客户端的打包更新往往滞后，甚至在部分发行版上根本跑不起来。更现实的是，相当一部分 Linux 设备压根没有图形界面——云服务器、NAS、树莓派、WSL，都只有一个终端。

所以本站给 Linux 平台的建议非常直接：跳过图形客户端，直接运行 mihomo（原 Clash Meta）内核本体。

## 命令行方案的三个理由

- **零依赖**：单个静态编译的二进制文件，不挑发行版，amd64 与 arm64 架构都有官方构建，云服务器和树莓派同样适用。
- **稳定常驻**：交给 systemd 托管即可实现开机自启、崩溃自动拉起，比桌面客户端更适合长期无人值守运行。
- **概念通用**：订阅、代理组、分流规则与桌面端完全一致，机场提供的 Clash 订阅可以直接使用，无需任何转换。还没有订阅的读者可先看[兼容 Clash 订阅的机场推荐](/airport/clash/)。

## 教程入口

- [Mihomo 命令行完整教程](/tutorials/linux/mihomo-cli/)：从按 CPU 架构获取二进制讲起，覆盖配置文件放置、用订阅链接拉取配置、systemd 服务编写、终端代理环境变量设置与出口 IP 验证，是 Linux 平台的主线教程。

桌面 Linux 用户如果确实偏好图形界面，操作思路可参考 [Windows 平台的 Clash Verge 教程](/tutorials/windows/clash-verge/)——其 Linux 版界面与逻辑基本一致，但版本更新与系统集成不如命令行方案可靠。手机、路由器等其他设备的配置方法见[客户端教程总览](/tutorials/)。

## Linux 上高发的 DNS 问题

Linux 的 DNS 解析链路比桌面系统复杂，systemd-resolved、NetworkManager 与 /etc/resolv.conf 多方参与，代理配置完成后若出现「节点能连通但网页打不开」「部分域名解析到错误 IP」，大概率是 DNS 污染或本机解析配置冲突。优先按 [DNS 问题排查](/troubleshooting/dns/)的顺序处理，必要时用 [DNS 泄漏检测方法](/troubleshooting/dns/dns-leak-test/)确认解析是否真的经过了代理通道。
