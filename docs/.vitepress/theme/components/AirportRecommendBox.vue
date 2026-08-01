<template>
  <div class="airport-recommend-box">
    <div class="arb-header">
      <svg class="arb-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
      <h4>仍然存在网络连接问题？</h4>
    </div>
    <div class="arb-content">
      <p>如果账号、设备、浏览器、客户端和DNS均已排查，但仍出现连接超时、长连接中断、视频缓冲或出口IP频繁变化，可以继续查看对应场景的线路选择指南。</p>
      
      <div class="arb-actions">
        <a v-if="link" :href="link" class="arb-btn">查看线路选择指南</a>
        <a v-else href="/airport/stable/" class="arb-btn">查看稳定线路指南</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()
const link = computed(() => frontmatter.value.relatedAirport)
</script>

<style scoped>
.airport-recommend-box {
  margin: 40px 0;
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius-md);
  background: var(--site-bg-soft);
  overflow: hidden;
}

.arb-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(33, 85, 205, 0.05);
  border-bottom: 1px solid var(--site-border);
}

.arb-icon {
  color: var(--vp-c-brand-1);
}

.arb-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--site-text);
}

.arb-content {
  padding: 20px;
}

.arb-content p {
  margin: 0 0 20px;
  font-size: 14px;
  color: var(--site-text-soft);
  line-height: 1.6;
}

.arb-btn {
  display: inline-block;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  padding: 10px 24px;
  border-radius: var(--site-radius-sm);
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.arb-btn:hover {
  background: var(--vp-c-brand-2);
}
</style>
