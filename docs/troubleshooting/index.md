---
title: "网络故障排查中心：按症状快速定位问题"
description: "按症状分类的七大排查入口：连接超时、登录异常、收不到验证码、流式输出中断、移动数据不走代理、DNS 泄漏与测速丢包，并附一份换节点、校时间等通用自查清单。"
type: page
---

# 故障排查中心：按症状找答案

代理明明开着，网页却转圈打不开？排查网络问题最忌讳无头绪地乱试。这一页把常见故障按症状分成七类，先对号入座，再进入对应子栏目按步骤处理。

## 七类症状入口

### [连接超时](/troubleshooting/timeout/)

客户端显示已连接，但网页一直加载不出来，或所有节点延迟测试全部超时。最典型的案例是 Clash 开启后全局断网，专门的处理步骤见 [Clash 连接后无网络](/troubleshooting/timeout/clash-no-network/)。

### [登录与订阅异常](/troubleshooting/login/)

能上网但登录不上服务，或客户端无法更新订阅、导入时报错。订阅链接相关的问题集中在[订阅导入失败的处理](/troubleshooting/login/subscription-import-failed/)。

### [验证码收不到](/troubleshooting/verification/)

注册 Telegram、ChatGPT 等服务时，短信验证码迟迟不到，或提示号码不可用。这类问题往往与号码归属地和平台风控有关，见[短信验证码收不到怎么办](/troubleshooting/verification/sms-not-received/)。

### [WebSocket 与流式中断](/troubleshooting/websocket/)

网页能打开，但实时功能异常：ChatGPT 回答到一半停住、在线协作不同步。典型场景的分析见 [ChatGPT 流式输出中断](/troubleshooting/websocket/chatgpt-stream/)。

### [移动数据不走代理](/troubleshooting/mobile-data/)

Wi-Fi 下一切正常，切到蜂窝数据就失效，多见于 iOS 设备的权限与配置问题，详见 [iOS 蜂窝数据下代理失效](/troubleshooting/mobile-data/ios-cellular/)。

### [DNS 相关问题](/troubleshooting/dns/)

部分网站能开部分不能开、域名解析到错误地址，或担心真实位置暴露。可先做一次 [DNS 泄漏自查](/troubleshooting/dns/dns-leak-test/)确认现状。

### [速度慢与丢包](/troubleshooting/speed/)

能连上但看视频卡顿、下载龟速，尤其晚间明显。判断是节点拥挤还是线路质量问题，方法见[延迟与丢包诊断](/troubleshooting/speed/packet-loss-diagnosis/)。

## 快速自查清单

遇到问题先花两分钟过一遍通用步骤，多数故障能就地解决：

1. **换节点**：先切换两三个不同地区的节点，排除单节点故障。
2. **换网络**：Wi-Fi 与手机热点互切一次，判断是本地网络还是服务问题。
3. **查系统时间**：设备时间偏差过大会导致部分协议握手失败，确认已开启自动对时。
4. **查 DNS**：更换系统 DNS 或在客户端内启用内置 DNS 后重试。
5. **关防火墙重试**：临时关闭系统防火墙与安全软件，确认是否为拦截所致，测试后记得恢复。
6. **更新订阅与内核**：订阅过期、客户端版本过旧都可能造成连接异常。

## 还是不行？

如果按子栏目步骤逐项排查后问题依旧，且换用多个节点均无改善，问题可能出在服务商本身的线路质量上。可以对照[稳定性优先的机场选择建议](/airport/stable/)评估是否需要更换服务，或回到[客户端教程](/tutorials/)重新核对配置。
