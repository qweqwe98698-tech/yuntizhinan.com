---
title: "Mihomo 命令行教程：Linux 安装、systemd 常驻与终端代理设置"
description: "在 Linux 上以命令行运行 Mihomo 内核的完整教程：按 CPU 架构从官方渠道获取二进制、用订阅链接把 Clash 配置下载到 ~/.config/mihomo、编写 systemd 服务实现开机常驻、设置终端代理环境变量并验证出口 IP。"
type: article
date: 2026-08-01
author: 云梯指南编辑部
category: 客户端教程
tags: [Mihomo, Linux, systemd]
devices: [Linux]
recommendCategory: Clash
related:
  - text: Linux 平台教程入口
    link: /tutorials/linux/
  - text: DNS 污染与泄漏问题排查
    link: /troubleshooting/dns/
  - text: 兼容 Clash 订阅的机场怎么选
    link: /airport/clash/
  - text: OpenWrt 路由器配置思路
    link: /tutorials/router/openwrt/
---

# 在 Linux 上用命令行跑 Mihomo

整个过程分五步，全程只需要一个终端：

1. 确认 CPU 架构，从官方渠道获取对应的二进制文件；
2. 把订阅配置下载到 `~/.config/mihomo`；
3. 前台试运行，确认无报错；
4. 写一个 systemd 服务让它开机常驻；
5. 给终端设置代理环境变量，并验证出口 IP。

在一台普通的 x86 服务器或树莓派上，走完全程十分钟左右。开始前你需要一条 Clash 格式的机场订阅链接，还没有的读者先看[兼容 Clash 订阅的机场推荐](/airport/clash/)选定服务再回来。

## 第一步：获取二进制

mihomo 是开源项目，唯一官方发布渠道是 GitHub 上 MetaCubeX/mihomo 仓库的 Releases 页面，请在 GitHub 站内搜索仓库名进入，不要使用第三方下载站或网盘转载的版本。下载前先确认本机架构：

```bash
uname -m
```

输出 `x86_64` 对应 amd64 版本，`aarch64` 对应 arm64 版本（树莓派 4 及之后的机型多为 arm64）。在 Releases 页面下载对应的 `mihomo-linux-<架构>` 压缩包，然后解压并安装到系统路径：

```bash
gunzip mihomo-linux-amd64-*.gz
chmod +x mihomo-linux-amd64-*
sudo mv mihomo-linux-amd64-* /usr/local/bin/mihomo
mihomo -v
```

最后一条命令能输出版本号，就说明安装成功。

## 第二步：下载订阅配置

mihomo 默认从 `~/.config/mihomo` 目录读取 `config.yaml`。创建目录后用 curl 把订阅内容保存进去：

```bash
mkdir -p ~/.config/mihomo
curl -L -o ~/.config/mihomo/config.yaml "https://example.com/sub"
```

把 `https://example.com/sub` 替换成机场后台提供的订阅链接。多数机场的订阅可以直接输出 Clash 格式；如果下载下来是一串 base64 而不是 YAML 文本，说明你复制的是通用订阅，应改用机场后台标注「Clash 订阅」的那条链接，具体以服务商说明为准。下载失败或内容为空时，按[订阅导入失败排查](/troubleshooting/login/subscription-import-failed/)逐项处理。

另外提醒：订阅链接等同于账号凭证，不要写进公开仓库的脚本，也不要粘贴到论坛求助帖里，相关风险见[账号与订阅安全](/security/account-safety/)。

## 第三步：前台试运行

```bash
mihomo -d ~/.config/mihomo
```

正常情况下，日志会显示监听端口——常见为 mixed-port 7890，同一端口可同时接受 HTTP 与 SOCKS5 请求。如果有报错，优先看提示中的行号：绝大多数启动失败是 YAML 语法或字段问题，也就是订阅内容不完整导致的。确认能正常运行后按 Ctrl+C 退出，进入下一步。

## 第四步：systemd 常驻

系统级服务建议把配置放到 `/etc/mihomo`，避免依赖某个用户的家目录：

```bash
sudo mkdir -p /etc/mihomo
sudo cp ~/.config/mihomo/config.yaml /etc/mihomo/
```

新建服务文件 `/etc/systemd/system/mihomo.service`，内容如下：

```ini
[Unit]
Description=Mihomo Daemon
After=network-online.target

[Service]
Type=simple
ExecStart=/usr/local/bin/mihomo -d /etc/mihomo
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

然后重载并启用服务：

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now mihomo
systemctl status mihomo
```

状态显示 `active (running)` 即常驻成功，此后开机自动启动，进程异常退出也会自动重启。

## 第五步：终端代理与验证出口 IP

Linux 的命令行程序不会自动使用代理，需要通过环境变量指定。临时启用：

```bash
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
export all_proxy="socks5://127.0.0.1:7890"
```

git、curl、wget、pip 等常用工具都识别这组变量；个别程序只认大写形式（如 `HTTP_PROXY`），保险起见可以大小写各设一份。要长期使用，可把这几行（或封装成 proxy_on、proxy_off 两个函数）写进 `~/.bashrc`。注意环境变量只影响当前终端会话，且 sudo 默认不继承它们。

最后验证出口 IP 是否已经切换：

```bash
curl https://ipinfo.io/ip                            # 直连出口
curl -x http://127.0.0.1:7890 https://ipinfo.io/ip   # 代理出口
```

两条命令返回的 IP 不同，且后者归属地为所选节点的地区，说明代理链路正常。

## 常见问题

- **启动报端口占用**：日志出现 `bind: address already in use`，说明 7890 等端口已被其他程序或另一个 mihomo 实例占用，修改配置中的端口或停掉冲突进程。
- **节点能连通但网页打不开**：优先怀疑 DNS 污染，检查配置中的 dns 模块是否启用（推荐 fake-ip 模式），判断与处理方法见 [DNS 问题排查](/troubleshooting/dns/)。
- **设置了环境变量仍走直连**：确认变量是在当前会话导出的，再用 `ss -lntp | grep mihomo` 确认服务确实在监听。
- **整体超时、时好时坏**：多为节点或本地网络问题，按[连接超时排查](/troubleshooting/timeout/)定位。

## FAQ

**怎么切换节点？**
配置中的 external-controller 字段会开放一个本地管理接口，可配合任意 Clash 系 Web 面板在浏览器中切换代理组节点；不想用面板，也可以直接修改 config.yaml 里代理组的默认节点后重启服务。

**订阅怎么更新？**
重新执行第二步的 curl 命令覆盖 config.yaml，再重启服务即可。也可以交给 cron 定时执行：

```bash
0 6 * * * curl -L -o /etc/mihomo/config.yaml "https://example.com/sub" && systemctl restart mihomo
```

**它和 Clash Verge、Mihomo Party 是什么关系？**
后两者是同一个内核套上图形界面的桌面客户端，订阅与配置格式完全通用，桌面端教程见 [Clash Verge 图文教程](/tutorials/windows/clash-verge/)与 [Mihomo Party 使用教程](/tutorials/macos/mihomo-party/)。

**需要开 TUN 模式吗？**
终端场景下环境变量已经够用。TUN 会接管整机流量，需要额外的权限与路由配置，普通用户没有必要；如果目标是让全家设备都走代理，更合适的做法是 [OpenWrt 路由器方案](/tutorials/router/openwrt/)。
