<template>
  <div class="home-hero-search">
    <div class="search-input-wrapper" @click="openSearch">
      <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <span class="search-placeholder">搜索软件、错误提示、客户端或机场名称...</span>
      <span class="search-shortcut">⌘ K</span>
    </div>
    <div class="quick-keywords">
      <span>常见问题：</span>
      <a href="/troubleshooting/timeout/">节点全部超时</a>
      <a href="/troubleshooting/websocket/chatgpt-stream/">ChatGPT断流</a>
      <a href="/troubleshooting/verification/sms-not-received/">验证码收不到</a>
      <a href="/troubleshooting/mobile-data/">手机流量不能用</a>
      <a href="/troubleshooting/dns/dns-leak-test/">DNS泄漏检测</a>
      <a href="/troubleshooting/speed/">晚高峰变慢</a>
    </div>
  </div>
</template>

<script setup lang="ts">
const openSearch = () => {
  window.dispatchEvent(new CustomEvent('open-pagefind-search'))
}
</script>

<style scoped>
.home-hero-search {
  max-width: 680px;
  margin: 0 auto 40px;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: var(--site-bg);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius-lg);
  padding: 12px 20px;
  cursor: pointer;
  box-shadow: var(--site-shadow-sm);
  transition: box-shadow 0.2s, border-color 0.2s;
}

.search-input-wrapper:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
}

.search-icon {
  color: var(--site-text-soft);
  margin-right: 12px;
}

.search-placeholder {
  color: var(--site-text-soft);
  font-size: 16px;
  flex-grow: 1;
  text-align: left;
}

.search-shortcut {
  background: var(--site-bg-soft);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: var(--site-text-soft);
  border: 1px solid var(--site-border);
}

.quick-keywords {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  font-size: 13px;
}

.quick-keywords span {
  color: var(--site-text-soft);
}

.quick-keywords a {
  color: var(--site-text);
  background: var(--site-bg-soft);
  padding: 2px 10px;
  border-radius: 12px;
  transition: all 0.2s;
}

.quick-keywords a:hover {
  color: #fff;
  background: var(--vp-c-brand-1);
}
</style>
