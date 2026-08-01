<template>
  <div class="article-list">
    <!-- 动态渲染真实文章数据 -->
    <a v-for="(post, index) in displayPosts" :key="index" :href="post.url" class="site-card article-card">
      <div class="article-meta-info">
        <span class="category-tag">{{ post.category }}</span>
        <span class="date-info">{{ post.date }}</span>
      </div>
      <h3 class="article-title">{{ post.title }}</h3>
      <p class="article-desc">{{ post.description }}</p>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../posts.data.js'

const props = defineProps<{
  type?: string
  limit?: string | number
}>()

const displayPosts = computed(() => {
  // 按照传入的 limit 截取，如果没传默认显示 4 篇
  const limitCount = Number(props.limit) || 4
  
  // 随机打乱数组以在首页展示不同的内容，或者为了确保 SSR 一致性，可以基于日期/URL过滤
  // 考虑到这是静态网站，最好是直接切片
  let filtered = [...posts]
  
  // 如果提供了 type 属性，可以做对应过滤（由于我们在 posts.data.js 里都标为网络排查，这里为了展现多点内容，直接截取）
  if (props.type === 'knowledge') {
    // 简单地通过倒序取不同的文章
    filtered = filtered.reverse()
  }

  return filtered.slice(0, limitCount)
})
</script>

<style scoped>
.article-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 24px;
}

@media (max-width: 768px) {
  .article-list {
    grid-template-columns: 1fr;
  }
}

.article-card {
  padding: 20px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
}

.article-meta-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 12px;
}

.category-tag {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.date-info {
  color: var(--site-text-soft);
}

.article-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.article-desc {
  font-size: 14px;
  color: var(--site-text-soft);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card:hover .article-title {
  color: var(--vp-c-brand-1);
}
</style>
