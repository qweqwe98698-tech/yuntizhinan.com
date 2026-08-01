<script setup lang="ts">
const props = withDefaults(defineProps<{
  date?: string
  title?: string
  notes?: string[]
  version?: string
}>(), {
  date: '',
  title: '🔄 内容更新记录',
  notes: () => [],
  version: ''
})
</script>

<template>
  <div v-if="notes.length" class="update-notice-box">
    <div class="notice-header">
      <div class="header-left">
        <span class="pulse-dot"></span>
        <strong class="title-text">{{ title }}</strong>
      </div>
      <div class="meta-tag">
        <span v-if="date" class="date-badge">📅 {{ date }}</span>
        <span v-if="version" class="version-badge">{{ version }}</span>
      </div>
    </div>
    <ul class="notes-list">
      <li v-for="(item, i) in notes" :key="i" class="note-item">
        <span class="bullet">▪</span>
        <span class="text">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.update-notice-box {
  background-color: var(--vp-c-brand-soft);
  border: 1px solid rgba(37, 99, 235, 0.25);
  border-left: 5px solid var(--vp-c-brand-1);
  border-radius: var(--site-radius-md);
  padding: 1.25rem 1.5rem;
  margin: 1.75rem 0;
  box-shadow: var(--site-shadow-sm);
}

.notice-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px dashed rgba(37, 99, 235, 0.25);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.pulse-dot {
  width: 10px;
  height: 10px;
  background-color: #15803d;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(21, 128, 61, 0.2);
  flex-shrink: 0;
}

.title-text {
  font-size: 1.05rem;
  color: var(--site-text);
  font-weight: 700;
}

.meta-tag {
  display: flex;
  gap: 0.5rem;
  font-size: 0.82rem;
  font-weight: 600;
}

.date-badge,
.version-badge {
  background-color: var(--site-bg);
  color: var(--vp-c-brand-2);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(37, 99, 235, 0.25);
}

.notes-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.note-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 0 !important;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--site-text);
}

.bullet {
  color: var(--vp-c-brand-1);
  font-size: 1.1rem;
  line-height: 1.2;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .notice-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
