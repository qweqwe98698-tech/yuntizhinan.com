<template>
  <div class="airport-card" :class="{ 'highlight': highlight }">
    <div v-if="highlight" class="airport-badge">编辑关注</div>
    <div v-if="tested === false" class="untested-badge">待实测</div>

    <div class="airport-header">
      <h3 class="airport-name">{{ name }}</h3>
      <div class="airport-price">
        <span class="price-value">{{ price }}</span>
        <span v-if="price !== '待定'" class="price-unit">/月 起</span>
      </div>
    </div>

    <div class="airport-tags">
      <span v-for="tag in tags.slice(0, 3)" :key="tag" class="airport-tag">{{ tag }}</span>
    </div>

    <ul class="airport-features">
      <li v-for="feature in features.slice(0, 4)" :key="feature">
        <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        {{ feature }}
      </li>
    </ul>

    <p v-if="tested === false" class="untested-note">数据以实测完成后更新为准</p>

    <div class="airport-actions">
      <a v-if="reviewLink" :href="reviewLink" class="btn-review">查看详细评测</a>
      <a
        v-if="affLink"
        :href="affLink"
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        class="btn-aff"
      >官网注册 🚀</a>
      <span v-else class="btn-aff-placeholder">官网入口整理中</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  price: string
  tags: string[]
  features: string[]
  reviewLink?: string
  affLink?: string
  highlight?: boolean
  tested?: boolean
}>()
</script>

<style scoped>
.airport-card {
  position: relative;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  height: 100%;
}

.airport-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px -10px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.airport-card.highlight {
  border: 2px solid var(--vp-c-brand-1);
}

.airport-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  background-color: var(--vp-c-brand-1);
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 12px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.untested-badge {
  position: absolute;
  top: -12px;
  left: 20px;
  background-color: #fef3c7;
  color: #92400e;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 12px;
  border-radius: 12px;
  border: 1px solid rgba(146, 64, 14, 0.15);
}

.airport-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
  margin-top: 6px;
}

.airport-name {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.airport-price {
  text-align: right;
}

.price-value {
  font-size: 18px;
  font-weight: 800;
  color: var(--vp-c-brand-1);
}

.price-unit {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.airport-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.airport-tag {
  font-size: 11px;
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  padding: 2px 8px;
  border-radius: 10px;
  white-space: nowrap;
}

.airport-features {
  list-style: none;
  padding: 0;
  margin: 0 0 12px 0;
  flex-grow: 1;
}

.airport-features li {
  display: flex;
  align-items: flex-start;
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
  line-height: 1.4;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: #10b981;
  margin-right: 6px;
  flex-shrink: 0;
  margin-top: 2px;
}

.untested-note {
  font-size: 12px;
  color: #92400e;
  background-color: #fffbeb;
  border-radius: 6px;
  padding: 4px 8px;
  margin: 0 0 12px;
}

.airport-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
}

.btn-review,
.btn-aff,
.btn-aff-placeholder {
  display: block;
  text-align: center;
  padding: 10px 0;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.2s;
}

.btn-review {
  background-color: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-border);
}

.btn-review:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.btn-aff {
  background-color: var(--vp-c-brand-1);
  color: white !important;
  border: 1px solid var(--vp-c-brand-1);
}

.btn-aff:hover {
  background-color: var(--vp-c-brand-2);
}

.btn-aff-placeholder {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-3);
  border: 1px dashed var(--vp-c-border);
  cursor: default;
}
</style>
