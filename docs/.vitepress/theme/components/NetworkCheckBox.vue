<template>
  <div class="network-check-box">
    <h4>网络环境基础排查清单</h4>
    <ul>
      <li><span class="check-icon">✓</span> 确认已清除浏览器缓存和 Cookie</li>
      <li><span class="check-icon">✓</span> 确认代理客户端（如 Clash/v2rayN）已正常启动并接管系统流量</li>
      <li><span class="check-icon">✓</span> 确认当前节点并非处于故障或高延迟状态</li>
      <li><span class="check-icon">✓</span> 尝试切换全局路由模式或更新本地分流规则</li>
      <li><span class="check-icon">✓</span> 若为 PC 端，检查系统时间是否准确自动同步</li>
    </ul>
    <p class="n-desc">完成上述基础排查后，再进行本教程针对性的深度检查。</p>
  </div>
</template>

<style scoped>
.network-check-box {
  margin: 24px 0;
  padding: 20px;
  border: 1px solid #B45309;
  border-radius: var(--site-radius-md);
  background: rgba(180, 83, 9, 0.05);
}

.network-check-box h4 {
  margin: 0 0 16px;
  color: #B45309;
  font-size: 16px;
  font-weight: 600;
}

.network-check-box ul {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}

.network-check-box li {
  font-size: 14px;
  color: var(--site-text);
  margin-bottom: 8px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.check-icon {
  color: #B45309;
  font-weight: bold;
}

.n-desc {
  font-size: 13px;
  color: var(--site-text-soft);
  margin: 0;
}
</style>
