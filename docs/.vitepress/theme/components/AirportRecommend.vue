<template>
  <div class="airport-recommend-section">
    <div class="recommend-header" v-if="!hideHeader">
      <h3>{{ title || '🧭 相关机场推荐' }}</h3>
      <p>{{ description || '如果排查后确认是线路问题，或需要更稳定的网络环境，可以参考下方本站整理的候选服务商名单。所有品牌都会经过标准流程实测，未完成实测的会明确标注「待实测」。' }}</p>
    </div>

    <div class="airport-grid">
      <AirportCard
        v-for="airport in displayAirports"
        :key="airport.id"
        :name="airport.name"
        :price="airport.priceFrom"
        :tags="airport.tags"
        :features="airport.features"
        :review-link="airport.reviewLink"
        :aff-link="airport.affLink"
        :highlight="airport.highlight"
        :tested="airport.tested"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { airports } from '../data/airports'
import AirportCard from './AirportCard.vue'

const props = defineProps<{
  category?: string
  limit?: number
  title?: string
  description?: string
  hideHeader?: boolean
  disableShuffle?: boolean
}>()

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const displayAirports = computed(() => {
  let filtered = [...airports]

  if (props.category) {
    filtered = filtered.filter(a => a.tags.includes(props.category!))
  }

  // 客户端挂载后再打乱，避免 SSR 水合不一致
  if (isMounted.value && !props.disableShuffle) {
    filtered.sort(() => Math.random() - 0.5)
  }

  return filtered.slice(0, props.limit || 3)
})
</script>

<style scoped>
.airport-recommend-section {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 2px dashed var(--vp-c-border);
}

.recommend-header {
  margin-bottom: 24px;
}

.recommend-header h3 {
  font-size: 20px;
  font-weight: 700;
  margin-top: 0;
  color: var(--vp-c-brand-1);
}

.recommend-header p {
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.6;
}

.airport-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 960px) {
  .airport-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .airport-grid {
    grid-template-columns: 1fr;
  }
}
</style>
