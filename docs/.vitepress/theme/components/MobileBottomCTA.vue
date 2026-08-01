<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AffiliateButton from './AffiliateButton.vue'
import { airports } from '../data/airports'

const isVisible = ref(false)
const STORAGE_KEY = 'ytzn_bottom_cta_dismissed'

// 优先取有推广链接的高亮品牌；没有任何推广链接时回退到站内推荐页
const affTarget = computed(
  () =>
    airports.find((a) => a.highlight && a.affLink) ||
    airports.find((a) => a.affLink) ||
    null
)

onMounted(() => {
  const isDismissed = sessionStorage.getItem(STORAGE_KEY)
  if (!isDismissed) {
    setTimeout(() => {
      isVisible.value = true
    }, 1200)
  }
})

const dismiss = () => {
  isVisible.value = false
  sessionStorage.setItem(STORAGE_KEY, 'true')
}
</script>

<template>
  <transition name="slide-up">
    <div v-if="isVisible" class="mobile-bottom-cta">
      <div class="cta-content">
        <template v-if="affTarget">
          <span class="cta-tag">🔥 编辑关注</span>
          <strong class="cta-title">{{ affTarget.name }} · {{ affTarget.priceFrom }}起</strong>
        </template>
        <template v-else>
          <span class="cta-tag">📌 本站整理</span>
          <strong class="cta-title">按用途查看机场推荐与实测计划</strong>
        </template>
      </div>
      <div class="cta-action">
        <AffiliateButton
          v-if="affTarget"
          text="前往官网"
          :href="affTarget.affLink"
          size="sm"
          :block="false"
        />
        <a v-else class="internal-cta" href="/airport/">去看看</a>
        <button class="close-btn" @click="dismiss" aria-label="关闭推荐提醒">&times;</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.mobile-bottom-cta {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--site-bg);
  border-top: 2px solid var(--vp-c-brand-1);
  padding: 0.65rem 1rem;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  z-index: 40;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .mobile-bottom-cta {
    display: flex;
  }
}

.cta-content {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex-grow: 1;
  overflow: hidden;
}

.cta-tag {
  font-size: 0.72rem;
  font-weight: 700;
  color: #b45309;
}

.cta-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--site-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cta-action {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.internal-cta {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.9rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: #ffffff;
  background-color: var(--vp-c-brand-1);
  border-radius: var(--site-radius-sm);
  text-decoration: none;
}

.internal-cta:hover {
  background-color: var(--vp-c-brand-2);
  color: #ffffff;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.4rem;
  color: var(--site-text-soft);
  padding: 0 0.2rem;
  cursor: pointer;
  line-height: 1;
}

.close-btn:hover {
  color: var(--site-text);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
