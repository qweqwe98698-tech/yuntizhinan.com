<script setup lang="ts">
const props = withDefaults(defineProps<{
  pros?: string[]
  cons?: string[]
  titlePros?: string
  titleCons?: string
}>(), {
  titlePros: '👍 优点',
  titleCons: '⚠️ 缺点与注意',
  pros: () => [],
  cons: () => []
})
</script>

<template>
  <div v-if="pros.length || cons.length" class="pros-cons-grid">
    <div v-if="pros.length" class="pros-panel card-panel">
      <div class="panel-header pros-header">
        <h4>{{ titlePros }}</h4>
      </div>
      <ul class="items-list">
        <li v-for="(item, index) in pros" :key="'pro-' + index" class="item">
          <span class="icon success-icon">✔</span>
          <span class="text">{{ item }}</span>
        </li>
      </ul>
    </div>

    <div v-if="cons.length" class="cons-panel card-panel">
      <div class="panel-header cons-header">
        <h4>{{ titleCons }}</h4>
      </div>
      <ul class="items-list">
        <li v-for="(item, index) in cons" :key="'con-' + index" class="item">
          <span class="icon warning-icon">✘</span>
          <span class="text">{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.pros-cons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.card-panel {
  background-color: var(--site-bg);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius-md);
  overflow: hidden;
  box-shadow: var(--site-shadow-sm);
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--site-border);
}

.pros-header {
  background-color: rgba(21, 128, 61, 0.08);
  border-bottom-color: rgba(21, 128, 61, 0.2);
}
.pros-header h4 {
  color: #15803d;
  margin: 0;
  font-size: 1.15rem;
}

.cons-header {
  background-color: rgba(180, 83, 9, 0.08);
  border-bottom-color: rgba(180, 83, 9, 0.2);
}
.cons-header h4 {
  color: #b45309;
  margin: 0;
  font-size: 1.15rem;
}

.items-list {
  list-style: none;
  margin: 0;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0 !important;
  line-height: 1.6;
}

.icon {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  margin-top: 2px;
}

.success-icon {
  background-color: #15803d;
  color: white;
}

.warning-icon {
  background-color: #b45309;
  color: white;
}

.text {
  font-size: 0.98rem;
  color: var(--site-text);
}

@media (max-width: 600px) {
  .pros-cons-grid {
    grid-template-columns: 1fr;
  }
}
</style>
