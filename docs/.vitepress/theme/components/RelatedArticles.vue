<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../posts.data'

type RelatedEntry = string | { text: string; link: string }

const props = defineProps<{
  related?: RelatedEntry[]
  title?: string
}>()

interface ResolvedLink {
  text: string
  link: string
  category?: string
}

function normalize(path: string): string {
  return path.replace(/\/+$/, '') || '/'
}

const items = computed<ResolvedLink[]>(() => {
  if (!props.related || !props.related.length) return []
  return props.related.map((entry) => {
    if (typeof entry !== 'string') {
      return { text: entry.text, link: entry.link }
    }
    const target = normalize(entry)
    const post = posts.find((p) => normalize(p.url) === target)
    if (post) {
      return { text: post.title, link: entry, category: post.category }
    }
    // 未在文章数据中（如目录页）时退化为路径末段
    const fallback = target.split('/').filter(Boolean).pop() || target
    return { text: fallback, link: entry }
  })
})
</script>

<template>
  <div v-if="items.length" class="related-articles">
    <h3 class="related-title">{{ title || '📖 相关阅读' }}</h3>
    <ul class="related-list">
      <li v-for="item in items" :key="item.link">
        <a :href="item.link">{{ item.text }}</a>
        <span v-if="item.category" class="related-category">{{ item.category }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.related-articles {
  margin: 24px 0;
  padding: 20px 24px;
  background-color: var(--site-bg-soft);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius-md);
}

.related-title {
  margin: 0 0 12px !important;
  font-size: 16px;
  font-weight: 700;
  color: var(--site-text);
  border-top: none !important;
  padding-top: 0 !important;
}

.related-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.related-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0 !important;
}

.related-list a {
  font-size: 14.5px;
  color: var(--vp-c-brand-1);
  line-height: 1.5;
}

.related-list a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.related-category {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--site-text-soft);
  background-color: var(--site-bg);
  border: 1px solid var(--site-border);
  border-radius: 999px;
  padding: 2px 10px;
}
</style>
