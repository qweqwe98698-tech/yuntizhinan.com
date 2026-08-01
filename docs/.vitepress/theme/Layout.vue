<template>
  <Layout>
    <template #nav-bar-content-before>
      <PagefindSearch />
    </template>

    <template #doc-before>
      <Breadcrumb v-if="!isHome" />
      <div v-if="!isHome" class="article-meta">
        <span class="article-meta-item" v-if="frontmatter.category">
          📁 {{ frontmatter.category }}
        </span>
        <span class="article-meta-item" v-if="frontmatter.author">
          ✍️ {{ frontmatter.author }}
        </span>
        <span class="article-meta-item" v-if="frontmatter.date">
          📅 发布于: {{ formatDate(frontmatter.date) }}
        </span>
        <span class="article-meta-item" v-if="frontmatter.updated">
          🕒 更新于: {{ formatDate(frontmatter.updated) }}
        </span>
        <span class="article-meta-item" v-if="frontmatter.devices && frontmatter.devices.length">
          💻 适用: {{ frontmatter.devices.join(', ') }}
        </span>
      </div>
      <DisclosureBox v-if="showDisclosure" />
    </template>

    <template #doc-after>
      <div v-if="isArticle" class="doc-after-content">
        <hr class="vp-divider" />
        <RelatedArticles :related="frontmatter.related" />
        <AirportRecommend
          v-if="frontmatter.recommend !== false"
          :category="frontmatter.recommendCategory"
        />
        <div class="feedback-entry" style="margin-top: 24px; font-size: 14px; color: var(--site-text-soft);">
          <p>发现内容有误或信息过期？<a href="/correction-policy/">查看纠错政策并反馈</a></p>
        </div>
      </div>
    </template>
    <template #layout-bottom>
      <SiteFooter />
      <MobileBottomCTA v-if="showMobileCta" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme-without-fonts'
import { useData } from 'vitepress'
import { computed } from 'vue'
import SiteFooter from './components/SiteFooter.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import DisclosureBox from './components/DisclosureBox.vue'
import MobileBottomCTA from './components/MobileBottomCTA.vue'
import PagefindSearch from './components/PagefindSearch.vue'
import RelatedArticles from './components/RelatedArticles.vue'
import AirportRecommend from './components/AirportRecommend.vue'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()

const isHome = computed(
  () => frontmatter.value.layout === 'home' || page.value.relativePath === 'index.md'
)

const isArticle = computed(() => frontmatter.value.type === 'article')

// 政策/关于页不显示推广披露；文章可用 disclosure: false 单独关闭
const showDisclosure = computed(
  () => isArticle.value && frontmatter.value.disclosure !== false
)

// 底部悬浮 CTA 仅出现在机场推荐与评测路径
const showMobileCta = computed(() => {
  const rel = page.value.relativePath.replace(/\\/g, '/')
  return rel.startsWith('airport/') || rel.startsWith('reviews/')
})

function formatDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().split('T')[0]
  return String(value).split('T')[0]
}
</script>

<style scoped>
.vp-divider {
  margin: 32px 0;
  border-top: 1px solid var(--site-border);
}
</style>
