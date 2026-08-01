<template>
  <nav v-if="crumbs.length > 1" class="site-breadcrumb" aria-label="面包屑导航">
    <ol>
      <li v-for="(crumb, i) in crumbs" :key="i">
        <a v-if="crumb.link" :href="crumb.link">{{ crumb.text }}</a>
        <span v-else aria-current="page">{{ crumb.text }}</span>
        <span v-if="i < crumbs.length - 1" class="sep" aria-hidden="true">›</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { breadcrumbFor } from '../../sections'

const { page, frontmatter } = useData()

const crumbs = computed(() =>
  breadcrumbFor(page.value.relativePath, frontmatter.value.title || page.value.title)
)
</script>

<style scoped>
.site-breadcrumb {
  margin-bottom: 16px;
  font-size: 13px;
  color: var(--site-text-soft);
}

.site-breadcrumb ol {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0;
  padding: 0;
}

.site-breadcrumb li {
  display: flex;
  align-items: center;
  gap: 4px;
}

.site-breadcrumb a {
  color: var(--site-text-soft);
}

.site-breadcrumb a:hover {
  color: var(--vp-c-brand-1);
}

.site-breadcrumb span[aria-current] {
  color: var(--site-text);
}

.sep {
  color: var(--site-border);
}
</style>
