<script setup lang="ts">
import AffiliateButton from './AffiliateButton.vue'

const props = withDefaults(defineProps<{
  title?: string
  tested?: boolean
  rating?: number
  speedRating?: string
  stabilityRating?: string
  streamingRating?: string
  pricingRating?: string
  summaryText?: string
  ctaText?: string
  ctaHref?: string
}>(), {
  title: '实测评估简述',
  tested: false,
  rating: 0,
  speedRating: '待实测',
  stabilityRating: '待实测',
  streamingRating: '待实测',
  pricingRating: '待实测',
  summaryText: '该品牌尚未完成本站标准流程实测。所有速度、稳定性与解锁结论将在实测完成后更新，当前信息仅供参考。',
  ctaText: '前往官网了解详情',
  ctaHref: ''
})
</script>

<template>
  <div class="review-summary-box">
    <div class="header-banner">
      <div class="title-wrap">
        <span class="badge-icon">📊</span>
        <h3 class="box-title">{{ title }}</h3>
      </div>
      <div v-if="tested && rating > 0" class="score-badge">
        <span class="score">{{ rating }}</span>
        <span class="scale">/ 5.0</span>
      </div>
      <div v-else class="untested-badge">待实测</div>
    </div>

    <div class="metrics-grid">
      <div class="metric-item">
        <span class="metric-label">🚀 晚高峰测速</span>
        <span class="metric-value">{{ speedRating }}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">🛡️ 连通稳定性</span>
        <span class="metric-value">{{ stabilityRating }}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">🎬 流媒体 / AI 解锁</span>
        <span class="metric-value">{{ streamingRating }}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">💰 资费与套餐门槛</span>
        <span class="metric-value">{{ pricingRating }}</span>
      </div>
    </div>

    <div class="verdict-section">
      <p class="verdict-text">{{ summaryText }}</p>
    </div>

    <div v-if="ctaHref" class="cta-section">
      <AffiliateButton :text="ctaText" :href="ctaHref" :block="true" />
    </div>
  </div>
</template>

<style scoped>
.review-summary-box {
  background-color: var(--site-bg);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius-lg);
  padding: 1.75rem;
  margin: 2rem 0;
  box-shadow: var(--site-shadow-md);
  overflow: hidden;
}

.header-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--vp-c-brand-soft);
  padding-bottom: 1.25rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.badge-icon {
  font-size: 1.5rem;
}

.box-title {
  margin: 0 !important;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--site-text);
}

.score-badge {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  display: flex;
  align-items: baseline;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

.score {
  font-size: 1.5rem;
  font-weight: 800;
}
.scale {
  font-size: 0.85rem;
  margin-left: 0.2rem;
  opacity: 0.9;
}

.untested-badge {
  background-color: #fef3c7;
  color: #92400e;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.4rem 1rem;
  border-radius: 999px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-item {
  background-color: var(--site-bg-soft);
  padding: 1rem 1.25rem;
  border-radius: var(--site-radius-md);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  border: 1px solid var(--site-border);
}

.metric-label {
  font-size: 0.9rem;
  color: var(--site-text-soft);
  font-weight: 600;
}

.metric-value {
  font-size: 1.02rem;
  color: var(--site-text);
  font-weight: 700;
}

.verdict-section {
  background-color: var(--vp-c-brand-soft);
  padding: 1.25rem;
  border-radius: var(--site-radius-md);
  margin-bottom: 1.5rem;
  border-left: 4px solid var(--vp-c-brand-1);
}

.verdict-text {
  margin: 0 !important;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--site-text);
}

.cta-section {
  display: flex;
  justify-content: center;
}

@media (max-width: 600px) {
  .review-summary-box {
    padding: 1.25rem;
  }
  .header-banner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
