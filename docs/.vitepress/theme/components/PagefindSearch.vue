<template>
  <div class="pagefind-search-container">
    <button class="search-trigger" @click="openSearch">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <span>搜索</span>
      <kbd>⌘ K</kbd>
    </button>
    
    <Teleport to="body">
      <div v-if="isOpen" class="search-modal-backdrop" @click="closeSearch">
        <div class="search-modal" @click.stop>
          <div class="search-modal-header">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              ref="searchInput"
              v-model="query"
              type="text" 
              placeholder="搜索网站、错误提示或网络问题..." 
              @input="onInput"
              @keydown.down.prevent="navigate(1)"
              @keydown.up.prevent="navigate(-1)"
              @keydown.enter="selectCurrent"
              @keydown.esc="closeSearch"
            />
            <button class="close-btn" @click="closeSearch">ESC</button>
          </div>
          
          <div class="search-modal-body">
            <div v-if="isLoading" class="search-state">搜索中...</div>
            <div v-else-if="query && results.length === 0" class="search-state">没有找到相关结果。</div>
            <div v-else-if="!query" class="search-state">Pagefind搜索将在执行npm run build后可用。<br>支持全局全文检索。</div>
            <ul v-else class="search-results">
              <li 
                v-for="(result, index) in results" 
                :key="result.url"
                :class="{ active: index === activeIndex }"
                @mouseenter="activeIndex = index"
              >
                <a :href="result.url" @click="closeSearch">
                  <h4>{{ result.meta?.title || '未命名页面' }}</h4>
                  <p v-html="result.excerpt"></p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { withBase } from 'vitepress'

const isOpen = ref(false)
const query = ref('')
const results = ref<any[]>([])
const isLoading = ref(false)
const activeIndex = ref(0)
const searchInput = ref<HTMLInputElement | null>(null)

let pagefindInstance: any = null
let debounceTimer: any = null

const initPagefind = async () => {
  if (pagefindInstance || typeof window === 'undefined') return
  try {
    const modulePath = withBase('/pagefind/pagefind.js')
    pagefindInstance = await import(/* @vite-ignore */ modulePath)
  } catch (e) {
    console.warn('Pagefind is not available. Run `npm run build` to generate the index.', e)
  }
}

const openSearch = async () => {
  isOpen.value = true
  query.value = ''
  results.value = []
  activeIndex.value = 0
  await initPagefind()
  nextTick(() => {
    searchInput.value?.focus()
  })
}

const closeSearch = () => {
  isOpen.value = false
}

const handleKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    isOpen.value ? closeSearch() : openSearch()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('open-pagefind-search', openSearch)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('open-pagefind-search', openSearch)
})

const onInput = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    if (!query.value.trim()) {
      results.value = []
      return
    }
    
    if (!pagefindInstance) {
      // 在开发环境中提示
      return
    }

    isLoading.value = true
    try {
      const search = await pagefindInstance.search(query.value)
      const data = await Promise.all(
        search.results.slice(0, 12).map((r: any) => r.data())
      )
      results.value = data
      activeIndex.value = 0
    } catch (e) {
      console.error('Search failed', e)
    } finally {
      isLoading.value = false
    }
  }, 300)
}

const navigate = (dir: number) => {
  if (!results.value.length) return
  activeIndex.value = (activeIndex.value + dir + results.value.length) % results.value.length
}

const selectCurrent = () => {
  if (results.value.length && results.value[activeIndex.value]) {
    window.location.href = results.value[activeIndex.value].url
    closeSearch()
  }
}
</script>

<style scoped>
.search-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--vp-c-text-2);
  padding: 0 12px;
  height: 36px;
  transition: color 0.2s;
}

.search-trigger:hover {
  color: var(--vp-c-brand-1);
}

.search-trigger kbd {
  font-family: inherit;
  font-size: 12px;
  background: var(--vp-c-bg-alt);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.search-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 10vh;
}

.search-modal {
  width: 90%;
  max-width: 640px;
  background: var(--site-bg);
  border-radius: var(--site-radius-md);
  box-shadow: var(--site-shadow-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
}

.search-modal-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--site-border);
}

.search-icon {
  color: var(--vp-c-brand-1);
  margin-right: 12px;
}

.search-modal-header input {
  flex-grow: 1;
  border: none;
  background: transparent;
  font-size: 18px;
  color: var(--site-text);
  outline: none;
}

.close-btn {
  background: var(--site-bg-soft);
  border: 1px solid var(--site-border);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  color: var(--site-text-soft);
  cursor: pointer;
}

.search-modal-body {
  padding: 20px;
  overflow-y: auto;
}

.search-state {
  text-align: center;
  color: var(--site-text-soft);
  padding: 40px 0;
  line-height: 1.6;
}

.search-results {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-results li {
  margin-bottom: 8px;
}

.search-results a {
  display: block;
  padding: 12px 16px;
  border-radius: var(--site-radius-sm);
  transition: background 0.15s;
  color: inherit;
  text-decoration: none;
}

.search-results li.active a,
.search-results a:hover {
  background: var(--site-bg-soft);
}

.search-results h4 {
  margin: 0 0 4px;
  font-size: 16px;
  color: var(--site-text);
  font-weight: 600;
}

.search-results p {
  margin: 0;
  font-size: 13px;
  color: var(--site-text-soft);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(mark) {
  background: rgba(33, 85, 205, 0.1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  padding: 0 2px;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .search-modal-backdrop {
    padding-top: 0;
  }
  .search-modal {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
}
</style>
