<script setup lang="ts">
const props = withDefaults(defineProps<{
  text?: string
  linkText?: string
  linkUrl?: string
}>(), {
  text: '云梯指南是独立的第三方教程与评测网站，与文中提到的软件及服务商不存在官方隶属关系。部分文章包含推广链接（Affiliate Link），通过这些链接注册不会增加你的费用，但本站可能获得佣金，用于支持测速、复测与站点运营。所有推荐结论以实际测试为准，未经实测的内容会明确标注「待实测」。',
  linkText: '查看完整推广关系披露 →',
  linkUrl: '/affiliate-disclosure/'
})
</script>

<template>
  <aside class="disclosure-box">
    <div class="disclosure-inner">
      <span class="shield-icon">🛡️</span>
      <div class="disclosure-content">
        <strong class="disclosure-title">独立第三方内容与推广关系说明</strong>
        <p class="disclosure-text">
          {{ text }}
          <a :href="linkUrl" class="more-link">{{ linkText }}</a>
        </p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.disclosure-box {
  background-color: var(--site-bg-soft);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius-md);
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--site-text-soft);
  box-shadow: var(--site-shadow-sm);
}

.disclosure-inner {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
}

.shield-icon {
  font-size: 1.35rem;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.disclosure-content {
  flex-grow: 1;
}

.disclosure-title {
  display: block;
  font-size: 0.94rem;
  color: var(--site-text);
  margin-bottom: 0.35rem;
  font-weight: 700;
}

.disclosure-text {
  margin: 0 !important;
  color: var(--site-text-soft);
}

.more-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
  margin-left: 0.35rem;
}

.more-link:hover {
  text-decoration: underline;
  color: var(--vp-c-brand-2);
}
</style>
