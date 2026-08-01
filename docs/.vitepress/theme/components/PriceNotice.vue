<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  content?: string
  highlightText?: string
}>(), {
  title: '📢 价格与套餐信息说明',
  content: '文中提到的套餐、价格与优惠规则，均为写作或最近一次复测时的官方页面信息。服务商可能随时调整资费与套餐规则，实际价格与限制请以官方页面实时展示为准。',
  highlightText: '💡 建议根据自己的实际用量选择月付或短周期套餐，谨慎一次性购买多年长周期套餐。'
})
</script>

<template>
  <div class="price-notice-box">
    <div class="notice-header">
      <span class="icon">⚠️</span>
      <strong class="header-title">{{ title }}</strong>
    </div>
    <div class="notice-body">
      <p>{{ content }}</p>
      <div v-if="highlightText" class="highlight-box">
        <span>{{ highlightText }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price-notice-box {
  background-color: var(--site-bg-soft);
  border: 1px solid var(--site-border);
  border-left: 5px solid #b45309;
  border-radius: var(--site-radius-sm);
  padding: 1.25rem 1.5rem;
  margin: 1.75rem 0;
  box-shadow: var(--site-shadow-sm);
}

.notice-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.icon {
  font-size: 1.2rem;
}

.header-title {
  font-size: 1.05rem;
  color: var(--site-text);
  font-weight: 700;
}

.notice-body p {
  margin: 0 0 0.85rem !important;
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--site-text-soft);
}

.notice-body p:last-child {
  margin-bottom: 0 !important;
}

.highlight-box {
  background-color: rgba(180, 83, 9, 0.08);
  border: 1px solid rgba(180, 83, 9, 0.2);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--site-text);
  margin-top: 0.5rem;
}
</style>
