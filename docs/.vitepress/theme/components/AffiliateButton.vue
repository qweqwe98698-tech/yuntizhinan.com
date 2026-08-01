<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  text?: string
  href?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'outline' | 'ghost'
  block?: boolean
}>(), {
  text: '前往官网了解详情',
  href: '',
  size: 'md',
  variant: 'primary',
  block: false
})

const buttonClasses = computed(() => [
  'site-affiliate-btn',
  `size-${props.size}`,
  `variant-${props.variant}`,
  { 'is-block': props.block }
])
</script>

<template>
  <a
    v-if="href"
    :href="href"
    target="_blank"
    rel="sponsored nofollow noopener noreferrer"
    :class="buttonClasses"
  >
    <span class="btn-text">{{ text }}</span>
    <svg class="external-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  </a>
</template>

<style scoped>
.site-affiliate-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: var(--site-radius-sm);
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-sizing: border-box;
  user-select: none;
}

.site-affiliate-btn.is-block {
  display: flex;
  width: 100%;
}

.size-sm {
  padding: 0.45rem 0.9rem;
  font-size: 0.88rem;
}
.size-md {
  padding: 0.7rem 1.4rem;
  font-size: 0.98rem;
}
.size-lg {
  padding: 0.95rem 1.9rem;
  font-size: 1.12rem;
}

.variant-primary {
  background-color: var(--vp-c-brand-1);
  color: #ffffff;
  border: 1px solid var(--vp-c-brand-2);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.22);
}
.variant-primary:hover {
  background-color: var(--vp-c-brand-2);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(29, 78, 216, 0.3);
}

.variant-outline {
  background-color: transparent;
  color: var(--vp-c-brand-1);
  border: 2px solid var(--vp-c-brand-1);
}
.variant-outline:hover {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}

.variant-ghost {
  background-color: var(--site-bg-soft);
  color: var(--site-text);
  border: 1px solid var(--site-border);
}
.variant-ghost:hover {
  background-color: var(--site-bg);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.external-icon {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}
.site-affiliate-btn:hover .external-icon {
  transform: translate(2px, -2px);
}
</style>
